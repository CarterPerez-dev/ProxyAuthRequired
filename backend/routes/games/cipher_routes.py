# backend/routes/cipher_routes.py
from flask import Blueprint, request, jsonify, g
from bson.objectid import ObjectId
import time
from datetime import datetime
import random

from mongodb.database import db
from models.test import get_user_by_id, update_user_coins, update_user_xp

# Initialize the blueprint
cipher_bp = Blueprint('cipher', __name__)

# Cipher collections
cipher_challenges_collection = db.cipherChallenges
cipher_progress_collection = db.cipherProgress

@cipher_bp.route('/challenges', methods=['GET'])
def get_cipher_challenges():
    """
    Get all cipher challenges with user progress information.
    """
    user_id = request.args.get('userId')
    
    start_db = time.time()
    challenges = list(cipher_challenges_collection.find({}, {'_id': 0}))
    duration = time.time() - start_db
    if hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator += duration
    
    # If there are no challenges in the database, generate some defaults
    if not challenges:
        challenges = generate_default_challenges()
        
        # Store these challenges in the database for future use
        if challenges:
            start_db = time.time()
            cipher_challenges_collection.insert_many(challenges)
            duration = time.time() - start_db
            if hasattr(g, 'db_time_accumulator'):
                g.db_time_accumulator += duration
    
    # If user_id is provided, get user progress
    completed_challenges = []
    max_unlocked_level = 1
    unlocked_hints = {}
    
    if user_id:
        try:
            user_oid = ObjectId(user_id)
            
            start_db = time.time()
            user_progress = cipher_progress_collection.find_one({"userId": user_oid})
            duration = time.time() - start_db
            if hasattr(g, 'db_time_accumulator'):
                g.db_time_accumulator += duration
            
            if user_progress:
                completed_challenges = user_progress.get("completedChallenges", [])
                max_unlocked_level = user_progress.get("maxUnlockedLevel", 1)
                unlocked_hints = user_progress.get("unlockedHints", {})
        except:
            pass
    
    return jsonify({
        "challenges": challenges,
        "completedChallenges": completed_challenges,
        "maxUnlockedLevel": max_unlocked_level,
        "unlockedHints": unlocked_hints
    })

@cipher_bp.route('/submit', methods=['POST'])
def submit_cipher_solution():
    """
    Submit a solution for a cipher challenge.
    """
    data = request.json
    user_id = data.get('userId')
    challenge_id = data.get('challengeId')
    level_id = data.get('levelId')
    hint_used = data.get('hintUsed', False)
    time_spent = data.get('timeSpent', 0)
    
    if not user_id or not challenge_id:
        return jsonify({"error": "userId and challengeId are required"}), 400
    
    try:
        user_oid = ObjectId(user_id)
    except:
        return jsonify({"error": "Invalid user ID"}), 400
    
    # Get user
    start_db = time.time()
    user = get_user_by_id(user_id)
    duration = time.time() - start_db
    if hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator += duration
    
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    # Check if the challenge exists
    start_db = time.time()
    challenge = cipher_challenges_collection.find_one({"id": challenge_id})
    duration = time.time() - start_db
    if hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator += duration
    
    if not challenge:
        return jsonify({"error": "Challenge not found"}), 404
    
    # Find or create user progress document
    start_db = time.time()
    user_progress = cipher_progress_collection.find_one({"userId": user_oid})
    duration = time.time() - start_db
    if hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator += duration
    
    if not user_progress:
        user_progress = {
            "userId": user_oid,
            "completedChallenges": [],
            "maxUnlockedLevel": 1,
            "unlockedHints": {}
        }
    
    # Check if this challenge is already completed
    completed_challenges = user_progress.get("completedChallenges", [])
    is_new_completion = challenge_id not in completed_challenges
    
    # Calculate rewards
    xp_reward = 0
    coin_reward = 0
    
    if is_new_completion:
        # Base rewards based on level
        base_xp = level_id * 50
        base_coins = level_id * 20
        
        # Adjust based on hint usage
        if hint_used:
            xp_reward = int(base_xp * 0.7)  # 30% reduction if hints were used
            coin_reward = int(base_coins * 0.7)
        else:
            xp_reward = base_xp
            coin_reward = base_coins
        
        # Add to completed challenges
        if challenge_id not in completed_challenges:
            completed_challenges.append(challenge_id)
        
        # Check if this completes a level
        level_challenges = [c for c in challenges if c.get("levelId") == level_id]
        level_completed = all(c.get("id") in completed_challenges for c in level_challenges)
        
        # Unlock next level if all challenges in current level are completed
        max_unlocked_level = user_progress.get("maxUnlockedLevel", 1)
        if level_completed and level_id == max_unlocked_level:
            max_unlocked_level = min(5, level_id + 1)  # Maximum level is 5
        
        # Update user progress
        start_db = time.time()
        cipher_progress_collection.update_one(
            {"userId": user_oid},
            {
                "$set": {
                    "completedChallenges": completed_challenges,
                    "maxUnlockedLevel": max_unlocked_level
                }
            },
            upsert=True
        )
        duration = time.time() - start_db
        if hasattr(g, 'db_time_accumulator'):
            g.db_time_accumulator += duration
        
        # Award XP and coins
        if xp_reward > 0:
            update_user_xp(user_id, xp_reward)
        
        if coin_reward > 0:
            update_user_coins(user_id, coin_reward)
    else:
        # If already completed, give smaller rewards
        xp_reward = 5
        coin_reward = 5
        
        # Award small XP and coins for replay
        update_user_xp(user_id, xp_reward)
        update_user_coins(user_id, coin_reward)
    
    return jsonify({
        "success": True,
        "isNewCompletion": is_new_completion,
        "xpAwarded": xp_reward,
        "coinsAwarded": coin_reward
    })

