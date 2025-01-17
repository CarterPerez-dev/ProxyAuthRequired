# Setup Instructions

### To run locally and or Devlop further

## Prerequisites

Before you begin, ensure that your system meets the following requirements:

### Operating System
- Linux (Ubuntu/Debian recommended)

### Installed Software
- Git
- Docker
- Docker Compose
- A text editor (e.g., nano, vim, gedit)

### Sign Up for API's
- Create an openai api account and create an api key
- Create a Sendgrid account, verify your sender email, then create an api key

## Installation Steps

### Step 1: Open a Terminal
Start by opening your preferred terminal application.

### Step 2: Navigate to Your Desired Directory
Choose the directory where you want to clone the project repository. For example, to navigate to the `Projects` directory in your home folder:

```bash
cd ~/Projects
```

### Step 3: Clone the Repository
Clone the ProxyAuthRequired repository using HTTPS for simplicity:

```bash
git clone https://github.com/CarterPerez-dev/ProxyAuthRequired.git
```

### Step 4: Navigate into the Application Directory
Change your current directory to the cloned repository:

```bash
cd ProxyAuthRequired
```

### Step 5: Create and Configure the `.env` File
The application requires specific environment variables to function correctly.

#### Create the `.env` File:
Use any text editor (nano, vim, or gedit). Example with `nano`:

```bash
nano .env
```

#### Populate the `.env` File:
Copy the contents from the provided `ENV_example` file into your `.env` file:

```bash
cp ENV_example .env
nano .env
```

#### Example `.env` Configuration:

```env
# .env

#Please keep .env in your .gitignore- this is an example of my .env for this app.

# OpenAI 
OPENAI_API_KEY=your_openai_key

# Sendgrid
SMTP_SERVER=smtp.sendgrid.net
SMTP_PORT=587 
SMTP_USER=apikey # The SMTP_USER is literally "apikey"
SMTP_PASSWORD=your_sendgrid_api_key # This is api key to sign into your sendgrid account
EMAIL_FROM=your_email # Email you are using to send emails with sendgrid
SENDGRID_API_KEY=Sendgrid_api_key # This is the api key to actually send the emails with sendgrid 

# I know this Sendgrid set up is confusing so read this - https://www.twilio.com/docs/sendgrid/for-developers/sending-email/quickstart-python

#Backend
SECRET_KEY=create_a_long_complex_key
ADMIN_API_KEY=create_password

REDIS_PASSWORD=create_password

#Mongo/Database
MONGO_URI=mongodb://mongodb:27017/xploitcraft

#Celery
CELERY_BROKER_URL=redis://redis:6379/
CELERY_RESULT_BACKEND=redis://redis:6379/0


```



#### Save and Exit:
- In `nano`, press `CTRL + O` to write changes, then `CTRL + X` to exit.
- In `vim`, press `ESC`, type `:wq`, and press `ENTER`.
- In `gedit`, save and close the file.


## Nginx Configuration

Make sure you navigate to the **nginx** directory in the root of this project, then into the **sites_enabled** directory.  
Open (e.g., with `nano`) the **reverse_proxy.conf** file.  
Change it from:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name proxyauthrequired.com www.proxyauthrequired.com;

    location / {
        proxy_pass http://apache:8080;  
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

#### And change it to:

```nginx
server {
        listen 80;
        listen [::]:80;
        server_name _;

       
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;


        location / {
            proxy_pass http://apache:8080;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            
        }
    }

```

## Sendgrid email change

```bash
cd ~/Projects/backend/helpers
```

```bash
nano email_helper.py
```

#### replace my email address

```python
message = Mail(
        from_email='dailycyberbrief@proxyauthrequired.com',  # Replace this email address with the email address you will use in sengrid
        to_emails=to_email,
        subject=subject,
        html_content=content
```

### Step 6: Update and Upgrade System Packages

```bash
sudo apt update && sudo apt upgrade -y
```

### Step 7: Install Docker

#### Install Docker:

```bash
sudo apt install -y docker.io
```

#### Start and Enable Docker Service:

```bash
sudo systemctl start docker
sudo systemctl enable docker
```

#### Verify Docker Installation:

```bash
docker --version
```

Expected Output:
```plaintext
Docker version 23.xx.x, build xxxxxxx
```

### Step 8: Install Docker Compose

```bash
sudo apt install -y docker-compose
```

#### Verify Installation:

```bash
docker-compose --version
```

Expected Output:
```plaintext
docker-compose version 1.29.2, build 5becea4c
```

### Step 9: Add Your User to the Docker Group
To run Docker commands without `sudo`:

```bash
sudo usermod -aG docker $USER
```

**Important:** Log out and log back in or run:

```bash
newgrp docker
```

### Step 10: Build and Run the Application with Docker Compose

```bash
docker-compose up --build
```

#### Explanation:
- `docker-compose up`: Starts the containers.
- `--build`: Rebuilds Docker images to incorporate the latest changes.

#### Accessing the Application:

Open your web browser and navigate to:

```plaintext
http://localhost
```

You should see the ProxyAuthRequired.com application running.

---

## Development and Editing Instructions

### Step 1: Modify `docker-compose.yml` for Development

```bash
nano docker-compose.yml
```

#### Add `node_modules` Volume:

```yaml
frontend:
  container_name: frontend_service
  build:
    context: ./frontend/my-react-app
    dockerfile: Dockerfile.dev
  ports:
    - "3000:3000"
  volumes:
    - ./frontend/my-react-app:/app
    - /app/node_modules
  networks:
    - xploitcraft_network
  restart: always
```

#### Update Build Context and Dockerfile:

```yaml
frontend:
  build:
    context: ./frontend/my-react-app
    dockerfile: Dockerfile.dev
```

#### Save and Exit:
- In `nano`, press `CTRL + O`, then `CTRL + X`.
- In `vim`, press `ESC`, type `:wq`, and press `ENTER`.
- In `gedit`, save and close the file.

### Step 2: Rebuild and Restart the Containers

```bash
docker-compose down
docker-compose up --build
```

### Step 3: Edit Docker Compose Configuration (Optional)

```bash
nano docker-compose.yml
```

### Step 4: Accessing the Development Environment

- **Frontend:** Located in `./frontend/my-react-app`
- **Backend:** Located in `./backend`

---

## Additional Configuration Tips

### Environment Variables
Ensure all necessary environment variables are correctly set in the `.env` file. Refer to `ENV_example` for guidance.

### Managing Docker Permissions

```bash
groups $USER
```

If `docker` is not listed, re-add your user:

```bash
sudo usermod -aG docker $USER
newgrp docker
```

### Stopping the Application

```bash
docker-compose down
```

### Viewing Logs

```bash
docker-compose logs -f
```

---

## Troubleshooting

### Docker Daemon Not Running

```bash
sudo systemctl status docker
```

If it’s not running:

```bash
sudo systemctl start docker
```

### Port Conflicts

```bash
sudo lsof -i -P -n | grep LISTEN
```

### Rebuilding Containers

```bash
docker-compose build --no-cache
docker-compose up --build
```

By following these detailed setup instructions, you can successfully run ProxyAuthRequired.com locally, enabling you to develop, test, and deploy the application effectively. Email me at CarterPerez-dev@proxyauthrequired.com if you have any questions.


# Environment Variables





