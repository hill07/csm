import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Navbar() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true); // Ensures component only runs on client
      import("bootstrap/dist/js/bootstrap.bundle.min").catch(() => {});
    }
  }, []);

  // Prevent rendering during SSR
  if (!isClient) return null;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow">
      <div className="container">
        <Link href="/" className="navbar-brand fw-bold text-white fs-4">
          FOREX METER
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav gap-3">
            <li className="nav-item">
              <Link href="/blog" className="nav-link">
                Blog
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
