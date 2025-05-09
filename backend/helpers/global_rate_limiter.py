import time
import logging
import os
from datetime import datetime, timedelta
from flask import request, jsonify, g
from functools import wraps
from mongodb.database import db
import ipaddress
import hashlib
from dotenv import load_dotenv
from helpers.jwt_auth import jwt_optional_wrapper
from flask_jwt_extended import get_jwt_identity, verify_jwt_in_request
import random
import re

# Ensure environment variables are loaded
load_dotenv()

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

class GlobalRateLimiter:
    """
    Global rate limiter to prevent abuse of public API endpoints.
    Tracks usage based on IP address and/or session/user identifiers.
    Implements progressive rate limits (stricter limits after repeated violations).
    """
    

    DEFAULT_LIMITS = {
        'auth': {'calls': int(os.getenv('RATE_LIMIT_AUTH', '30:60').split(':')[0]), 
                'period': int(os.getenv('RATE_LIMIT_AUTH', '30:60').split(':')[1])},
        'password_reset': {'calls': int(os.getenv('RATE_LIMIT_PASSWORD_RESET', '10:300').split(':')[0]), 
                          'period': int(os.getenv('RATE_LIMIT_PASSWORD_RESET', '10:300').split(':')[1])},
        'contact': {'calls': int(os.getenv('RATE_LIMIT_CONTACT', '10:300').split(':')[0]), 
                   'period': int(os.getenv('RATE_LIMIT_CONTACT', '10:300').split(':')[1])},
        'general': {'calls': int(os.getenv('RATE_LIMIT_GENERAL', '180:60').split(':')[0]), 
                   'period': int(os.getenv('RATE_LIMIT_GENERAL', '180:60').split(':')[1])},
        'fallback': {'calls': int(os.getenv('RATE_LIMIT_FALLBACK', '500:60').split(':')[0]), 
                    'period': int(os.getenv('RATE_LIMIT_FALLBACK', '500:60').split(':')[1])}    
    }
    
    # Load penalty periods from environment variables
    PENALTY_PERIODS = [
        int(x) for x in os.getenv('RATE_LIMIT_PENALTIES', '5,10,60,240,1440').split(',')
    ]
    
    def __init__(self, limiter_type=None):
        """
        Initialize the rate limiter with specific type limits.
        
        Args:
            limiter_type: The type of endpoint being rate limited
                         ('auth', 'password_reset', 'contact', 'general', 'fallback')
        """
        self.limiter_type = limiter_type or 'general'
        self.limits = self.DEFAULT_LIMITS.get(self.limiter_type, self.DEFAULT_LIMITS['fallback'])
   
    def is_rate_limited(self):
        """
        Check if the current client is rate limited for this endpoint.
        
        Returns:
            tuple: (is_limited, remaining_calls, reset_time, retry_after)
        """
        # Get client identifier
        client_id = self._get_client_identifier()
        
        # Get current time
        now = datetime.utcnow()
        
        # Find client's usage records for this endpoint
        collection = db.globalRateLimits
        record = collection.find_one({
            "clientId": client_id,
            "endpoint": self.limiter_type
        })
        
        # If no record exists, create one
        if not record:
            record = {
                "clientId": client_id,
                "endpoint": self.limiter_type,
                "calls": [],
                "violations": 0,
                "blockUntil": None,
                "updatedAt": now
            }
            collection.insert_one(record)
            return False, self.limits['calls'], None, 0
        
        # Check if the client is currently blocked
        block_until = record.get('blockUntil')
        if block_until and block_until > now:
            # Calculate time remaining in the block
            retry_after = int((block_until - now).total_seconds())
            return True, 0, block_until, retry_after
        
        # Get the calls within the time period and radomized cuz im cracked (brain emoji)
        jitter_factor = 1 + (random.random() - 0.5) / 10
        period_with_jitter = self.limits['period'] * jitter_factor
        period_start = now - timedelta(seconds=period_with_jitter)
        valid_calls = [call for call in record.get('calls', []) if call >= period_start]
        
        # Calculate remaining calls
        used_calls = len(valid_calls)
        remaining_calls = max(0, self.limits['calls'] - used_calls)
        
        # Calculate reset time (when oldest call will expire)
        reset_time = None
        if valid_calls and used_calls >= self.limits['calls']:
            oldest_call = min(valid_calls)
            reset_time = oldest_call + timedelta(seconds=self.limits['period'])
        
        # Check if client has exceeded the limit
        is_limited = used_calls >= self.limits['calls']
        
        # If limited, calculate retry-after header value
        retry_after = 0
        if is_limited and reset_time:
            retry_after = max(0, int((reset_time - now).total_seconds()))
            
            # If this is a violation, update the violation count and potentially block the client
            if is_limited:
                violations = record.get('violations', 0) + 1
                
                # Determine if we need to block the client for a longer period
                if violations > 1:
                    # Get the penalty period (in minutes) based on violation count
                    penalty_index = min(violations - 2, len(self.PENALTY_PERIODS) - 1)
                    penalty_minutes = self.PENALTY_PERIODS[penalty_index]
                    
                    # Set block until time
                    block_until = now + timedelta(minutes=penalty_minutes)
                    
                    # Update the record with the new block time
                    collection.update_one(
                        {"_id": record["_id"]},
                        {"$set": {
                            "violations": violations,
                            "blockUntil": block_until,
                            "updatedAt": now
                        }}
                    )
                    
                    # Update retry_after to reflect the block time
                    retry_after = penalty_minutes * 60
                    reset_time = block_until
                else:
                    # Just update the violation count
                    collection.update_one(
                        {"_id": record["_id"]},
                        {"$set": {
                            "violations": violations,
                            "updatedAt": now
                        }}
                    )
        
        return is_limited, remaining_calls, reset_time, retry_after



 
    def _get_client_identifier(self):
        """
        Enhanced client identification with JWT support.
        """
        
        big_balls_str = os.environ.get('BIGBALLS')
        big_balls = [ip.strip() for ip in big_balls_str.split(',')]        
        
        # Check for JWT identity first - with proper error handling
        try:            
            verify_jwt_in_request(optional=True)
            user_id = get_jwt_identity()
            if user_id:
                return f"jwt_{user_id}"
        except Exception as e:
            # JWT verification failed, continue with other methods
            pass
                
        ip = request.headers.get('X-Forwarded-For', request.remote_addr)
        if ip and ',' in ip:
            ip = ip.split(',')[0].strip()
            
        # request data for fingerprinting
        session_id = request.cookies.get('session', '')
        user_agent = request.headers.get('User-Agent', '')[:100]
        accept_lang = request.headers.get('Accept-Language', '')[:20]
        accept_header = request.headers.get('Accept', '')[:50]
        accept_encoding = request.headers.get('Accept-Encoding', '')[:30]
        connection_info = request.headers.get('Connection', '')[:10]
        
        # Initialize identifier_parts BEFORE trying to append to it
        identifier_parts = [ip]
        
        # Include additional identifying factors
        identifier_parts.append(hashlib.md5(accept_header.encode()).hexdigest()[:6])
        identifier_parts.append(hashlib.md5(accept_encoding.encode()).hexdigest()[:6])
        
        # Add request method to fingerprint 
        identifier_parts.append(request.method)
        
        # Check if using HTTPS
        if request.is_secure:
            identifier_parts.append('s')        
        
        if session_id:
            identifier_parts.append(session_id)
        
        # Add fingerprint data if available
        if user_agent:
            identifier_parts.append(hashlib.md5(user_agent.encode()).hexdigest()[:8])
        if accept_lang:
            identifier_parts.append(hashlib.md5(accept_lang.encode()).hexdigest()[:6])
    
        # The remaining code from your function...
        has_big_balls = ip in big_balls or request.host.split(':')[0] in big_balls
        
        if has_big_balls:  # Note: 'is_dev_ip' isn't defined in the snippet - you might need to fix this too
            if request.environ.get('HTTPS') == 'on' or request.environ.get('wsgi.url_scheme') == 'https':
                tls_version = request.environ.get('SSL_PROTOCOL', '')
                cipher = request.environ.get('SSL_CIPHER', '')
                if tls_version or cipher:
                    identifier_parts.append(hashlib.md5((tls_version + cipher).encode()).hexdigest()[:8])
        
        # Build the identifier
        identifier = "_".join(identifier_parts)
        
        # Hash the identifier to protect privacy
        hashed_id = hashlib.md5(identifier.encode()).hexdigest()
        
        return f"{ip}_{hashed_id[:12]}"
        
    
    
    def increment_usage(self):
        """
        Record that the client has made another call to this endpoint.
        """
        # Get client identifier
        client_id = self._get_client_identifier()
        
        # Get current time
        now = datetime.utcnow()
        
        # Add call timestamp to the client's record
        db.globalRateLimits.update_one(
            {"clientId": client_id, "endpoint": self.limiter_type},
            {
                "$push": {"calls": now},
                "$set": {"updatedAt": now}
            },
            upsert=True
        )
        
    def reset_violations(self, client_id=None):
        """
        Reset violation count for a client.
        
        Args:
            client_id: Optional client ID to reset. If None, uses current client.
        """
        if client_id is None:
            client_id = self._get_client_identifier()
            
        # Get current time
        now = datetime.utcnow()
        
        # Reset violations and block
        db.globalRateLimits.update_one(
            {"clientId": client_id, "endpoint": self.limiter_type},
            {
                "$set": {
                    "violations": 0,
                    "blockUntil": None,
                    "updatedAt": now
                }
            }
        )

