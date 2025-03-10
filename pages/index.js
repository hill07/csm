import { useState, useEffect } from "react";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CurrencyMeter from "../components/CurrencyMeter";
import CurrencyPairs from "@/components/CurrnecyPairs";
import BlogComponent from "@/components/Blog";
import Opportunities from "@/components/Opportunities";

export default function Home() {
  const [currencies, setCurrencies] = useState([]);
  const [previousCurrencies, setPreviousCurrencies] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [error, setError] = useState(null);

  const apiKey = "e0ecc8f09bbc2042a70f1e67b737f593";
  const liveUrl = `https://api.currencylayer.com/live?access_key=${apiKey}&currencies=EUR,GBP,AUD,NZD,JPY,CHF,CAD&source=USD&format=1`;

  // 📅 Automate Historical Date
  const getPreviousDate = () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return date.toISOString().split("T")[0];
  };
  const historicalUrl = `https://api.currencylayer.com/historical?access_key=${apiKey}&date=${getPreviousDate()}&currencies=EUR,GBP,USD,AUD,NZD,JPY,CHF,CAD&format=1`;

  const fetchData = async () => {
    try {
      const [liveResponse, historicalResponse] = await Promise.all([
        fetch(liveUrl),
        fetch(historicalUrl),
      ]);

      const liveData = await liveResponse.json();
      const historicalData = await historicalResponse.json();

      // ⚡ Improved Error Handling
      if (!liveData.success) throw new Error("Failed to fetch live currency data.");
      if (!historicalData.success) throw new Error("Failed to fetch historical currency data.");

      let rates = {};
      Object.entries(liveData.quotes).forEach(([key, value]) => {
        rates[key] = value;
        rates[`${key.slice(3)}USD`] = 1 / value;
      });

      let totalStrength = 0;
      const baseCurrency = "USD";

      // ⚡ Improved calculateChange Function
      const calculateChange = (liveRate, historicalRate) => {
        if (isNaN(liveRate) || isNaN(historicalRate) || historicalRate === 0) {
          return 0;
        }
        return (((liveRate - historicalRate) / historicalRate) * 100).toFixed(2);
      };

      // 🧩 Optimized Strength Calculation
      const adjustedStrengths = ["USD", "EUR", "GBP", "AUD", "NZD", "JPY", "CHF", "CAD"].map((currency) => {
        const liveRate = rates[`${currency}USD`] ?? (currency === baseCurrency ? 1 : 0);
        const historicalRate = historicalData.quotes[`USD${currency}`] ?? 1;
        const change = calculateChange(1 / liveRate, historicalRate);
        totalStrength += Math.abs(parseFloat(change));

        return {
          code: currency,
          strength: Math.abs(parseFloat(change))
        };
      }).map((currency) => ({
        ...currency,
        strength: ((currency.strength / totalStrength) * 100).toFixed(2),
      }));

      setPreviousCurrencies([...currencies]);
      setCurrencies(adjustedStrengths);
      setError(null);

      // ⚡ Improved Opportunity Detection
      const validPairs = [
        "EURUSD", "GBPUSD", "AUDUSD", "NZDUSD",
        "GBPJPY", "USDJPY", "USDCAD", "USDCHF",
      ];

      const newOpportunities = validPairs.map((pair) => {
        const [base, quote] = [pair.slice(0, 3), pair.slice(3)];
        const baseStrength = adjustedStrengths.find((c) => c.code === base)?.strength || 0;
        const quoteStrength = adjustedStrengths.find((c) => c.code === quote)?.strength || 0;

        const diff = Math.abs(baseStrength - quoteStrength);
        if (diff > 5) {
          return { pair, type: baseStrength > quoteStrength ? "buy" : "sell" };
        }
        return null;
      }).filter(Boolean);

      setOpportunities(newOpportunities);

    } catch (error) {
      console.error("Error:", error);
      setError("Failed to fetch currency data.");
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-light">
      <Head>
        <title>Forex Meter - Live Currency Strength</title>
        <meta name="description" content="Track live currency strength for Forex trading." />
      </Head>

      <Navbar />

      <div className="container-fluid">
        <div className="row">
          {/* Desktop AD - Left */}
          <aside className="d-none d-lg-block">
            <div
              className="bg-light border rounded shadow"
              style={{
                position: "fixed",
                left: "20px",
                top: "50%",
                transform: "translateY(-50%)",
                maxWidth: "160px",
              }}
            >
              <img src="/images/download.jpeg" alt="Ad" className="img-fluid rounded" />
            </div>
          </aside>

          <main className="col-lg-8 col-md-12 text-center py-4 mt-3 mx-auto">
            {/* Top AD for Mobile */}
            <div className="d-lg-none mb-3 text-center">
              <img
                src="/images/download.jpeg"
                alt="Ad"
                className="img-fluid rounded shadow-sm"
                style={{ maxWidth: "90%", margin: "0 auto" }}
              />
            </div>
            {error ? (
              <div className="alert alert-danger">{error}</div>
            ) : (
              <CurrencyMeter
                currencies={currencies}
                previousCurrencies={previousCurrencies}
                fetchCurrencyData={fetchData}
              />
            )}
            <Opportunities opportunities={opportunities} />
            <CurrencyPairs />
            <BlogComponent />

            {/* Bottom AD for Mobile */}
            <div className="d-lg-none mt-3 text-center">
              <img
                src="/images/download.jpeg"
                alt="Ad"
                className="img-fluid rounded shadow-sm"
                style={{ maxWidth: "90%", margin: "0 auto" }}
              />
            </div>
          </main>

          {/* Desktop AD - Right */}
          <aside className="d-none d-lg-block">
            <div
              className="bg-light border rounded shadow"
              style={{
                position: "fixed",
                right: "20px",
                top: "50%",
                transform: "translateY(-50%)",
                maxWidth: "160px",
              }}
            >
              <img src="/images/download.jpeg" alt="Ad" className="img-fluid rounded" />
            </div>
          </aside>

          {/* Mobile AD Section */}
          <div className="d-lg-none text-center my-3">
            <img src="/images/download.jpeg" alt="Mobile Ad" className="img-fluid rounded mb-2" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
