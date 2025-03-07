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

  const fetchCurrencyData = async () => {
    const apiKey = "6b346cc441a1c8d86c7232d36e876669";
    const apiUrl = `https://apilayer.net/api/live?access_key=${apiKey}&currencies=EUR,GBP,AUD,NZD,JPY,CHF,CAD&source=USD&format=1`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (!data.success || !data.quotes) throw new Error("API fetch failed");

      let rates = {};
      Object.entries(data.quotes).forEach(([key, value]) => {
        rates[key] = value;
        rates[`${key.slice(3)}USD`] = 1 / value;
      });

      const normalizedStrengths = ["USD", "EUR", "GBP", "AUD", "NZD", "JPY", "CHF", "CAD"].map((currency) => ({
        code: currency,
        strength: ((rates[`${currency}USD`] ?? 0) / 8) * 100 || 0,
      }));

      setPreviousCurrencies([...currencies]);
      setCurrencies(normalizedStrengths);
      setError(null);

      // 📌 Calculate Opportunities
      const newOpportunities = [];
      normalizedStrengths.forEach((currency) => {
        if (currency.strength > 1) {  // Example condition for Buy
          newOpportunities.push({ pair: `${currency.code}/USD`, type: "buy" });
        } else if (currency.strength < 2) {  // Example condition for Sell
          newOpportunities.push({ pair: `${currency.code}/USD`, type: "sell" });
        }
      });
      setOpportunities(newOpportunities);  // 📌 Update opportunities state

    } catch (error) {
      console.error("Error:", error);
      setError("Failed to fetch currency data.");
    }
  };

  useEffect(() => {
    fetchCurrencyData();
    const interval = setInterval(fetchCurrencyData, 10000);
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
          {/* Left AD - Fixed for Desktop */}
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
                fetchCurrencyData={fetchCurrencyData}
              />
            )}{/* Top AD for Mobile */}
            <div className="d-lg-none mb-3 text-center">
              <img
                src="/images/download.jpeg"
                alt="Ad"
                className="img-fluid rounded shadow-sm"
                style={{ maxWidth: "90%", margin: "0 auto" }}
              />
            </div>

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

          {/* Right AD - Fixed for Desktop */}
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
        </div>
      </div>

      <Footer />
    </div>
  );
}
