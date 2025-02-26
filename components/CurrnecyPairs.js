import React from "react";

const CurrencyPairs = () => {
  const majorPairs = ["EUR/USD", "USD/JPY", "GBP/USD", "USD/CHF", "AUD/USD", "USD/CAD", "NZD/USD","GBP/JPY"];
  const minorPairs = ["EUR/GBP", "EUR/AUD", "CHF/JPY", "AUD/JPY", "NZD/JPY", "CAD/CHF"];
  const exoticPairs = ["USD/SGD", "USD/HKD", "USD/TRY", "USD/ZAR", "USD/MXN", "EUR/TRY", "GBP/SGD"];

  return (
    <div className="container mt-5">
      <h2 className="text-center fw-bold mb-4">Currency Pairs</h2>

      <div className="row">
        {/* Major Pairs */}
        <div className="col-md-4">
          <h4 className="text-primary">Major Pairs</h4>
          <ul className="list-group">
            {majorPairs.map((pair, index) => (
              <li key={index} className="list-group-item">{pair}</li>
            ))}
          </ul>
        </div>

        {/* Minor Pairs */}
        <div className="col-md-4">
          <h4 className="text-success">Minor Pairs</h4>
          <ul className="list-group">
            {minorPairs.map((pair, index) => (
              <li key={index} className="list-group-item">{pair}</li>
            ))}
          </ul>
        </div>

        {/* Exotic Pairs */}
        <div className="col-md-4">
          <h4 className="text-danger">Exotic Pairs</h4>
          <ul className="list-group">
            {exoticPairs.map((pair, index) => (
              <li key={index} className="list-group-item">{pair}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CurrencyPairs;
