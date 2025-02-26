import React from "react";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function HowToUse() {
    const router = useRouter();

    return (
        <div className="container-fluid px-0" style={{ backgroundColor: "#f8f9fa" }}>
            {/* Navbar */}
            <Navbar />

            {/* Back Button */}
            <button
                className="btn text-white mb-3"
                onClick={() => navigate(-1)}
                style={{
                    backgroundColor: "#212529", // ✅ Dark Gray Background
                    border: "none",
                    padding: "10px 16px",
                    borderRadius: "5px",
                    fontSize: "16px",
                    transition: "0.3s",
                    color:"white"
                }}
                onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
                onMouseLeave={(e) => (e.target.style.opacity = "1")}
            >
                ← Back
            </button>

            {/* Title */}
            <h1 className="fw-bold text-center my-4">How to Use the Currency Strength Meter</h1>

            {/* Image Section with Background and Shadow */}
            <div className="d-flex justify-content-center mb-4">
                <div
                    style={{
                        background: "linear-gradient(to right, #eef2f3, #8e9eab)", // Gradient background
                        padding: "20px",
                        borderRadius: "15px",
                        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)", // Soft shadow effect
                        display: "inline-block",
                    }}
                >
                    <img
                        src="/images/currency_strength_meter.jpg"
                        className="img-fluid rounded"
                        alt="Currency Strength Meter"
                        style={{
                            maxWidth: "400px",
                            width: "100%",
                            objectFit: "contain",
                            borderRadius: "10px",
                        }}
                    />
                </div>
            </div>

            {/* Introduction */}
            <p className="text-muted text-center mx-auto" style={{ maxWidth: "700px" }}>
                The Currency Strength Meter helps traders evaluate the relative strength of different currencies in real-time.
                It simplifies trade selection by highlighting strong and weak currency pairs.
            </p>

            {/* Step-by-Step Guide */}
            <div className="card p-4 shadow-sm mx-auto mt-4" style={{ maxWidth: "700px" }}>
                <h3 className="fw-bold mb-3">Step-by-Step Guide</h3>
                <ol className="list-group list-group-numbered">
                    <li className="list-group-item">Open the Currency Strength Meter and observe the strongest and weakest currencies.</li>
                    <li className="list-group-item">Identify currency pairs where one currency is strong, and the other is weak.</li>
                    <li className="list-group-item">Use basic technical indicators like Moving Averages or Support/Resistance to confirm the trend.</li>
                    <li className="list-group-item">Enter the trade following the trend direction, and apply stop-loss and take-profit levels.</li>
                </ol>
            </div>

            {/* Important Tips */}
            <div className="card p-4 mt-4 shadow-sm mx-auto mb-4" style={{ maxWidth: "700px" }}>
                <h3 className="fw-bold mb-3">Important Tips</h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Avoid trading during low volatility periods, as price movements can be misleading.</li>
                    <li className="list-group-item">Do not rely solely on the meter—always use proper risk management.</li>
                    <li className="list-group-item">Higher timeframes generally provide more reliable strength readings.</li>
                </ul>
            </div>
            <Footer />
        </div>
    );
}
