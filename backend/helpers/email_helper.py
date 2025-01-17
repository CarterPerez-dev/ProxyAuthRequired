import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from dotenv import load_dotenv
import sendgrid
import os
from sendgrid.helpers.mail import Mail, Email, To, Content
from sendgrid import SendGridAPIClient



load_dotenv()


def send_email(to_email, subject, content):
    sg_api_key = os.getenv("SENDGRID_API_KEY")

    if not sg_api_key:
        print("SendGrid API key not found. Please ensure it is set in your environment variables.")
        return False

    
    message = Mail(
        from_email='dailycyberbrief@proxyauthrequired.com',  
        to_emails=to_email,
        subject=subject,
        html_content=content
    )

    try:
        sg = SendGridAPIClient(sg_api_key)
        response = sg.send(message)
        print(f"Email sent: Status Code: {response.status_code}")
        print(f"Response Body: {response.body}")
        print(f"Response Headers: {response.headers}")
        return True
    except Exception as e:
        print(f"Error sending email: {str(e)}")
        return False

