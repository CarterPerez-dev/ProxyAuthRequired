# Import the blueprint
from .blueprint import api_bp

# Import all route modules to register their routes with the blueprint
from . import (
    user_routes,
    achievements_routes,
    shop_routes,
    test_routes,
    leaderboard_routes,
    daily_question_routes,
    test_attempt_routes,
    cancel_routes
)

# Export the blueprint
__all__ = ['api_bp']
