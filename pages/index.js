import { useState, useEffect, useMemo } from "react";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CurrencyMeter from "../components/CurrencyMeter";
import CurrencyPairs from "@/components/CurrencyPairs";
import BlogComponent from "@/components/Blog";
import Opportunities from "@/components/Opportunities";

export default function Home() {
  const [currencies, setCurrencies] = useState([]);
  const [previousCurrencies, setPreviousCurrencies] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [error, setError] = useState(null);

  const apiKey = "e0ecc8f09bbc2042a70f1e67b737f593";
  const liveUrl = `https://api.currencylayer.com/live?access_key=${apiKey}&currencies=EUR,GBP,AUD,NZD,JPY,CHF,CAD&source=USD&format=1`;
  const historicalUrl = `https://api.currencylayer.com/historical?access_key=${apiKey}&date=2025-03-06&currencies=EUR,GBP,USD,AUD,NZD,JPY,CHF,CAD&format=1`;

  const [historicalData, setHistoricalData] = useState(null);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const response = await fetch(historicalUrl);
        const data = await response.json();
        if (!data.success || !data.quotes) throw new Error("Failed to fetch historical data");
        setHistoricalData(data);
      } catch (err) {
        console.error("Error fetching historical data:", err);
      }
    };
    fetchHistoricalData();
  }, []);

  const fetchLiveData = async (retries = 3) => {
    try {
      const response = await fetch(liveUrl);
      const liveData = await response.json();
      if (!liveData.success || !liveData.quotes) throw new Error("Live API fetch failed");

      let rates = {};
      Object.entries(liveData.quotes).forEach(([key, value]) => {
        rates[key] = value;
        rates[`${key.slice(3)}USD`] = 1 / value;
      });

      if (!historicalData) return;

      const currencyList = ["USD", "EUR", "GBP", "AUD", "NZD", "JPY", "CHF", "CAD"];
      let strengths = { USD: 0 };
      let totalStrength = 0;

      const calculateChange = (liveRate, historicalRate) => {
        if (!liveRate || !historicalRate || historicalRate === 0) return 0;
        return ((liveRate - historicalRate) / historicalRate) * 100;
      };

      currencyList.forEach((currency) => {
        if (currency !== "USD") {
          const liveRate = rates[`${currency}USD`] || 0;
          const historicalRate = historicalData.quotes[`USD${currency}`] || 1;
          strengths[currency] = calculateChange(1 / liveRate, historicalRate);
          totalStrength += Math.abs(strengths[currency]);
        }
      });

      const adjustedStrengths = currencyList.map((currency) => ({
        code: currency,
        strength: currency === "USD" ? 0 : ((strengths[currency] / totalStrength) * 100).toFixed(2),
      }));

      setPreviousCurrencies([...currencies]);
      setCurrencies(adjustedStrengths);
      setError(null);

      const validPairs = [
        "EURUSD", "GBPUSD", "AUDUSD", "NZDUSD",
        "GBPJPY", "USDJPY", "USDCAD", "USDCHF",
      ];

      const newOpportunities = validPairs.map((pair) => {
        const base = pair.slice(0, 3);
        const quote = pair.slice(3);
        const baseStrength = adjustedStrengths.find((c) => c.code === base)?.strength || 0;
        const quoteStrength = adjustedStrengths.find((c) => c.code === quote)?.strength || 0;
        return baseStrength > quoteStrength + 5 ? { pair, type: "buy" } :
               quoteStrength > baseStrength + 5 ? { pair, type: "sell" } : null;
      }).filter(Boolean);

      setOpportunities(newOpportunities);
    } catch (error) {
      console.error("Error fetching live data:", error);
      if (retries > 0) {
        console.log(`Retrying... Attempts left: ${retries}`);
        setTimeout(() => fetchLiveData(retries - 1), 3000);
      } else {
        setError("Failed to fetch live currency data.");
      }
    }
  };

  useEffect(() => {
    if (historicalData) {
      setTimeout(fetchLiveData, 2000);
      const interval = setInterval(fetchLiveData, 30000);
      return () => clearInterval(interval);
    }
  }, [historicalData]);

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
            <BlogComponent /> {/* Bottom AD for Mobile */}
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
