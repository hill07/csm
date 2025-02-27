import React from "react";

const Opportunities = ({ opportunities }) => {
  return (
    <div className="container my-4">
      <h2 className="fw-bold text-dark">Trading Opportunities</h2>

      {opportunities.length === 0 ? (
        <p className="text-center">Loading opportunities...</p>
      ) : (
        <ul className="list-group">
          {opportunities.map((opportunity, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{opportunity.pair}</span>
              <span className={opportunity.type === "buy" ? "text-success fw-bold" : "text-danger fw-bold"}>
                {opportunity.type.toUpperCase()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Opportunities;
