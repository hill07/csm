import { useState, useEffect } from "react";
import Head from "next/head";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CurrencyMeter from "../components/CurrencyMeter";
import CurrencyPairs from "../components/CurrnecyPairs";
import Opportunities from "../components/Opportunities";
import BlogComponent from "@/components/Blog";

export default function Home() {
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [opportunities, setOpportunities] = useState([]);

  const fetchCurrencyData = async () => {
    setLoading(true);

    const urls = [
      "http://apilayer.net/api/live?access_key=f608b3fb0206b9fc0adc00bf9aa32bf1&currencies=EUR,GBP,AUD,NZD&source=USD&format=1",
      "http://apilayer.net/api/live?access_key=f608b3fb0206b9fc0adc00bf9aa32bf1&currencies=USD&source=CHF&format=1",
      "http://apilayer.net/api/live?access_key=f608b3fb0206b9fc0adc00bf9aa32bf1&currencies=USD&source=CAD&format=1",
      "http://apilayer.net/api/live?access_key=f608b3fb0206b9fc0adc00bf9aa32bf1&currencies=USD&source=JPY&format=1",
    ];

    try {
      const responses = await Promise.all(urls.map(url => fetch(url).then(res => res.json())));
      const rates = Object.assign({}, ...responses.map(res => res.quotes));

      const allowedCurrencies = ["EURUSD", "GBPUSD", "AUDUSD", "NZDUSD", "USDCHF", "USDCAD", "USDJPY"];
      const processedData = allowedCurrencies.map(pair => ({
        code: pair,
        strength: rates[`USD${pair.slice(0, 3)}`] ? (1 / rates[`USD${pair.slice(0, 3)}`]) * 100 : 0,
        previous: (rates[`USD${pair.slice(0, 3)}`] ? (1 / rates[`USD${pair.slice(0, 3)}`]) * 100 : 0) * 0.98,
      }));

      setCurrencies(processedData);
    } catch (error) {
      console.error("Error fetching currencies:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOpportunities = async () => {
    try {
      const response = await fetch("/api/opportunities");
      const data = await response.json();
      setOpportunities(data);
    } catch (error) {
      console.error("Error fetching opportunities:", error);
    }
  };

  useEffect(() => {
    fetchCurrencyData();
    const currencyInterval = setInterval(fetchCurrencyData, 10000); // Auto refresh every 10 sec

    fetchOpportunities();
    const opportunitiesInterval = setInterval(fetchOpportunities, 300000); // Auto refresh every 5 min

    return () => {
      clearInterval(currencyInterval);
      clearInterval(opportunitiesInterval);
    };
  }, []);

  return (
    <div className="bg-light">
      <Head>
        <title>Forex Meter - Live Currency Strength</title>
        <meta name="description" content="Track live currency strength for Forex trading and improve your trading strategies with real-time data." />
      </Head>

      <Navbar />

      <div className="container-fluid">
        <div className="row">
          <aside className="col-lg-2 d-none d-lg-block p-3 text-center"></aside>

          <main className="col-lg-8 col-md-12 text-center py-4">
            <CurrencyMeter currencies={currencies} onRefresh={fetchCurrencyData} loading={loading} />
            <Opportunities opportunities={opportunities} />
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