@cipher_bp.route('/unlock-hint', methods=['POST'])
def unlock_hint():
    """
    Unlock a hint for a cipher challenge by spending coins.
    """
    data = request.json
    user_id = data.get('userId')
    challenge_id = data.get('challengeId')
    hint_index = data.get('hintIndex')
    cost = data.get('cost', 0)
    
    if not user_id or not challenge_id or hint_index is None:
        return jsonify({"error": "userId, challengeId, and hintIndex are required"}), 400
    
    try:
        user_oid = ObjectId(user_id)
    except:
        return jsonify({"error": "Invalid user ID"}), 400
    
    # Get user
    start_db = time.time()
    user = get_user_by_id(user_id)
    duration = time.time() - start_db
    if hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator += duration
    
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    # Check if user has enough coins
    user_coins = user.get("coins", 0)
    if user_coins < cost:
        return jsonify({"error": "Not enough coins"}), 400
    
    # Find or create user progress document
    start_db = time.time()
    user_progress = cipher_progress_collection.find_one({"userId": user_oid})
    duration = time.time() - start_db
    if hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator += duration
    
    if not user_progress:
        user_progress = {
            "userId": user_oid,
            "completedChallenges": [],
            "maxUnlockedLevel": 1,
            "unlockedHints": {}
        }
    
    # Get unlocked hints for this challenge
    unlocked_hints = user_progress.get("unlockedHints", {})
    challenge_hints = unlocked_hints.get(str(challenge_id), [])
    
    # Check if hint is already unlocked
    if hint_index in challenge_hints:
        return jsonify({"error": "Hint already unlocked"}), 400
    
    # Add new hint to unlocked list
    challenge_hints.append(hint_index)
    unlocked_hints[str(challenge_id)] = challenge_hints
    
    # Update user progress
    start_db = time.time()
    cipher_progress_collection.update_one(
        {"userId": user_oid},
        {
            "$set": {
                "unlockedHints": unlocked_hints
            }
        },
        upsert=True
    )
    duration = time.time() - start_db
    if hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator += duration
    
    # Deduct coins from user
    update_user_coins(user_id, -cost)
    
    return jsonify({
        "success": True,
        "challengeId": challenge_id,
        "hintIndex": hint_index,
        "newCoinsBalance": user_coins - cost
    })

