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
  const [currencies, setCurrencies] = useState(null);
  const [previousCurrencies, setPreviousCurrencies] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [error, setError] = useState(null);
  const [isClient, setIsClient] = useState(false);

  const apiKey = "2feb2ffd227dfdf2fbe16b7c7bce3650";

  // Get yesterday's date dynamically
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const formattedDate = yesterday.toISOString().split("T")[0];

  const liveUrl = `https://api.currencylayer.com/live?access_key=${apiKey}&currencies=EUR,GBP,AUD,NZD,JPY,CHF,CAD&source=USD&format=1`;
  const historicalUrl = `https://api.currencylayer.com/historical?access_key=${apiKey}&date=${formattedDate}&currencies=EUR,GBP,USD,AUD,NZD,JPY,CHF,CAD&format=1`;

  useEffect(() => {
    setIsClient(true);

    const fetchData = async (retries = 3, delay = 3000) => {
      try {
        const [liveResponse, historicalResponse] = await Promise.all([
          fetch(liveUrl),
          fetch(historicalUrl),
        ]);

        const liveData = await liveResponse.json();
        const historicalData = await historicalResponse.json();

        if (!liveData.success) throw new Error("API fetch failed in live");
        if (!historicalData.success) throw new Error("API fetch failed in history");

        // Normalize rates
        let rates = {};
        Object.entries(liveData.quotes).forEach(([pair, value]) => {
          rates[pair] = value; // e.g. USDJPY = 148
          const reversed = `${pair.slice(3)}USD`;
          rates[reversed] = 1 / value; // e.g. JPYUSD = 0.0067
        });

        // Calculate strength
        let strengths = {};
        const currencyList = ["USD", "EUR", "GBP", "AUD", "NZD", "JPY", "CHF", "CAD"];

        // For non-USD
        const otherCurrencies = currencyList.filter(c => c !== "USD");
        otherCurrencies.forEach(currency => {
          const liveRate = rates[`${currency}USD`];
          const histRate = 1 / historicalData.quotes[`USD${currency}`]; // match direction
          const change = ((liveRate - histRate) / histRate) * 100;
          strengths[currency] = change;
        });

        // For USD (average performance vs others)
        let usdTotalChange = 0;
        otherCurrencies.forEach(currency => {
          const liveRate = liveData.quotes[`USD${currency}`];
          const histRate = historicalData.quotes[`USD${currency}`];
          const change = ((liveRate - histRate) / histRate) * 100;
          usdTotalChange += change;
        });
        strengths["USD"] = usdTotalChange / otherCurrencies.length;

        // Normalize all strengths into 0–100 scale
        const values = Object.values(strengths);
        const minVal = Math.min(...values);
        const maxVal = Math.max(...values);

        const adjustedStrengths = currencyList.map(currency => ({
          code: currency,
          strength: Number(
            (((strengths[currency] - minVal) / (maxVal - minVal)) * 100).toFixed(2)
          ),
        }));

        setPreviousCurrencies(currencies ? [...currencies] : []);
        setCurrencies(adjustedStrengths);
        setError(null);

        // Opportunities
        const validPairs = [
          "EURUSD", "GBPUSD", "AUDUSD", "NZDUSD",
          "GBPJPY", "USDJPY", "USDCAD", "USDCHF",
        ];

        const newOpportunities = validPairs.map(pair => {
          const base = pair.slice(0, 3);
          const quote = pair.slice(3);
          const baseStrength = adjustedStrengths.find(c => c.code === base)?.strength || 0;
          const quoteStrength = adjustedStrengths.find(c => c.code === quote)?.strength || 0;

          return baseStrength > quoteStrength + 10
            ? { pair, type: "buy" }
            : quoteStrength > baseStrength + 10
              ? { pair, type: "sell" }
              : null;
        }).filter(Boolean);

        setOpportunities(newOpportunities);
      } catch (err) {
        console.error("Error fetching data:", err);
        if (retries > 0) {
          setTimeout(() => fetchData(retries - 1, delay * 2), delay); // exponential backoff
        } else {
          setError("Failed to fetch currency data.");
        }
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);
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
          <aside className="d-none d-xxl-block">
            <div className="ad-box-left">
              <img src="/images/download.jpeg" alt="Ad" className="img-fluid rounded" />
            </div>
          </aside>

          <main className="col-lg-8 col-md-12 text-center py-4 mt-3 mx-auto">
            {/* Top AD for Mobile */}
            <div className="d-lg-none mb-3 text-center">
              <img src="/images/download.jpeg" alt="Ad" className="img-fluid rounded shadow-sm" />
            </div>

            {error ? (
              <div className="alert alert-danger">{error}</div>
            ) : isClient && currencies ? (
              <>
                <CurrencyMeter currencies={currencies} previousCurrencies={previousCurrencies} />
                {/* Bottom AD for Mobile */}
                <div className="d-lg-none mt-3 text-center">
                  <img src="/images/download.jpeg" alt="Ad" className="img-fluid rounded shadow-sm" />
                </div>
                <Opportunities opportunities={opportunities} />
                <CurrencyPairs />
                <BlogComponent />
              </>
            ) : (
              <p>Loading...</p>
            )}
          </main>

          {/* Desktop AD - Right */}
          <aside className="d-none d-xxl-block">
            <div className="ad-box-right">
              <img src="/images/download.jpeg" alt="Ad" className="img-fluid rounded" />
            </div>
          </aside>
        </div>
      </div>

      <Footer />

      {/* Custom Styling for Ads */}
      <style jsx>{`
        .ad-box-left, .ad-box-right {
          position: fixed;
          top: 50%;
          transform: translateY(-50%);
          max-width: 160px;
        }
        .ad-box-left {
          left: 20px;
        }
        .ad-box-right {
          right: 20px;
        }
        @media (max-width: 1600px) {
          .ad-box-left, .ad-box-right {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
