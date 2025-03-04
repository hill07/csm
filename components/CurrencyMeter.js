import React, { useState, useEffect } from "react";
import { FaArrowUp, FaArrowDown, FaSync } from "react-icons/fa";
import { Tooltip, OverlayTrigger, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const CurrencyMeter = ({ fetchCurrencyData, currencies, previousCurrencies }) => {
  const [marketOpen, setMarketOpen] = useState(false);
  const [arrowDirection, setArrowDirection] = useState({});
  const [displayCurrencies, setDisplayCurrencies] = useState(currencies);
  const [loading, setLoading] = useState(false);

  // Market Open Check (Monday to Friday, 00:00 - 22:00 UTC)
  useEffect(() => {
    const currentTime = new Date();
    const currentHour = currentTime.getUTCHours();
    const currentDay = currentTime.getUTCDay();
    const isOpen = currentDay >= 1 && currentDay <= 5 && currentHour < 22;

    setMarketOpen(isOpen);

    if (!isOpen && previousCurrencies.length > 0) {
      setDisplayCurrencies(previousCurrencies);
    } else {
      setDisplayCurrencies(currencies);
    }
  }, [currencies, previousCurrencies]);

  // Update arrow directions based on strength changes
  useEffect(() => {
    if (previousCurrencies.length > 0) {
      let newArrows = {};
      currencies.forEach(({ code, strength }) => {
        const prevCurrency = previousCurrencies.find((prev) => prev.code === code);
        if (prevCurrency) {
          newArrows[code] = strength > prevCurrency.strength ? "up" : "down";
        }
      });
      setArrowDirection(newArrows);
    }
  }, [currencies, previousCurrencies]);

  // Function to refresh data
  const handleRefresh = async () => {
    setLoading(true);
    await fetchCurrencyData();
    setLoading(false);
  };

  // Strength bar logic with gradient
  const getBarColor = (strength) => {
    if (strength >= 60) return "bg-success";
    if (strength >= 40) return "bg-warning";
    return "bg-danger";
  };

  // Tooltip for market status
  const renderTooltip = (props) => (
    <Tooltip id="market-status-tooltip" {...props}>
      {marketOpen ? "Market Open" : "Market Closed"}
    </Tooltip>
  );

  return (
    <div className="container text-center mt-5">
      {/* Horizontal alignment for title, market status, and refresh button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Live Currency Strength</h2>
        <div className="d-flex align-items-center">
          <OverlayTrigger placement="bottom" overlay={renderTooltip}>
            <div
              className={`spinner-grow me-2 mf-3 ${marketOpen ? "text-success" : "text-danger"}`}
              style={{ width: "12px", height: "12px", transition: "0.3s" }}
            ></div>
          </OverlayTrigger>
          <button
            className="btn text-white d-flex align-items-center"
            style={{ backgroundColor: "#212529" }}
            onClick={handleRefresh}
            disabled={loading}
          >
            {loading ? (
              <Spinner as="span" animation="border" size="sm" className="me-2" />
            ) : (
              <FaSync className="me-2" />
            )}
            Refresh
          </button>
        </div>
      </div>

      <div className="row">
        {displayCurrencies.map(({ code, strength }) => (
          <div key={code} className="col-md-3 col-sm-6 mb-3">
            <div
              className="card p-3 shadow-sm text-center border-0"
              style={{ transition: "transform 0.3s", cursor: "pointer" }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <h4 className="fw-bold">
                {code}{" "}
                {arrowDirection[code] === "up" ? (
                  <FaArrowUp className="text-success" />
                ) : arrowDirection[code] === "down" ? (
                  <FaArrowDown className="text-danger" />
                ) : null}
              </h4>
              <div className="progress mt-2" style={{ height: "8px", border: "1px solid #ddd", borderRadius: "5px" }}>
                <div
                  className={`progress-bar ${getBarColor(strength)}`}
                  role="progressbar"
                  style={{
                    width: `${strength > 0 ? Math.max(strength, 5) : 0}%`,
                    transition: "width 0.5s",
                    background: `linear-gradient(90deg, #00c6ff, #0072ff)`,
                  }}
                ></div>
              </div>
              <p className="mt-2">Strength: {strength.toFixed(2)}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrencyMeter;