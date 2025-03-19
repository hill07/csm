import React, { useState, useEffect } from "react";
import { FaArrowUp, FaArrowDown, FaSync } from "react-icons/fa";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const CurrencyMeter = ({ currencies, previousCurrencies }) => {
  const [marketOpen, setMarketOpen] = useState(false);
  const [arrowDirection, setArrowDirection] = useState({});
  const [displayCurrencies, setDisplayCurrencies] = useState(currencies);

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
      <div className="d-flex justify-content-between align-items-center mb-4 mt-5">
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
            onClick={() => window.location.reload()}
          >
            <FaSync className="me-2" />
            Refresh
          </button>
        </div>
      </div>

      <div className="row row-cols-2 row-cols-md-4 g-4 justify-content-center">
        {displayCurrencies.map(({ code, strength }) => (
          <div key={code} className="col">
            <div className="card text-center border-light shadow-sm">
              <div className="card-body">
                <h5 className="card-title">
                  {code}{" "}
                  {arrowDirection[code] === "up" ? (
                    <FaArrowUp className="text-success" />
                  ) : (
                    <FaArrowDown className="text-danger" />
                  )}
                </h5>
                <div className="d-flex justify-content-center align-items-end mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      style={{
                        width: "6px",
                        height: `${8 + i * 4}px`,
                        backgroundColor:
                          i < Math.ceil(strength / 20) ? "#28a745" : "#d3d3d3",
                        margin: "0 2px",
                      }}
                    />
                  ))}
                </div>
                <p className="card-text">Strength: {Number(strength).toFixed(2)}%</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrencyMeter;
