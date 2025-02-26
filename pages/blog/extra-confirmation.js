import React from "react";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ExtraConfirmation() {
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
            <h1 className="fw-bold text-center my-4">How to Take Extra Confirmation in Trades</h1>

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
                        src="/images/trade_confirmation_chart.jpg" 
                        className="img-fluid rounded" 
                        alt="Trade Confirmation" 
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
                To improve trade accuracy, traders should use extra confirmations like RSI, Moving Averages, and MACD. 
                These indicators help reduce false signals and enhance trade confidence.
            </p>

            {/* Step-by-Step Guide */}
            <div className="card p-4 shadow-sm mx-auto mt-4" style={{ maxWidth: "700px" }}>
                <h3 className="fw-bold mb-3">Key Confirmation Indicators</h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><strong>RSI:</strong> Identifies overbought and oversold conditions.</li>
                    <li className="list-group-item"><strong>Moving Averages:</strong> Determines trend direction.</li>
                    <li className="list-group-item"><strong>MACD:</strong> Helps spot momentum shifts.</li>
                </ul>
            </div>

            {/* Important Tips */}
            <div className="card p-4 mt-4 shadow-sm mx-auto mb-4" style={{ maxWidth: "700px" }}>
                <h3 className="fw-bold mb-3">Important Tips</h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Always wait for confirmation before entering a trade.</li>
                    <li className="list-group-item">Avoid overanalyzing—keep confirmations simple.</li>
                    <li className="list-group-item">Use multiple indicators for better accuracy.</li>
                </ul>
            </div>
            
            {/* Footer */}
            <Footer />
        </div>
    );
}
