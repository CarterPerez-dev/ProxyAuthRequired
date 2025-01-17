# AWS Deployment and Architecture

This document provides a comprehensive overview of the deployment process, architectural decisions, and configurations used to set up my application. It details the use of various AWS services, the GitHub workflow for automated deployments, and the security measures implemented to ensure a robust and scalable system. This guide is intended to help you understand the system's functionality and replicate the setup if needed.

## Table of Contents

- [Overview](#overview)
- [Architecture Diagram](#architecture-diagram)
- [AWS Services Used](#aws-services-used)
  1. [Amazon CloudFront](#1-amazon-cloudfront)
  2. [Amazon S3](#2-amazon-s3)
  3. [AWS WAF (Web Application Firewall)](#4-aws-waf-web-application-firewall)
  4. [Amazon CloudWatch](#5-amazon-cloudwatch)
  5. [AWS Certificate Manager (ACM)](#6-aws-certificate-manager-acm)
  6. [AWS Private CA](#7-aws-private-ca)
  7. [Amazon EC2](#8-amazon-ec2)
  8. [Amazon EventBridge](#9-amazon-eventbridge)
  9. [AWS Global Accelerator](#10-aws-global-accelerator)
- [Deployment Process](#deployment-process)
- [GitHub Actions Workflow](#github-actions-workflow)
  - [Workflow Configuration: deploy-to-ec2.yml](#workflow-configuration-deploy-to-ec2yml)
  - [Explanation](#explanation)
- [Monitoring and Logging](#monitoring-and-logging)
- [Security Configurations](#security-configurations)
- [Instance Details](#instance-details)
- [Troubleshooting](#troubleshooting)
- [Conclusion](#conclusion)

## Overview

The deployment architecture is meticulously crafted to serve a React application in a secure, scalable, and efficient manner using a suite of AWS services. The system is designed to handle high traffic with low latency, ensuring a seamless user experience. Below is a high-level overview of the request flow within the system:

- **CloudFront CDN**: Manages caching, redirects, and secure communication with users.
- **Nginx Reverse Proxy**: Routes incoming requests to the appropriate backend service (frontend or API).
- **Apache HTTP Server**: Proxies requests to the React frontend or API backend.
- **React Application**: Delivers the frontend with client-side routing.

## Architecture Diagram

**Figure 1: Deployment Architecture Overview**

## AWS Services Used

### 1. Amazon CloudFront

**Role**: Acts as the Content Delivery Network (CDN) to ensure fast delivery of static assets and dynamic content.

**Configurations**:
- **Custom domain**: `www.proxyauthrequired.com`
- **SSL/TLS encryption** using a certificate from AWS Certificate Manager (ACM).
- **Viewer Protocol Policy** set to redirect HTTP to HTTPS.
- **Origin Protocol Policy** configured to communicate with the origin over HTTP.

**Features**:
- Handles HTTP to HTTPS redirection.
- Points to the Nginx server running on the EC2 instance as its origin.

### 2. Amazon S3

**Role**: Hosts a static website to handle root domain redirection.

**Configurations**:
- Static website hosting enabled.
- Redirects `proxyauthrequired.com` to `www.proxyauthrequired.com` since Domain.com does not support ANAMES at the root.
- **Website Endpoint**: `http://proxyauthrequired.com.s3-website-us-east-1.amazonaws.com`


### 3. AWS WAF (Web Application Firewall)

**Role**: Protects the application from malicious traffic.

**Configurations**:
- Blocks bad bots and filters suspicious requests.
- Logs all actions (BLOCK, ALLOW) to CloudWatch for analysis.

**WAF Rules**:
- Custom rules to block malicious bots based on User-Agent strings and IP addresses.

### 4. Amazon CloudWatch

**Role**: Monitors and logs application metrics.

**Configurations**:
- Logs CloudFront requests.
- Monitors traffic patterns.
- Sets up alerts for traffic spikes and error rates.

### 5. AWS Certificate Manager (ACM)

**Role**: Manages SSL/TLS certificates.

**Configurations**:
- Generated certificates for `proxyauthrequired.com` and `www.proxyauthrequired.com`.
- Attached certificates to the CloudFront distribution for secure communication.

### 6. AWS Private CA

**Role**: Manages internal certificates for secure service communication.

**Configurations**:
- Created a root CA for internal certificate management.
- Issued certificates for secure communication between services.

### 7. Amazon EC2

**Role**: Hosts the Nginx reverse proxy and Apache HTTP Server.

**Instance Details**:
- **Instance ID**: `i-0fdfaebd00c56d010`
- **Instance Type**: `t3.xlarge`
- **Public IPv4 Address**: `98.83.245.82`
- **Private IPv4 Address**: `172.31.11.94`
- **AMI ID**: `ami-064519b8c76274859` (Debian 12)
- **VPC ID**: `vpc-01bc0e27ca2a3e8e2`
- **Subnet ID**: `subnet-07bcdd03b2217bbbb`
- **Elastic IP**: `98.83.245.82`

**Security**:
- IMDSv2 set to required for enhanced security.
- Termination protection enabled.

**Configuration**:
- Runs Nginx as a reverse proxy.
- Apache HTTP Server proxies requests to the React frontend (port 3000) or API backend (port 5000).

### 8. Amazon EventBridge

**Role**: Manages event-driven workflows and integrations.

### 9. AWS Global Accelerator

**Role**: Improves availability and performance by directing traffic through the AWS global network.

## Deployment Process

The deployment process involves setting up and configuring various AWS services to work cohesively. Below is a step-by-step breakdown of the deployment:

### CloudFront Configuration:

- Configured CloudFront with the custom domain `www.proxyauthrequired.com`.
- Enabled SSL/TLS encryption using certificates from ACM.
- Set Viewer Protocol Policy to redirect HTTP to HTTPS.
- Configured the origin to point to the Nginx server on the EC2 instance.


### Nginx Reverse Proxy Configuration:

- Installed and configured Nginx on the through the Docker container.
- Set up routing rules to direct `/api/` requests to the backend API server via Apache.
- Routed all other requests to the React frontend.

### Apache HTTP Server Configuration:

- Installed Apache on the EC2 instance through the Docker container.
- Configured Apache to proxy `/api/` requests to the backend service running on port `5000`.
- Configured Apache to proxy `/` requests to the React application running on port `3000`.

### React Application Deployment:

- Deployed the React frontend on the EC2 instance.
- Ensured client-side routing is properly handled by Nginx and Apache.

### WAF Setup:

- Created custom WAF rules to block malicious traffic.
- Configured logging to CloudWatch for monitoring and analysis.

## GitHub Actions Workflow

To automate deployments to Amazon EC2, I set up a GitHub Actions workflow. This workflow triggers on every push to the main branch and handles the deployment process automatically.

### Workflow Configuration: `deploy-to-ec2.yml`

```yaml
name: Deploy to Amazon EC2

on:
  push:
    branches: [ "main" ]

permissions:
  contents: read

jobs:
  deploy:
    name: Deploy to EC2
    runs-on: ubuntu-latest
    environment: production

    steps:
    - name: Checkout repository
      uses: actions/checkout@v4

    - name: Configure SSH Access
      uses: webfactory/ssh-agent@v0.5.3
      with:
        ssh-private-key: ${{ secrets.EC2_SSH_PRIVATE_KEY }}

    - name: Deploy to EC2
      run: |
        ssh -o StrictHostKeyChecking=no admin@ec2-98-83-245-82.compute-1.amazonaws.com << 'EOF'
          set -e

          # Navigate to the project directory
          cd /home/admin/ProxyAuthRequired  

          # Switch to root user
          sudo su

          # Pull the latest changes from the repository
          git fetch --all
          git reset --hard origin/main

          # Recreate the .env file
          echo "ENV=${{ secrets.ENV }}" > .env
          
          # Stop existing Docker containers
          docker-compose down

          # Rebuild Docker containers without cache
          docker-compose build --no-cache

          # Start Docker containers in detached mode
          docker-compose up -d --remove-orphans

          # Clean up dangling Docker images
          docker image prune -f
        EOF 
 ```


# Explanation

- **Trigger:** The workflow triggers on every push to the main branch.
- **Permissions:** Grants read access to repository contents.
- **Job:** Deploy to EC2:
  - **Configure SSH Access:** Uses the `webfactory/ssh-agent@v0.5.3` action to set up SSH access using the private key stored in GitHub Secrets (`EC2_SSH_PRIVATE_KEY`).
  - **Deploy to EC2:**
    - Establishes an SSH connection to the EC2 instance.
    - Navigates to the project directory.
    - Switches to the root user to perform administrative tasks.
    - Pulls the latest code from the main branch.
    - Recreates the `.env` file with environment variables stored in GitHub Secrets (`ENV`).
    - Stops existing Docker containers using `docker-compose down`.
    - Rebuilds Docker containers without using cache to ensure the latest changes are incorporated.
    - Starts the Docker containers in detached mode, removing any orphaned containers.
    - Cleans up any dangling Docker images to free up space.
   

## Monitoring and Logging

Effective monitoring and logging are crucial for maintaining the health and performance of the application. Here's how I set up monitoring and logging using AWS services:

### CloudFront Logs

**Configuration:**

- Enabled logging for the CloudFront distribution.
- Logs are stored in a designated S3 bucket.

**Analysis:**

- Utilized Amazon Athena to query the logs.
- Extracted insights such as:
  - **Top IP Addresses:** Identifying the most frequent visitors.
  - **HTTP Status Codes:** Monitoring error rates, e.g., 502 errors.
  - **Malicious Traffic Patterns:** Detecting unusual or harmful traffic.

### WAF Logs

**Configuration:**

- Configured AWS WAF to log all actions to CloudWatch Logs.

**Analysis:**

- Queried WAF logs to identify and block suspicious traffic.
- Continuously monitored logs to refine and update WAF rules for enhanced security.

### CloudWatch Monitoring

**Metrics:**

- Monitored key metrics such as request counts, error rates, and latency.

**Alerts:**

- Set up alerts for traffic spikes, unusual error rates, and other anomalous behaviors.
- Ensured timely notifications to address potential issues promptly.

## Security Configurations

Ensuring the security of the application was a top priority. Below are the key security measures and configurations implemented:

### SSL/TLS Encryption

**AWS Certificate Manager (ACM):**

- Generated SSL/TLS certificates for `proxyauthrequired.com` and `www.proxyauthrequired.com`.
- Attached the certificates to the CloudFront distribution to enable secure HTTPS communication.

**Viewer Protocol Policy:**

- Configured CloudFront to redirect all HTTP requests to HTTPS, ensuring encrypted data transmission.

### AWS WAF Rules

To protect the application from malicious traffic, I configured AWS WAF with custom rules tailored to our specific needs. Here are some of the key rules implemented:

#### Block Malicious Bots

- **Rule:** Identifies and blocks requests with known malicious User-Agent strings.
- **Configuration:**
  - Created a regex pattern set to match malicious User-Agents.
  - Configured the rule to block any request matching the pattern.

#### IP Address Filtering

- **Rule:** Blocks requests originating from suspicious IP addresses.
- **Configuration:**
  - Maintained a blacklist of IP addresses known for malicious activities.
  - Configured the rule to block any request from these IPs.

#### Rate Limiting

- **Rule:** Prevents DDoS attacks by limiting the number of requests from a single IP within a specified time frame.
- **Configuration:**
  - Set a threshold for the number of allowed requests per minute.
  - Configured the rule to block any IP exceeding this threshold (1000).

#### SQL Injection Protection

- **Rule:** Detects and blocks attempts at SQL injection attacks.
- **Configuration:**
  - Enabled the AWS WAF managed rule for SQL injection prevention.
  - Applied the rule to all incoming requests.

#### Cross-Site Scripting (XSS) Protection

- **Rule:** Identifies and blocks XSS attack attempts.
- **Configuration:**
  - Enabled the AWS WAF managed rule for XSS prevention.
  - Applied the rule to all incoming requests.

### Instance Security

**Instance Metadata Service Version 2 (IMDSv2):**

- Enabled and enforced IMDSv2 to secure instance metadata access.

**Security Groups:**

- Configured security groups to allow only necessary inbound and outbound traffic.
- Restricted access to SSH (port 22) to specific IP addresses.

**Termination Protection:**

- Enabled termination protection on the EC2 instance to prevent accidental termination.

### AWS Private CA

**Internal Certificate Management:**

- Created a root CA for managing internal certificates.
- Issued certificates for secure communication between internal services.
- Ensured that all inter-service communications are encrypted and authenticated.

## Instance Details

For reference, here are the detailed specifications of the EC2 instance hosting the application:

- **Instance ID:** `i-0fdfaebd00c56d010`
- **Instance Type:** `t3.xlarge`
- **Public IPv4 Address:** `98.83.245.82`
- **Private IPv4 Address:** `172.31.11.94`
- **AMI ID:** `ami-064519b8c76274859` (Debian 12)
- **VPC ID:** `vpc-01bc0e27ca2a3e8e2`
- **Subnet ID:** `subnet-07bcdd03b2217bbbb`
- **Elastic IP:** `98.83.245.82`
- **Security Groups:** Configured to allow HTTP (80), HTTPS (443), and SSH (22) from specific IPs.
- **Key Pair:** `xploitcraft`
- **IAM Role:** `Prod`
- **Monitoring:** Enabled detailed monitoring via CloudWatch.
- **Termination Protection:** Enabled to prevent accidental termination.
- **Launch Time:** Sun Dec 22 2024 00:39:25 GMT-0500 (Eastern Standard Time)
- **Instance State:** Running
- **Hostname:** `ec2-98-83-245-82.compute-1.amazonaws.com`

## Troubleshooting

During the deployment and configuration process, several challenges were encountered. Below are some common issues and their resolutions:

### 1. SSH Connection Issues

**Problem:** Unable to establish an SSH connection to the EC2 instance.

**Solution:**

- Verified that the correct SSH key is being used.
- Ensured that the security group allows inbound SSH (port 22) from the required IP addresses.
- Checked that the EC2 instance is running and accessible.

### 2. Docker Compose Failures

**Problem:** Docker containers fail to start or rebuild.

**Solution:**

- Ensured that Docker and Docker Compose are correctly installed on the EC2 instance.
- Verified that the `docker-compose.yml` file is correctly configured.
- Checked for any syntax errors or missing dependencies in the Docker configuration.

### 3. WAF Rule Misconfigurations

**Problem:** Legitimate traffic being blocked by WAF rules.

**Solution:**

- Reviewed WAF logs in CloudWatch to identify false positives.
- Adjusted WAF rules to fine-tune the blocking criteria.
- Implemented exception rules for trusted IPs or User-Agent strings.

### 4. CloudFront Caching Issues

**Problem:** Users seeing outdated content due to caching.

**Solution:**

- Configured appropriate cache invalidation rules in CloudFront.
- Implemented versioning for static assets to ensure clients receive the latest versions.
- Set appropriate cache-control headers in the React application.

### 5. SSL Certificate Errors

**Problem:** Browsers flagging the site as insecure.

**Solution:**

- Verified that the SSL/TLS certificates are correctly attached to the CloudFront distribution.
- Ensured that the certificates are valid and not expired.
- Checked that the domain names in the certificates match the application's domain.
