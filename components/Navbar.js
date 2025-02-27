import { useState } from "react";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow">
      <div className="container">
        <Link
          href="/"
          className="navbar-brand fw-bold text-white fs-4"
          onClick={() => window.location.href = "/"}
        >
          FOREX METER
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNav">
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
