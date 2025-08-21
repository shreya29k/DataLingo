import React from "react";
import DataLingoLogo from "./DataLingoLogo";
import "./Pricing.css";

export default function Pricing({ theme }) {
    const isDark = theme === "dark";

    const plans = [
        {
            title: "Free",
            subtitle: "Try DataLingo",
            features: [
                "Chat on web",
                "Generate data and visualize data",
                "Write, edit and create content",
                "Analyze text"
            ],
            price: "$0",
            note: "Free for everyone"
        },
        {
            title: "Pro",
            subtitle: "For everyday productivity",
            features: [
                "Everything in Free, plus:",
                "More Usage*",
                "Access to Research",
                "Extended Thinking for complex work"
            ],
            price: "$17",
            note: "Per month billed annually"
        },
        {
            title: "Max",
            subtitle: "5-20x more usage than Pro",
            features: [
                "Everything in Pro, plus:",
                "Choose 5x or 20x more usage than Pro*",
                "Higher output limits for all tasks",
                "Early access to advanced DataLingo features",
                "Priority access at high traffic times"
            ],
            price: "From $100",
            note: "Per month billed monthly"
        }
    ];

    return (
        <div className={`pricing-container ${theme}`}>
            {/* Navbar */}
            <nav className={`navbar ${isDark ? "navbar-dark" : "navbar-light"}`}>
                <div className="nav-content">
                    <div className="logo" onClick={() => (window.location.href = "/")}>
                        <DataLingoLogo className="logo-icon" />
                        <span className="logo-text">DataLingo</span>
                    </div>
                    <div className="nav-links">
                        <a href="/">Home</a>
                        <a href="/howitworks">How It Works</a>
                        <a href="/aboutus">About</a>
                    </div>
                </div>
            </nav>

            {/* Pricing Section */}
            <section className="pricing-section">
                <h2 className="pricing-heading">Our Pricing</h2>
                <p className="pricing-subtitle">
                    Choose the plan that fits your needs. Switch or cancel anytime.
                </p>

                <div className="pricing-cards">
                    {plans.map((plan, index) => (
                        <div key={index} className="pricing-card">
                            <div>
                                <h3>{plan.title}</h3>
                                <p className="plan-subtitle">{plan.subtitle}</p>
                                <ul className="feature-list">
                                    {plan.features.map((feature, i) => (
                                        <li key={i}>{feature}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="price-section">
                                <p className="price">{plan.price}</p>
                                <p className="note">{plan.note}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className={`footer ${isDark ? "footer-dark" : "footer-light"}`}>
                <p>© {new Date().getFullYear()} DataLingo. All rights reserved.</p>
            </footer>
        </div>
    );
}
