import Head from "next/head";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CurrencyMeter from "../components/CurrencyMeter";
import CurrencyPairs from "../components/CurrnecyPairs";
import Opportunities from "../components/Opportunities";
import { useState } from "react";
import BlogComponent from "@/components/Blog";

export default function Home() {
  // Define currencies in the parent component to pass it as props
  const [currencies, setCurrencies] = useState([
    { code: "AUD", strength: 72, previous: 70 },
    { code: "CAD", strength: 65, previous: 66 },
    { code: "CHF", strength: 80, previous: 78 },
    { code: "EUR", strength: 78, previous: 79 },
    { code: "GBP", strength: 85, previous: 82 },
    { code: "JPY", strength: 60, previous: 61 },
    { code: "NZD", strength: 70, previous: 72 },
    { code: "USD", strength: 90, previous: 88 },
  ]);

  return (
    <div className="bg-light">
      <Head>
        <title>Forex Meter - Live Currency Strength</title>
        <meta name="description" content="Track live currency strength for Forex trading and improve your trading strategies with real-time data." />
      </Head>

      {/* Navbar */}
      <Navbar />

      {/* Layout with Side Space for Ads */}
      <div className="container-fluid">
        <div className="row">
          {/* Left Ad Space */}
          <aside className="col-lg-2 d-none d-lg-block p-3 text-center">
            {/* <div className="border p-4 bg-white shadow-sm rounded">Ad Space</div> */}
          </aside>

          {/* Main Content */}
          <main className="col-lg-8 col-md-12 text-center py-4">
            <CurrencyMeter />
            <Opportunities currencies={currencies} />
            <CurrencyPairs />
            <BlogComponent />
          </main>

          {/* Right Ad Space */}
          <aside className="col-lg-2 d-none d-lg-block p-3 text-center">
            {/* <div className="border p-4 bg-white shadow-sm rounded">Ad Space</div> */}
          </aside>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}
