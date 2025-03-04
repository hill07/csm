import React, { useState, useEffect } from "react";
import { FaArrowUp, FaArrowDown, FaSync } from "react-icons/fa";
import { Tooltip, OverlayTrigger, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const CurrencyMeter = ({ fetchCurrencyData, currencies, previousCurrencies }) => {
  const [marketOpen, setMarketOpen] = useState(false);
  const [arrowDirection, setArrowDirection] = useState({});
  const [displayCurrencies, setDisplayCurrencies] = useState(currencies);
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="container text-center mt-4">
      <h2 className="fw-bold mb-3">Live Currency Strength</h2>
      <button
        className="btn btn-dark mb-4 d-flex align-items-center mx-auto"
        onClick={handleRefresh}
        disabled={loading}
      >
        {loading ? <Spinner animation="border" size="sm" className="me-2" /> : <FaSync className="me-2" />}
        Refresh
      </button>
      <div className="row row-cols-2 g-3">
        {displayCurrencies.map(({ code, strength }) => (
          <div key={code} className="col">
            <div className="card p-2 shadow-sm text-center border-0">
              <h5 className="fw-bold mb-2">
                {code} <FaArrowDown className="text-danger" />
              </h5>
              <div className="progress mb-2" style={{ height: "6px" }}>
                <div
                  className="progress-bar bg-primary"
                  role="progressbar"
                  style={{ width: `${Math.max(strength, 5)}%` }}
                ></div>
              </div>
              <p className="mb-0">Strength: {strength.toFixed(2)}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrencyMeter;
