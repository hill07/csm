import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CurrencyPairs = () => {
  const [pairs, setPairs] = useState([]);

  useEffect(() => {
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.rates) {
          const selectedPairs = [
            { pair: "EUR/USD", value: (1 / data.rates["EUR"]).toFixed(4) },
            { pair: "GBP/USD", value: (1 / data.rates["GBP"]).toFixed(4) },
            { pair: "USD/JPY", value: (data.rates["JPY"]).toFixed(2) },
            { pair: "AUD/USD", value: (1 / data.rates["AUD"]).toFixed(4) },
            { pair: "USD/CAD", value: data.rates["CAD"].toFixed(4) },
          ];

          setPairs(selectedPairs);
        }
      })
      .catch((error) => console.error("Error fetching currency pairs:", error));
  }, []);

  return (
    <div className="container my-5">
      <h2 className="text-center fw-bold text-dark display-6 mb-4">Live Currency Pairs</h2>

      <div className="row justify-content-center">
        {pairs.length > 0 ? (
          pairs.map((pair, index) => (
            <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div className="card p-3 text-center shadow-sm border-0">
                <h5 className="fw-bold">{pair.pair}</h5>
                <div className="fw-bold text-success">Rate: {pair.value}</div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted text-center">Fetching currency pairs...</p>
        )}
      </div>
    </div>
  );
};

export default CurrencyPairs;