def apply_global_rate_limiting():
    """
    Function to create a Flask before_request middleware that applies
    rate limiting to all public API endpoints with advanced security inspection.
    Uses stricter regex matching for suspicious patterns.
    """
    def check_rate_limit():
        path = request.path

        # Skip non-API OPTIONS requests (CORS preflight)
        if request.method == 'OPTIONS':
            return

        # Check request size first (DOS protection)
        content_length = request.content_length or 0
        # Using 3MB limit as in the original example
        if content_length > 3 * 1024 * 1024:
            response = jsonify({
                "error": "Request payload too large",
                "type": "security_error"
            })
            response.status_code = 413  # Payload Too Large
            logger.warning(f"Request payload too large: {content_length} bytes from {request.remote_addr} for path {path}")
            return response


        ai_endpoints = ['/payload/', '/scenario/', '/analogy/', '/grc/', '/xploit/', '/cracked/newsletter/']
        is_ai_endpoint = any(path.startswith(ai_path) for ai_path in ai_endpoints)


        if not is_ai_endpoint:


            suspicious_patterns = [
                # Script injection patterns
                '<script>', '<?php', '<%=', '<svg/onload=', '<img/onerror=', 'javascript:',
                'document.cookie', 'document.location', 'window.location', 'eval(',
                'setTimeout(', 'setInterval(', 'Function(', 'fromCharCode(', 'atob(', 'btoa(',
                r'on\w+\s*=', r'javascript:\s*\w+', r'<\s*script\b', r'<\s*img[^>]+\bonerror\s*=',

                # SQL injection patterns
                "' OR '1'='1", "' OR 1=1--", "OR 1=1--", ";--", "/**/", "UNION SELECT",
                "' UNION SELECT", "INFORMATION_SCHEMA", "@@version", "sys.tables",
                "UTL_HTTP", "DBMS_LDAP", "xp_cmdshell", "sp_execute",
                r'\bUNION\s+ALL\s+SELECT\b', r'\bOR\s+\d+\s*=\s*\d+', r';\s*DROP\s+TABLE',


                '{"$ne":', '{"$gt":', '{"$lt":', '{"$regex":', '{"$where":',
                r'`.*?`', r'\|\s*bash', r';\s*wget\s+http',

                # Path traversal patterns
                '../../../', '..%2F..%2F', '/etc/passwd', '/etc/shadow', '/proc/self/',
                'file:///', 'C:\\Windows\\', 'boot.ini', 'win.ini',

                # Crypto mining patterns
                'coinhive', 'cryptonight', 'stratum+tcp', 'monero',

                # XML/YAML attacks
                '<!ENTITY', 'SYSTEM "file:', '[<!ENTITY', '!YAML',

                # HTTP header injection
                '%0d%0a', 'Set-Cookie:', 'Location:',

                # Unusual content types (usually less relevant in query/body, but kept)
                'application/xml-dtd', 'text/xsl', 'text/cmd', 'text/x-shellscript',

                # Base64 encoded payloads with script indicators 
                'PHNjcmlwdD', 'eyJfaWQi', 'JGd0', 'KSB7',

                # Serialization attacks
                'O:8:', 'rO0', 'YToy'
            ]

            # Helper function for stricter pattern checking using regex
            def check_suspicious_exact(text_to_check, source_name):
                """
                Checks text against suspicious patterns using regex for stricter matching.
                Uses word boundaries (\b) for alphanumeric patterns for "exact word" match.
                Uses direct escaped matching for patterns with symbols.
                Uses raw regex patterns as is.
                Performs case-insensitive search.
                """
                if not text_to_check: # Skip empty strings
                    return None

                for pattern in suspicious_patterns:
                    try:
                        regex_to_use = pattern
                        is_raw = False

                        if pattern.startswith(('r"', "r'")):
                            regex_to_use = pattern[1:-1] # Remove r'' or r""
                            is_raw = True
                        else:
                            escaped_pattern = re.escape(pattern)
                            # Apply word boundaries (\b) only if it does
                            if pattern and pattern[0].isalnum() and pattern[-1].isalnum():
                                regex_to_use = r'\b' + escaped_pattern + r'\b'
                            else:
                                regex_to_use = escaped_pattern

                        # Perform case-insensitive search
                        if re.search(regex_to_use, text_to_check, re.IGNORECASE):
                            logger.warning(
                                f"Strict suspicious pattern found in {source_name}. "
                                f"Pattern='{pattern}', Regex Used='{regex_to_use}', "
                                f"Client={request.remote_addr}, Path={path}"
                            )
                            response = jsonify({
                                "error": f"Invalid request content detected in {source_name}.",
                                "type": "security_error"
                            })
                            response.status_code = 422 # Specific unique code to know if I accidenly block a real request (other than logging ofcourse)
                            return response # Block the request

                    except re.error as e:
                        # Log regex compilation/matching errors but don't block requests
                        logger.error(f"Regex error processing pattern '{pattern}' in {source_name}: {e}")
                        continue 

                return None # No suspicious pattern found

            # --- Apply the check ---

            # Check query string
            query_string_original = request.query_string.decode('utf-8', errors='ignore')
            block_response = check_suspicious_exact(query_string_original, "query string")
            if block_response:
                return block_response


            # More headers that might carry payloads
            suspicious_headers = [
                'X-Forwarded-Host', 'Accept-Language',
                'X-Api-Key', 'X-Csrf-Token' 
            ]
            for header_name in suspicious_headers:
                header_value_original = request.headers.get(header_name, '')
                block_response = check_suspicious_exact(header_value_original, f"'{header_name}' header")
                if block_response:
                    return block_response


            if request.method in ['POST', 'PUT', 'PATCH']:
                try:
                    raw_data_bytes = request.get_data()
                    # Only inspect reasonably sized bodies to prevent DoS on the check itself
                    if 0 < len(raw_data_bytes) < 50000: # 50KB limit for inspection
                         # Decode assuming UTF-8, ignore errors for robustness
                         raw_data_original = raw_data_bytes.decode('utf-8', errors='ignore')
                         block_response = check_suspicious_exact(raw_data_original, "request body")
                         if block_response:
                             return block_response
                    elif len(raw_data_bytes) >= 50000:
                         # Log if body is too large to inspect fully, but don't block here
                         # Size limit check earlier handles blocking truly huge payloads
                         logger.info(f"Request body size ({len(raw_data_bytes)} bytes) exceeds inspection limit (50000 bytes) for path {path}, client {request.remote_addr}. Skipping detailed pattern check.")

                except Exception as e:
                    # Don't block the request if reading or checking the body fails
                    logger.error(f"Error reading/checking request body for suspicious patterns: {str(e)}")
                    pass # Continue processing the request

        # --- End of Suspicious Pattern Check Logic ---


        # --- Rate Limiting Logic (Runs regardless of pattern check outcome if not blocked) ---

        # Determine the limiter type based on the path
        # Assumes get_limiter_type_for_path is defined elsewhere and returns type or None
        limiter_type = get_limiter_type_for_path(path, request.method)

        # If limiter_type is None, this path is explicitly exempt from rate limiting
        if limiter_type is None:
            # Path is exempt, proceed to the actual route handler
            return # No rate limiting applied

        # Create a rate limiter for this endpoint type
        # Assumes GlobalRateLimiter class is defined elsewhere
        limiter = GlobalRateLimiter(limiter_type)

        # Check if rate limited
        is_limited, remaining, reset_time, retry_after = limiter.is_rate_limited()

        # If limited, return 429 Too Many Requests
        if is_limited:
            reset_msg = ""
            if reset_time:
                # Calculate seconds until reset (ensure positive)
                seconds_to_reset = max(1, int((reset_time - datetime.utcnow()).total_seconds()))
                # Provide user-friendly minutes
                minutes_to_reset = max(1, (seconds_to_reset + 59) // 60) # Round up minutes
                reset_msg = f" Please try again in {minutes_to_reset} minute{'s' if minutes_to_reset > 1 else ''}."

            response = jsonify({
                "error": f"Rate limit exceeded.{reset_msg}", # Simplified message
                "remaining": 0, # Explicitly 0 when limited
                "type": "rate_limit_error",
                "limit_type": limiter_type # Add type for context
            })
            response.status_code = 429

            # Set standard rate limit headers
            response.headers['X-RateLimit-Limit'] = str(limiter.limits['calls'])
            response.headers['X-RateLimit-Remaining'] = '0'
            if reset_time:
                # Reset time as UNIX timestamp
                response.headers['X-RateLimit-Reset'] = str(int(reset_time.timestamp()))
            if retry_after > 0:
                # Retry-After header in seconds
                response.headers['Retry-After'] = str(int(retry_after))

            # Log rate limit events
            logger.warning(f"Rate limit exceeded: Type='{limiter_type}', Path='{path}', Client='{limiter._get_client_identifier()}'")

            return response # Return the 429 response

        # If NOT rate limited:
        # Record the usage *before* proceeding to the view function
        limiter.increment_usage()

        # Store rate limit info in Flask's 'g' object for setting headers later (in after_request)
        # Calculate remaining *after* incrementing usage
        g.rate_limit_info = {
            'limit': limiter.limits['calls'],
            'remaining': max(0, remaining - 1), # Decrement remaining count for the current request
            'reset_time': reset_time # Store reset time if needed for headers later
        }

        # If no security block and not rate limited, proceed to the actual route handler
        # Returning None from a before_request function allows the request to continue
        return None

    # apply_global_rate_limiting returns the inner check_rate_limit function
    # This function will be registered with Flask's @app.before_request
    return check_rate_limit
def get_limiter_type_for_path(path, method=None):
    """
    Determine the limiter type based on the request path and method.
    
    Args:
        path: The request path
        method: The HTTP method (GET, POST, etc.)
        
    Returns:
        str: The limiter type or 'fallback' for routes that need the default protection
    """
    path = path.lower()
    method = method.upper() if method else request.method.upper()
    
    # Check for exempt paths that should never be rate limited
    exempt_paths = [
        '/health',
        '/static',
        '/avatars',
        '/.well-known',
        '/favicon.ico',
        '/api/socket.io',
    ]
    
    # Skip rate limiting for exempt paths
    if any(path.startswith(exempt) for exempt in exempt_paths):
        return None

    if path == '/test/user' and method == 'POST':
        return 'auth'
        
    # Other auth paths
    auth_paths = [
        '/test/login',
        '/oauth/login',
        '/oauth/auth',
        '/oauth/verify-google-token',
    ]
    
  
    password_reset_paths = [
        '/password-reset/request-reset',
        '/password-reset/verify-token',
        '/password-reset/reset-password'
    ]
    
    contact_paths = [
        '/contact-form/submit'
    ]
    

    for auth_path in auth_paths:
        if path.startswith(auth_path):
            return 'auth'
    
    for reset_path in password_reset_paths:
        if path.startswith(reset_path):
            return 'password_reset'
    
    for contact_path in contact_paths:
        if path.startswith(contact_path):
            return 'contact'
    
    # Protected paths that already have specific rate limits
    already_rate_limited_paths = [
        '/analogy/',       # Already rate-limited 
        '/scenario/',      # Already rate-limited 
        '/grc/',           # Already rate-limited 
        '/payload/'        # Already rate-limited 
    ]
    
    for protected_path in already_rate_limited_paths:
        if path.startswith(protected_path):
            return None  

    general_paths = [
        '/test/public-leaderboard',
        '/newsletter/',
        '/support/',
        '/subscription/'
        '/test/public-leaderboard'
    ]
    
    for general_path in general_paths:
        if path.startswith(general_path):
            return 'general'
            
    # For any other path that wasn't explicitly exempt, apply the fallback limiter
    # This ensures all routes have at least some level of protection
    return 'fallback'

def apply_global_rate_limiting():
    """
    Function to create a Flask before_request middleware that applies
    rate limiting to all public API endpoints with advanced security inspection.
    """
    def check_rate_limit():
        path = request.path
        
        # Skip non-API OPTIONS requests (CORS preflight)
        if request.method == 'OPTIONS':
            return
        
        # Check request size first (DOS protection)
        content_length = request.content_length or 0
        if content_length > 3 * 1024 * 1024:  
            response = jsonify({
                "error": "Request payload too large",
                "type": "security_error"
            })
            response.status_code = 413  # Payload Too Large
            logger.warning(f"Request payload too large: {content_length} bytes from {request.remote_addr}")
            return response
        
        # Check if this is an AI endpoint - exempt from suspicious pattern checks but not rate limiting
        ai_endpoints = ['/payload/', '/scenario/', '/analogy/', '/grc/', '/xploit/' '/cracked/newsletter/']
        is_ai_endpoint = any(path.startswith(ai_path) for ai_path in ai_endpoints)
        
        # Only run suspicious pattern checks for non-AI endpoints
        if not is_ai_endpoint:
        
        # UPDATED: Extensive list of suspicious patterns that are almost never legitimate
            suspicious_patterns = [
                # Script injection patterns
                '<script>', '<?php', '<%=', '<svg/onload=', '<img/onerror=', 'javascript:',
                'document.cookie', 'document.location', 'window.location', 'eval(',
                'setTimeout(', 'setInterval(', 'Function(', 'fromCharCode(', 'atob(', 'btoa(',
                r'on\w+\s*=', r'javascript:\s*\w+', r'<\s*script\b', r'<\s*img[^>]+\bonerror\s*=',
                
                # SQL injection patterns
                "' OR '1'='1", "' OR 1=1--", "OR 1=1--", ";--", "/**/", "UNION SELECT",
                "' UNION SELECT", "INFORMATION_SCHEMA", "@@version", "sys.tables", 
                "UTL_HTTP", "DBMS_LDAP", "xp_cmdshell", "sp_execute", 
                r'\bUNION\s+ALL\s+SELECT\b', r'\bOR\s+\d+\s*=\s*\d+', r';\s*DROP\s+TABLE',
                
                
                # NoSQL injection patterns
                '{"$ne":', '{"$gt":', '{"$lt":', '{"$regex":', '{"$where":', 
                r'\bUNION\s+ALL\s+SELECT\b', r'\bOR\s+\d+\s*=\s*\d+', r';\s*DROP\s+TABLE',
                
                # Command injection patterns
                '; ls', '; cat', '; pwd','; curl', '& wget', '| bash',
                r'`.*?`', r'\|\s*bash', r';\s*wget\s+http'
                
                # Path traversal patterns
                '../../../', '..%2F..%2F', '/etc/passwd', '/etc/shadow', '/proc/self/',
                'file:///', 'C:\\Windows\\', 'boot.ini', 'win.ini',
                
                # Crypto mining patterns
                'coinhive', 'cryptonight', 'stratum+tcp', 'monero', 
                
                # XML/YAML attacks
                '<!ENTITY', 'SYSTEM "file:', '[<!ENTITY', '!YAML',
                
                # HTTP header injection
                '\r\n', '%0d%0a', 'Set-Cookie:', 'Location:',
                
                # Unusual content types
                'application/xml-dtd', 'text/xsl', 'text/cmd', 'text/x-shellscript',
                
                # Base64 encoded payloads with script indicators
                'PHNjcmlwdD', 'eyJfaWQi', 'JGd0', 'KSB7',
                
                # Serialization attacks
                'O:8:', 'rO0', 'YToy'
                          
            ]
        # Check query string, headers, and form data without affecting performance
        # Using .lower() for case-insensitive matching
        query_string = request.query_string.decode('utf-8', errors='ignore').lower()
        
        # Check query string (GET parameters)
        for pattern in suspicious_patterns:
            pattern_lower = pattern.lower()
            if pattern_lower in query_string:
                logger.warning(f"Suspicious pattern in query: {pattern} from {request.remote_addr}")
                response = jsonify({
                    "error": "Invalid request parameters",
                    "type": "security_error"
                })
                response.status_code = 400
                return response
        
        # Check common headers where attacks might hide
        suspicious_headers = ['User-Agent', 'Referer', 'Cookie', 'X-Forwarded-For', 'X-Forwarded-Host']
        for header in suspicious_headers:
            header_value = request.headers.get(header, '').lower()
            if header_value:
                for pattern in suspicious_patterns:
                    pattern_lower = pattern.lower()
                    if pattern_lower in header_value:
                        logger.warning(f"Suspicious pattern in {header} header: {pattern} from {request.remote_addr}")
                        response = jsonify({
                            "error": "Invalid request header",
                            "type": "security_error"
                        })
                        response.status_code = 400
                        return response
        
        # Check request body for POST/PUT/PATCH without affecting normal JSON
        if request.is_json and request.method in ['POST', 'PUT', 'PATCH']:
            try:
                # Only inspect the raw input string, not the parsed JSON
                raw_data = request.get_data(as_text=True).lower()
                # Skip very large payloads to prevent DoS
                if len(raw_data) < 50000:  # Only check reasonably sized payloads
                    for pattern in suspicious_patterns:
                        pattern_lower = pattern.lower()
                        if pattern_lower in raw_data:
                            logger.warning(f"Suspicious pattern in request body: {pattern} from {request.remote_addr}")
                            response = jsonify({
                                "error": "Invalid request data",
                                "type": "security_error"
                            })
                            response.status_code = 400
                            return response
            except Exception as e:
                # Don't block the request if our security check fails
                logger.error(f"Error checking request body: {str(e)}")
                pass
        
        
        # Determine the limiter type based on the path
        limiter_type = get_limiter_type_for_path(path, request.method)
        
        # If limiter_type is None, this path is explicitly exempt from rate limiting
        if limiter_type is None:
            return
        
        # Create a rate limiter for this endpoint type
        limiter = GlobalRateLimiter(limiter_type)
        
        # Check if rate limited
        is_limited, remaining, reset_time, retry_after = limiter.is_rate_limited()
        
        # If limited, return 429 Too Many Requests
        if is_limited:
            reset_msg = ""
            if reset_time:
                # Calculate seconds until reset
                seconds_to_reset = max(1, int((reset_time - datetime.utcnow()).total_seconds()))
                minutes_to_reset = max(1, seconds_to_reset // 60)
                reset_msg = f" Try again in {minutes_to_reset} minutes."
            
            response = jsonify({
                "error": f"Rate limit exceeded for {limiter_type} endpoint.{reset_msg}",
                "remaining": remaining,
                "type": "rate_limit_error"
            })
            response.status_code = 429
            
            # Set headers for rate limit info
            response.headers['X-RateLimit-Limit'] = str(limiter.limits['calls'])
            response.headers['X-RateLimit-Remaining'] = str(remaining)
            if reset_time:
                response.headers['X-RateLimit-Reset'] = str(int(reset_time.timestamp()))
            if retry_after > 0:
                response.headers['Retry-After'] = str(retry_after)
            
            # Log rate limit events
            logger.warning(f"Rate limit exceeded: {limiter_type} endpoint, path={path}, client={limiter._get_client_identifier()}")
            
            return response
        
        # Record the usage
        limiter.increment_usage()
        
        # Store rate limit info for setting headers in after_request
        g.rate_limit_info = {
            'limit': limiter.limits['calls'],
            'remaining': remaining - 1
        }
            
    return check_rate_limit

def setup_rate_limit_headers(response):
    """
    Function to create a Flask after_request middleware that adds
    rate limit headers to responses.
    """
    if hasattr(g, 'rate_limit_info'):
        response.headers['X-RateLimit-Limit'] = str(g.rate_limit_info['limit'])
        response.headers['X-RateLimit-Remaining'] = str(g.rate_limit_info['remaining'])
    
    return response





