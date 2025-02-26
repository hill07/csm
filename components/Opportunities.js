import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const Opportunities = ({ currencies }) => {
  const majorPairs = [
    { pair: "EUR/USD", base: "EUR", quote: "USD" },
    { pair: "USD/JPY", base: "USD", quote: "JPY" },
    { pair: "GBP/USD", base: "GBP", quote: "USD" },
    { pair: "USD/CHF", base: "USD", quote: "CHF" },
    { pair: "AUD/USD", base: "AUD", quote: "USD" },
    { pair: "USD/CAD", base: "USD", quote: "CAD" },
    { pair: "NZD/USD", base: "NZD", quote: "USD" },
    { pair: "GBP/JPY", base: "GBP", quote: "JPY" },
  ];

  const buyOpportunities = [];
  const sellOpportunities = [];

  majorPairs.forEach(({ pair, base }) => {
    const currencyData = currencies.find((c) => c.code === base);
    if (currencyData) {
      if (currencyData.strength > currencyData.previous) {
        buyOpportunities.push(pair);
      } else {
        sellOpportunities.push(pair);
      }
    }
  });

  return (
    <div className="container my-5">
      <h2 className="text-center fw-bold text-dark display-6 mb-4">Opportunities</h2>

      <div className="row">
        {/* BUY Opportunities */}
        <div className="col-md-6">
          <div className="card p-4 shadow-sm">
            <h3 className="text-success fw-bold mb-3">📈 Buy Opportunities</h3>
            {buyOpportunities.length > 0 ? (
              <ul className="list-group">
                {buyOpportunities.map((pair, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    {pair}
                    <FaArrowUp style={{ color: "green" }} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted">No Buy Opportunities</p>
            )}
          </div>
        </div>

        {/* SELL Opportunities */}
        <div className="col-md-6">
          <div className="card p-4 shadow-sm">
            <h3 className="text-danger fw-bold mb-3">📉 Sell Opportunities</h3>
            {sellOpportunities.length > 0 ? (
              <ul className="list-group">
                {sellOpportunities.map((pair, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    {pair}
                    <FaArrowDown style={{ color: "red" }} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted">No Sell Opportunities</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Opportunities;
