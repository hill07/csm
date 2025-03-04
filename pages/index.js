import { useState, useEffect } from "react";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CurrencyMeter from "../components/CurrencyMeter";
import CurrencyPairs from "@/components/CurrnecyPairs";
import BlogComponent from "@/components/Blog";

export default function Home() {
  const [currencies, setCurrencies] = useState([]);
  const [previousCurrencies, setPreviousCurrencies] = useState([]);
  const [error, setError] = useState(null);

  // Fetch currency data from the API
  const fetchCurrencyData = async () => {
    const baseCurrencies = ["USD", "EUR", "GBP", "AUD", "NZD", "JPY", "CHF", "CAD"];
    //const apiKey = "7483dcc6f589ad53e5a73d1ef25bfdc9"; // Replace with your secured API Key
    const apiKey = "a71c5105300ef7c367ff4029690524da"; // Replace with your secured API Key
    const apiUrl = `https://apilayer.net/api/live?access_key=${apiKey}&currencies=EUR,GBP,AUD,NZD,JPY,CHF,CAD&source=USD&format=1`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (!data.success || !data.quotes) {
        throw new Error("API fetch failed");
      }

      let rates = {};
      Object.entries(data.quotes).forEach(([key, value]) => {
        rates[key] = value;
        const base = key.slice(3);
        rates[`${base}USD`] = 1 / value;
      });

      let currencyStrengths = {};
      let totalStrength = 0;

      baseCurrencies.forEach((currency) => {
        let sumRates = 0;
        let count = 0;

        baseCurrencies.forEach((other) => {
          if (currency !== other) {
            const pair = `${currency}USD`;
            const inversePair = `USD${currency}`;

            if (rates[pair]) {
              sumRates += rates[pair];
              count++;
            } else if (rates[inversePair]) {
              sumRates += 1 / rates[inversePair];
              count++;
            }
          }
        });

        if (count > 0) {
          currencyStrengths[currency] = sumRates / count;
          totalStrength += currencyStrengths[currency];
        }
      });

      let normalizedStrengths = baseCurrencies.map((currency) => ({
        code: currency,
        strength: ((currencyStrengths[currency] / totalStrength) * 100) || 0,
      }));

      setPreviousCurrencies([...currencies]);
      setCurrencies(normalizedStrengths);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error fetching currencies:", error);
      setError("Failed to fetch currency data. Please try again later.");
    }
  };

  // Fetch currency data on mount and every 10 seconds
  useEffect(() => {
    fetchCurrencyData();
    const interval = setInterval(fetchCurrencyData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-light">
      <Head>
        <title>Forex Meter - Live Currency Strength</title>
        <meta name="description" content="Track live currency strength for Forex trading with real-time data." />
      </Head>

      <Navbar />

      <div className="container-fluid">
        <div className="row">
          <aside className="col-lg-2 d-none d-lg-block p-3 text-center"></aside>

          <main className="col-lg-8 col-md-12 text-center py- mt-5">
            {error ? (
              <div className="alert alert-danger">{error}</div>
            ) : (
              <CurrencyMeter
                fetchCurrencyData={fetchCurrencyData}
                currencies={currencies}
                previousCurrencies={previousCurrencies}
              />
            )}
            <CurrencyPairs />
            <BlogComponent />
          </main>

          <aside className="col-lg-2 d-none d-lg-block p-3 text-center"></aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}