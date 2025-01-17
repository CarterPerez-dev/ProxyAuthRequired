from flask import Blueprint, request, jsonify
from models.user_subscription import UserSubscription
from helpers.scheduler_helper import schedule_email_task

daily_brief_routes = Blueprint('daily_brief_routes', __name__)

@daily_brief_routes.route('/dailybrief/subscribe', methods=['POST'])
def subscribe():
    data = request.get_json()
    email = data.get('email')
    topic = data.get('topic')
    frequency = data.get('frequency')
    time_slots = data.get('time_slots')


    subscription = UserSubscription(email=email, topic=topic, frequency=frequency, time_slots=time_slots)
    subscription.save_to_db()

 
    for time_slot in time_slots:
        schedule_email_task(subscription, time_slot)

    return jsonify({"message": "Subscription created successfully"}), 201

