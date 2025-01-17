import React, { useState, useEffect } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import './Donate.css';

function Donate() {
    const [state, handleSubmit] = useForm("mwppwapp"); 
    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
        if (state.succeeded) {
            setShowConfirmation(true);
            const timer = setTimeout(() => {
                setShowConfirmation(false);
            }, 15000); 


            return () => clearTimeout(timer);
        }
    }, [state.succeeded]);

    return (
        <div className="donate-page-wrapper">
            <div className="donate-container">
                <div className="donate-box">
                    <h1 className="donate-title">Support My Journey!</h1>
                    <p className="donate-description">
                        Thank you for being a part of my community. Your support helps me continue to enhance the platform, cover operational costs, and bring you the best experience possible. Every cup of coffee fuels my mission to make learning more engaging and accessible for everyone.
                    </p>
                    <a
                        href="https://buymeacoffee.com/carterperez"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="buy-coffee-button"
                    >
                        Buy Me a Coffee
                    </a>
                </div>
                {/* Impact Section */}
                <div className="impact-section">
                    <h3>Your Impact</h3>
                    <p>
                        Your donation helps me improve the platform, add new features, helps pay for AWS hosting, OpenAI tokens, and other operational costs. Every contribution, big or small, makes a difference!
                    </p>
                </div>
                {/* Donation Goals Section */}
                <div className="goals-section">
                    <p>This site is super new and still in its early days, but I’m working on it daily to turn it into the go-to place for learning cybersecurity certifications. Fast forward a year, and it’s going to be 100x better! Be an early supporter now and join me on this journey from the start.</p>
                    <h3>My Goals</h3>
                    <p>
                        - Enhance user experience with new features every week<br />
                        - Cover server and maintenance costs<br />
                        - Fix any bugs as soon as possible<br />
                        - Develop additional resources and content<br />
                        - Keep it free for everyone<br />
                    </p>
                </div>
                {/* Leaderboard Section */}
                <div className="leaderboard-section">
                    <h3>Join the Leaderboard!</h3>
                    <p>
                        Want to be featured on our Leaderboard? If you donate and would like your name to be displayed, please fill out the form below. Sharing your support helps build our community and inspires others to contribute!
                    </p>
                    {!showConfirmation ? (
                        <form className="leaderboard-form" onSubmit={handleSubmit}>
                            <label htmlFor="donorName">Your Name:</label>
                            <input
                                id="donorName"
                                type="text"
                                name="donorName"
                                placeholder="Enter your name"
                                required
                            />
                            <ValidationError 
                                prefix="Name" 
                                field="donorName"
                                errors={state.errors}
                            />
                            <button type="submit" className="submit-button" disabled={state.submitting}>
                                Submit
                            </button>
                        </form>
                    ) : (
                        <p className="confirmation-message">Thank you! Your name has been submitted for the Leaderboard.</p>
                    )}
                    {/* Manual Leaderboard - Updating this section manually based on submissions using formspree */}
                    <div className="manual-leaderboard">
                        <h4>Top Donors</h4>
                        <ul>
                            <li>No donors yet--Be the first!</li>
                            {/* Donors */}
                        </ul>
                    </div>
                </div>
                <div className="thanks-message">
                    <p>Thank you for your generosity!</p>
                </div>
            </div>
        </div>
    );
}

export default Donate;

