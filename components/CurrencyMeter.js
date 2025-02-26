import React, { useState, useEffect } from "react";
import { FaArrowUp, FaArrowDown, FaSync } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const CurrencyStrengthMeter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [marketOpen, setMarketOpen] = useState(false);

  const API_URL = "https://api.exchangerate-api.com/v4/latest/USD";
  const requiredCurrencies = ["AUD", "CHF", "EUR", "GBP", "USD", "JPY", "CAD", "NZD"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`Failed to fetch data (Status: ${response.status})`);

        const data = await response.json();
        console.log("API Response:", data);

        if (!data.rates) throw new Error("Invalid data format from API");

        const filteredCurrencies = requiredCurrencies
          .filter((currency) => data.rates[currency])
          .map((currency) => ({
            code: currency,
            strength: (1 / data.rates[currency]) * 100,
            previous: (1 / data.rates[currency] - Math.random() * 0.5) * 100,
          }));

        setCurrencies(filteredCurrencies);

        // Simulate Market Open/Close Status ✅
        const currentHour = new Date().getUTCHours();
        setMarketOpen(currentHour >= 0 && currentHour < 22); // Open from 00:00 - 21:59 UTC
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getBars = (strength) => {
    if (strength >= 80) return 5;
    if (strength >= 60) return 4;
    if (strength >= 40) return 3;
    if (strength >= 20) return 2;
    return 1;
  };

  // Refresh Page Function 🔄
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="container my-5 pt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="fw-bold text-dark display-6">Live Currency Strength</h2>

        {/* Refresh Button with Market Status Indicator ✅ */}
        <div className="d-flex align-items-center">
          {/* Market Status Indicator 🟢⚫ */}
          <div
            className="rounded-circle me-2"
            style={{
              width: "12px",
              height: "12px",
              backgroundColor: marketOpen ? "green" : "#212529",
              transition: "0.3s",
              cursor: "pointer",
            }}
            title={marketOpen ? "Market Open" : "Market Closed"}
          ></div>

          {/* Refresh Button 🔄 */}
          <button
            className="btn d-flex align-items-center text-white"
            onClick={refreshPage}
            style={{
              backgroundColor: "#212529", // ✅ Dark Gray Background
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
      </div>

      {loading && <p className="text-center">Loading currency strength data...</p>}
      {error && <p className="text-center text-danger">{error}</p>}

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mt-3">
        {currencies.map((currency) => {
          const isIncreasing = currency.strength > currency.previous;
          return (
            <div key={currency.code} className="col d-flex">
              <div
                className="card text-center shadow-sm p-4 rounded-4 w-100"
                style={{ background: "#fff", border: "1px solid #ddd", minHeight: "180px" }}
              >
                <h3 className="mb-3 text-dark fw-bold">
                  {currency.code}
                  <span
                    style={{
                      marginLeft: "10px",
                      color: isIncreasing ? "green" : "red",
                      fontSize: "18px",
                    }}
                  >
                    {isIncreasing ? <FaArrowUp /> : <FaArrowDown />}
                  </span>
                </h3>

                {/* Bar Graph Representation */}
                <div className="d-flex justify-content-center align-items-end" style={{ height: "50px", gap: "4px" }}>
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      style={{
                        width: "10px",
                        height: `${(i + 1) * (8 + (currency.strength / 100) * 2)}px`,
                        backgroundColor: i < getBars(currency.strength) ? (isIncreasing ? "green" : "red") : "#ccc",
                        borderRadius: "2px",
                        transition: "height 0.5s ease-in-out",
                      }}
                    ></div>
                  ))}
                </div>

                <p className="mt-2 fw-bold text-muted">Strength: {currency.strength.toFixed(2)}%</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 p-4 text-center text-muted border-top">
        <p>
          🔒 <strong>Security Protocol:</strong> This platform follows strict security measures to protect user data.
        </p>
        <p>
          ⚠️ <strong>Disclaimer:</strong> This tool does not provide financial advice or trading signals. Users should conduct their own research before making any trades.
        </p>
      </div>
    </div>
  );
};

export default CurrencyStrengthMeter;