def generate_default_challenges():
    """
    Generate a set of default cipher challenges if none exist in the database.
    """
    challenges = [
        # Level 1: Beginner
        {
            "id": 1,
            "levelId": 1,
            "title": "Simple Caesar Cipher",
            "description": "This message has been shifted by a fixed number of positions in the alphabet. Can you decode it?",
            "cipherType": "Caesar Shift",
            "ciphertext": "KHOOR ZRUOG",
            "solution": "HELLO WORLD",
            "hints": [
                "The most common letter in English is 'E'. Look for patterns.",
                "Try different shift values between 1 and 25.",
                "This message is shifted by 3 positions (the classic Caesar cipher)."
            ],
            "difficulty": 1
        },
        {
            "id": 2,
            "levelId": 1,
            "title": "ROT13 Encoding",
            "description": "ROT13 is a simple letter substitution cipher that replaces a letter with the 13th letter after it in the alphabet.",
            "cipherType": "ROT13",
            "ciphertext": "PELCGBTENCUL VF SHA",
            "solution": "CRYPTOGRAPHY IS FUN",
            "hints": [
                "ROT13 shifts each letter 13 positions in the alphabet.",
                "Since there are 26 letters in the English alphabet, applying ROT13 twice returns the original text.",
                "A becomes N, B becomes O, and so on. Z wraps around to M."
            ],
            "difficulty": 1
        },
        {
            "id": 3,
            "levelId": 1,
            "title": "Reversed Text",
            "description": "Sometimes the simplest ciphers are the most effective. Can you decode this message?",
            "cipherType": "Simple Reversal",
            "ciphertext": "TERCES POT A SI SIHT",
            "solution": "THIS IS A TOP SECRET",
            "hints": [
                "Try reading the message differently.",
                "What happens if you read from right to left?",
                "The message is simply written backwards."
            ],
            "difficulty": 1
        },
        
        # Level 2: Easy
        {
            "id": 4,
            "levelId": 2,
            "title": "Atbash Cipher",
            "description": "The Atbash cipher is a substitution cipher where each letter is mapped to its reverse in the alphabet.",
            "cipherType": "Atbash",
            "ciphertext": "ZGYZHS XRKSVI HVXIVG",
            "solution": "ATBASH CIPHER SECRET",
            "hints": [
                "In this cipher, A becomes Z, B becomes Y, and so on.",
                "The mapping is symmetrical - encoding and decoding use the same process.",
                "The first letter of the plaintext is 'A'."
            ],
            "difficulty": 2
        },
        {
            "id": 5,
            "levelId": 2,
            "title": "Binary Code",
            "description": "This message is encoded in binary. Each 8-bit sequence represents a single ASCII character.",
            "cipherType": "Binary",
            "ciphertext": "01000100 01001001 01000111 01001001 01010100 01000001 01001100",
            "solution": "DIGITAL",
            "hints": [
                "Each group of 8 bits represents one character.",
                "Convert each binary number to decimal, then look up the ASCII value.",
                "The first character (01000100) is 'D'."
            ],
            "difficulty": 2
        },
        {
            "id": 6,
            "levelId": 2,
            "title": "Skip Cipher",
            "description": "In this cipher, only certain letters of the message form the real text. Can you find the pattern?",
            "cipherType": "Skip Cipher",
            "ciphertext": "TSEHCERRMEETSSMLEESTTSAEGREESIASNEHCIHDDECRN",
            "solution": "THE SECRET MESSAGE IS HIDDEN",
            "hints": [
                "Not all letters in the ciphertext are part of the message.",
                "Try reading every nth letter, where n is a small number.",
                "Read every third letter to reveal the hidden message."
            ],
            "difficulty": 2
        },
        
        # Level 3: Intermediate
        {
            "id": 7,
            "levelId": 3,
            "title": "Vigenère Cipher",
            "description": "The Vigenère cipher uses a keyword to determine different shift values for each letter in the plaintext.",
            "cipherType": "Vigenère",
            "ciphertext": "LXFOPVEFRNHR",
            "solution": "CODEBREAKERS",
            "hints": [
                "You need to discover the keyword. It's a common term related to cryptography.",
                "The keyword is 'KEY'. Each letter in the keyword determines the shift for the corresponding plaintext letter.",
                "When you repeat the keyword (KEY) for the length of the message, each letter in the ciphertext is shifted by the corresponding letter in the keyword."
            ],
            "difficulty": 3
        },
        {
            "id": 8,
            "levelId": 3,
            "title": "Morse Code",
            "description": "This message is encoded in Morse code, where letters are represented by sequences of dots and dashes.",
            "cipherType": "Morse Code",
            "ciphertext": "... . -.-. .-. . - / -.-. --- -.. .",
            "solution": "SECRET CODE",
            "hints": [
                "Dots (.) represent short signals, dashes (-) represent long signals.",
                "Letters are separated by spaces, and words by forward slashes (/).",
                "Use the Morse code chart to decode each character."
            ],
            "difficulty": 3
        },
        {
            "id": 9,
            "levelId": 3,
            "title": "Hexadecimal Encoding",
            "description": "This message is encoded in hexadecimal, where each byte represents an ASCII character.",
            "cipherType": "Hex",
            "ciphertext": "48 45 58 20 45 4E 43 4F 44 49 4E 47",
            "solution": "HEX ENCODING",
            "hints": [
                "Each pair of hexadecimal digits represents one ASCII character.",
                "Convert each hex value to decimal, then look up the ASCII value.",
                "The hex value 48 corresponds to the character 'H'."
            ],
            "difficulty": 3
        },
        
        # Level 4: Advanced
        {
            "id": 10,
            "levelId": 4,
            "title": "Substitution Cipher",
            "description": "This message uses a more complex substitution where each letter is replaced with another letter according to a fixed mapping.",
            "cipherType": "Substitution",
            "ciphertext": "WBV TCPJIWPC RAXCFPC PC AFEKAVFV",
            "solution": "THE ULTIMATE CIPHER IS UNSOLVED",
            "hints": [
                "Look for patterns in letter frequencies. 'E' and 'T' are the most common letters in English.",
                "Try to identify short words first, like 'THE' or 'IS'.",
                "The mapping is: A→K, B→J, C→R, D→V, E→V, F→D, G→L, H→B, I→P, J→Y, K→O, L→G, M→E, N→H, O→A, P→C, Q→Q, R→F, S→S, T→W, U→I, V→X, W→Z, X→M, Y→U, Z→N"
            ],
            "difficulty": 4
        },
        {
            "id": 11,
            "levelId": 4,
            "title": "Combined Cipher",
            "description": "This message has been encoded using multiple cipher techniques in sequence. Decode each layer carefully.",
            "cipherType": "Multiple",
            "ciphertext": "WTSGGCVUTGWTSGGFFWTFFTSS",
            "solution": "MULTIPLE LAYERS OF SECRECY",
            "hints": [
                "The message was first encoded with a Caesar cipher, then the result was reversed.",
                "Try reversing the message first, then apply a Caesar shift.",
                "After reversing, apply a Caesar shift of 7 to decode the message."
            ],
            "difficulty": 4
        },
        {
            "id": 12,
            "levelId": 4,
            "title": "Rail Fence Cipher",
            "description": "The rail fence cipher is a transposition cipher that arranges the plaintext in a zigzag pattern and then reads off each row.",
            "cipherType": "Transposition",
            "ciphertext": "TEESCELMGSSNA",
            "solution": "THE SECRET MESSAGE",
            "hints": [
                "The rail fence cipher rearranges letters in a zigzag pattern across multiple rows.",
                "The key is the number of rails (rows). Try different values from 2 to 4.",
                "This message uses 3 rails. Write it out in a zigzag and read horizontally."
            ],
            "difficulty": 4
        },
        
        # Level 5: Expert
        {
            "id": 13,
            "levelId": 5,
            "title": "Playfair Cipher",
            "description": "The Playfair cipher uses a 5x5 grid of letters based on a keyword. It encrypts pairs of letters according to special rules.",
            "cipherType": "Playfair",
            "ciphertext": "BMODZBXDNABEKUDMUIXMMOUVIF",
            "solution": "CONGRATULATIONS MASTER CRYPTOGRAPHER",
            "hints": [
                "The Playfair cipher uses a 5x5 grid based on a keyword, with I and J sharing a position.",
                "The keyword for this cipher is 'CIPHER'.",
                "Rules: 1) Same row: take letters to the right. 2) Same column: take letters below. 3) Different row and column: form a rectangle and take the corners in the same row."
            ],
            "difficulty": 5
        },
        {
            "id": 14,
            "levelId": 5,
            "title": "Bacon's Cipher",
            "description": "Francis Bacon developed a method of encoding messages using two different typefaces, which we've represented as 'A' and 'B'.",
            "cipherType": "Bacon's Cipher",
            "ciphertext": "AABAA ABBAB AABBA AABAA AABAA ABABA BABAB BAABA AABAA ABBBA AABAA AAABB BAABA",
            "solution": "MASTER DECODER",
            "hints": [
                "Each letter is encoded with a 5-letter sequence of 'A's and 'B's.",
                "The sequences represent a binary encoding where A=0 and B=1.",
                "Use Bacon's cipher table to decode: A=AAAAA, B=AAAAB, etc."
            ],
            "difficulty": 5
        },
        {
            "id": 15,
            "levelId": 5,
            "title": "The Final Challenge",
            "description": "This is the ultimate test of your cryptanalysis skills. It combines multiple techniques and requires careful analysis.",
            "cipherType": "Combined Analysis",
            "ciphertext": "XMVILXRVIZVHYKCKHNZCMPVRKWSPGGZWBLZFPBVHLXFPHHXWDZGIKBGGBXFGMASBFKFPGCEYBNZBXTVCMXSRPGNQZGSPGVPGGVWWZLFKZRKLTVKZW",
            "solution": "YOU HAVE MASTERED THE ART OF CRYPTOGRAPHY CONGRATULATIONS ON COMPLETING ALL CIPHER CHALLENGES",
            "hints": [
                "This is a polyalphabetic substitution cipher with a twist. Look for repeating patterns.",
                "The cipher uses a Vigenère cipher with a keyword related to this game.",
                "The keyword is 'CIPHER'. Apply standard Vigenère decryption to reveal the message."
            ],
            "difficulty": 5
        }
    ]
    
    return challenges

if __name__ == '__main__':
    pass
