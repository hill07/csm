import React, { useState, useEffect } from "react";
import { FaArrowUp, FaArrowDown, FaSync } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const CurrencyMeter = ({ currencies, previousCurrencies, onRefresh }) => {
  const [marketOpen, setMarketOpen] = useState(false);
  const [arrowDirection, setArrowDirection] = useState({});

  // Check if the market is open (Monday to Friday, 00:00 - 22:00 UTC)
  useEffect(() => {
    const currentTime = new Date();
    const currentHour = currentTime.getUTCHours();
    const currentDay = currentTime.getUTCDay();
    setMarketOpen(currentDay >= 1 && currentDay <= 5 && currentHour < 22);
  }, []);

  // Update arrow directions based on currency strength changes
  useEffect(() => {
    if (previousCurrencies.length > 0) {
      let newArrows = { ...arrowDirection }; // Keep existing arrows

      currencies.forEach(({ code, strength }) => {
        const prevCurrency = previousCurrencies.find((prev) => prev.code === code);

        if (prevCurrency) {
          if (strength > prevCurrency.strength) {
            newArrows[code] = "up"; // Show up arrow
          } else if (strength < prevCurrency.strength) {
            newArrows[code] = "down"; // Show down arrow
          }
        }
      });

      setArrowDirection(newArrows);
    }
  }, [currencies]);

  // Determine the number of bars for strength representation
  const getBars = (strength) => {
    if (strength >= 100) return 5;
    if (strength >= 80) return 4;
    if (strength >= 60) return 3;
    if (strength >= 40) return 2;
    return 1;
  };

  return (
    <div className="container text-center">
      <h2 className="fw-bold mt-4 pt-5">Live Currency Strength</h2>

      <div className="d-flex justify-content-center align-items-center mb-3">
        {/* Market Status Indicator */}
        <div
          className="rounded-circle me-2"
          style={{
            width: "12px",
            height: "12px",
            backgroundColor: marketOpen ? "green" : "red",
            transition: "0.3s",
            cursor: "pointer",
          }}
          title={marketOpen ? "Market Open" : "Market Closed"}
        ></div>

        {/* Refresh Button */}
        <button
          className="btn text-white d-flex align-items-center"
          onClick={onRefresh}
          style={{
            backgroundColor: "#212529",
            border: "none",
            padding: "10px 16px",
            borderRadius: "5px",
            fontSize: "16px",
            transition: "0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
          onMouseLeave={(e) => (e.target.style.opacity = "1")}
        >
          <FaSync className="me-2" /> Refresh
        </button>
      </div>

      <div className="row">
        {currencies.map(({ code, strength }) => (
          <div key={code} className="col-md-3 col-sm-6 mb-3">
            <div className="card p-3 shadow-sm text-center">
              <h4 className="fw-bold">{code}</h4>

              {/* Arrow Indicator */}
              <div className="d-flex justify-content-center align-items-center">
                {arrowDirection[code] === "up" && <FaArrowUp color="green" size={20} />}
                {arrowDirection[code] === "down" && <FaArrowDown color="red" size={20} />}
              </div>

              {/* Strength Bars */}
              <div className="d-flex justify-content-center align-items-end" style={{ height: "40px", gap: "4px" }}>
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: "8px",
                      height: `${(i + 1) * (7 + (strength / 100) * 2)}px`,
                      backgroundColor: i < getBars(strength) ? "green" : "#ccc",
                      borderRadius: "2px",
                    }}
                  ></div>
                ))}
              </div>

              <p className="mt-2 fw-bold">Strength: {strength.toFixed(2)}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrencyMeter;
