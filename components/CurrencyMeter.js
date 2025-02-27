import React from "react";
import { FaArrowUp, FaArrowDown, FaSync } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const CurrencyStrengthMeter = ({ currencies, onRefresh, loading }) => {
  const getBars = (strength) => {
    if (strength >= 80) return 5;
    if (strength >= 60) return 4;
    if (strength >= 40) return 3;
    if (strength >= 20) return 2;
    return 1;
  };

  return (
    <div className="container my-4 pt-3 mt-5">
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="fw-bold text-dark">Live Currency Strength</h2>
        
        <button
          className="btn text-white"
          onClick={onRefresh}
          style={{
            backgroundColor: "#212529",
            border: "none",
            padding: "10px 16px",
            borderRadius: "5px",
            fontSize: "16px",
            transition: "0.3s",
          }}
        >
          <FaSync className="me-2" /> Refresh
        </button>
      </div>

      {loading && <p className="text-center">Loading currency strength data...</p>}

      <div className="row row-cols-2 row-cols-md-4 g-3 mt-3">
        {currencies.map((currency) => {
          const isIncreasing = currency.strength > currency.previous;
          return (
            <div key={currency.code} className="col d-flex">
              <div
                className="card text-center shadow-sm p-3 rounded-3 w-100"
                style={{ background: "#fff", border: "1px solid #ddd", minHeight: "150px" }}
              >
                <h4 className="mb-2 text-dark fw-bold">
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
                </h4>

                <div className="d-flex justify-content-center align-items-end" style={{ height: "40px", gap: "4px" }}>
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      style={{
                        width: "8px",
                        height: `${(i + 1) * (7 + (currency.strength / 100) * 2)}px`,
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
    </div>
  );
};

export default CurrencyStrengthMeter;
