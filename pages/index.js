import { useState, useEffect } from "react";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CurrencyMeter from "../components/CurrencyMeter";
import CurrencyPairs from "../components/CurrnecyPairs";
import BlogComponent from "@/components/Blog";

export default function Home() {
  const [currencies, setCurrencies] = useState([]);
  const [previousCurrencies, setPreviousCurrencies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCurrencyData = async () => {
    setLoading(true);

    const baseCurrencies = ["USD", "EUR", "GBP", "AUD", "NZD", "JPY", "CHF", "CAD"];
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const apiUrl = `http://apilayer.net/api/live?access_key=${apiKey}&currencies=EUR,GBP,AUD,NZD,JPY,CHF,CAD&source=USD&format=1`;

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

      // Ensure previous values are stored before updating
      setPreviousCurrencies((prev) => (currencies.length > 0 ? [...currencies] : prev));
      setCurrencies(normalizedStrengths);
    } catch (error) {
      console.error("Error fetching currencies:", error);
    } finally {
      setLoading(false);
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
        <meta
          name="description"
          content="Track live currency strength for Forex trading and improve your trading strategies with real-time data."
        />
      </Head>

      <Navbar />

      <div className="container-fluid">
        <div className="row">
          <aside className="col-lg-2 d-none d-lg-block p-3 text-center"></aside>

          <main className="col-lg-8 col-md-12 text-center py-4">
            <CurrencyMeter currencies={currencies} previousCurrencies={previousCurrencies} loading={loading} />
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
