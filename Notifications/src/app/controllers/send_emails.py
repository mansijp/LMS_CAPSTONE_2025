import requests
import os
from dotenv import load_dotenv

# MORE INFO: https://app.brevo.com/settings/keys/smtp

def send_due_today_email(email, title, name, today_date, bookID):
    
    load_dotenv()
    API_KEY = os.getenv("API_KEY")
    SENDER_EMAIL = os.getenv("SENDER_EMAIL")
    
    url = "https://api.brevo.com/v3/smtp/email"

    payload = {
        "sender": {"name": "LMS CAPSTONE", "email": SENDER_EMAIL},
        "to": [{"email": email}],
        "templateID": 4,
        "params": {"title": title, "name": name, "today": today_date, "bookID": bookID},
    }
    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "api-key": API_KEY
    }

    response = requests.post(url, json=payload, headers=headers)
    if response.status_code == 201:
        print("\n\nEmail sent successfully!\n\n")
        return True
    else:
        print(f"\n\nFailed to send email: {response.status_code} - {response.text}\n\n")
        return False

def send_due_soon_email(email, title, name, bookID, dueDate):
    
    load_dotenv()
    API_KEY = os.getenv("API_KEY")
    SENDER_EMAIL = os.getenv("SENDER_EMAIL")
    
    url = "https://api.brevo.com/v3/smtp/email"

    payload = {
        "sender": {"name": "LMS CAPSTONE", "email": SENDER_EMAIL},
        "to": [{"email": email}],
        "templateID": 5,
        "params": {"title": title, "name": name, "bookID": bookID, "dueDate": dueDate},
    }
    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "api-key": API_KEY
    }

    response = requests.post(url, json=payload, headers=headers)
    if response.status_code == 201:
        print("\n\nEmail sent successfully!\n\n")
        return True
    else:
        print(f"\n\nFailed to send email: {response.status_code} - {response.text}\n\n")
        return False

def send_avail_now_email(email, title, name, rating, isbn):
    
    load_dotenv()
    API_KEY = os.getenv("API_KEY")
    SENDER_EMAIL = os.getenv("SENDER_EMAIL")
    
    url = "https://api.brevo.com/v3/smtp/email"

    payload = {
        "sender": {"name": "LMS CAPSTONE", "email": SENDER_EMAIL},
        "to": [{"email": email}],
        "templateID": 10,
        "params": {"title": title, "name": name, "rating": rating, "isbn": isbn},
    }
    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "api-key": API_KEY
    }

    response = requests.post(url, json=payload, headers=headers)
    if response.status_code == 201:
        print("\n\nEmail sent successfully!\n\n")
        return True
    else:
        print(f"\n\nFailed to send email: {response.status_code} - {response.text}\n\n")
        return False