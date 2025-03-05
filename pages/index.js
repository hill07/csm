import React, { useState, useEffect } from "react";
import { FaArrowUp, FaArrowDown, FaSync } from "react-icons/fa";
import { Tooltip, OverlayTrigger, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const CurrencyMeter = ({ fetchCurrencyData, currencies, previousCurrencies }) => {
  const [marketOpen, setMarketOpen] = useState(false);
  const [arrowDirection, setArrowDirection] = useState({});
  const [displayCurrencies, setDisplayCurrencies] = useState(currencies);
  const [loading, setLoading] = useState(false);

  // Fix for hydration error
  useEffect(() => {
    if (typeof window !== "undefined") {
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
    }
  }, [currencies, previousCurrencies]);

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

  const handleRefresh = async () => {
    setLoading(true);
    await fetchCurrencyData();
    setLoading(false);
  };

  // Inject keyframes for smooth animation
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes big-small {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.4); }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const renderTooltip = (props) => (
    <Tooltip id="market-status-tooltip" {...props}>
      {marketOpen ? "Market Open" : "Market Closed"}
    </Tooltip>
  );

  return (
    <div className="container my-4">
      {/* Mobile Ad Space - Above Currency Meter */}
      <div className="d-lg-none mb-4">
        <h6 className="bg-dark text-light py-1">Ad Space</h6>
        <div className="bg-light border rounded p-2 text-center">
          {/* <p>Your Ad Here</p> */}
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4 mt-3">
        <h2 className="fw-bold mb-0">Live Currency Strength</h2>
        <div className="d-flex align-items-center">
          <OverlayTrigger placement="bottom" overlay={renderTooltip}>
            <span
              className={`rounded-circle ${marketOpen ? "bg-success" : "bg-danger"}`}
              style={{
                display: "inline-block",
                width: "12px",
                height: "12px",
                marginRight: "10px",
                animation: "big-small 2s infinite ease-in-out",
                transformOrigin: "center",
              }}
            ></span>
          </OverlayTrigger>
          <button
            className="btn btn-dark d-flex align-items-center ms-3"
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

      <div className="row row-cols-2 row-cols-md-4 g-3 justify-content-center">
        {displayCurrencies.map(({ code, strength }) => (
          <div key={code} className="col">
            <div className="card text-center border-light shadow-sm rounded-3">
              <div className="card-body">
                <h6 className="card-title mb-1">
                  {code}{" "}
                  {arrowDirection[code] === "up" ? (
                    <FaArrowUp className="text-success" />
                  ) : (
                    <FaArrowDown className="text-danger" />
                  )}
                </h6>
                <div className="progress mb-2" style={{ height: "6px" }}>
                  <div
                    className="progress-bar bg-primary"
                    role="progressbar"
                    style={{ width: `${strength}%`, transition: "width 0.5s" }}
                  ></div>
                </div>
                <p className="card-text" style={{ fontSize: "0.85rem" }}>
                  Strength: {strength.toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Ad Space - Below Currency Meter */}
      <div className="d-lg-none mt-4">
        <h6 className="bg-dark text-light py-1">Ad Space</h6>
        <div className="bg-light border rounded p-2 text-center">
          {/* <p>Your Ad Here</p> */}
        </div>
      </div>
    </div>
  );
};

export default CurrencyMeter;
