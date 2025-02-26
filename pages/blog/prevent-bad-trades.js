import React from "react";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PreventBadTrades() {
    const router = useRouter();

    return (
        <div className="container-fluid px-0" style={{ backgroundColor: "#f8f9fa" }}>
            {/* Navbar */}
            <Navbar />

            {/* Back Button */}
            <div className="d-flex justify-content-start mt-3 ms-3">
                <button
                    className="btn"
                    style={{
                        backgroundColor: "#212529",
                        color: "white",
                        padding: "8px 16px",
                        borderRadius: "5px",
                    }}
                    onClick={() => router.push("/")}
                >
                    ← Back
                </button>
            </div>

            {/* Title */}
            <h1 className="fw-bold text-center my-4">Preventing Bad Trades: Risk Management Tips</h1>

            {/* Image Section with Background and Shadow */}
            <div className="d-flex justify-content-center mb-4">
                <div
                    style={{
                        background: "linear-gradient(to right, #eef2f3, #8e9eab)",
                        padding: "20px",
                        borderRadius: "15px",
                        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
                        display: "inline-block",
                    }}
                >
                    <img
                        src="/images/prevent_bad_trades.jpg"
                        className="img-fluid rounded"
                        alt="Risk Management Tips"
                        style={{
                            maxWidth: "400px",
                            width: "100%",
                            objectFit: "contain",
                            borderRadius: "10px",
                        }}
                    />
                </div>
            </div>

            {/* Risk Management Tips */}
            <p className="text-muted text-center mx-auto" style={{ maxWidth: "700px" }}>
                Risk management is crucial in Forex trading. Follow these tips to avoid unnecessary losses:
            </p>

            {/* Step-by-Step Guide */}
            <div className="card p-4 shadow-sm mx-auto mt-4" style={{ maxWidth: "700px" }}>
                <h3 className="fw-bold mb-3">Essential Risk Management Strategies</h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Always set a <strong>Stop-Loss</strong> and <strong>Take-Profit</strong>.</li>
                    <li className="list-group-item">Use a proper <strong>risk-reward ratio</strong> (e.g., 1:2 or higher).</li>
                    <li className="list-group-item">Avoid trading under emotional stress.</li>
                    <li className="list-group-item">Stick to a solid trading plan and backtest strategies.</li>
                </ul>
            </div>

            {/* Final Tips */}
            <div className="card p-4 mt-4 shadow-sm mx-auto mb-4" style={{ maxWidth: "700px" }}>
                <h3 className="fw-bold mb-3">Final Thoughts</h3>
                <p>Implementing these strategies can help you maintain consistency and profitability.</p>
            </div>

            <Footer />
        </div>
    );
}
