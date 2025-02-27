import Link from "next/link";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/Blog.module.css";

const blogs = [
  {
    title: "How Currency Strength Meter Helps in Trading",
    slug: "how-to-use",
    image: "/images/currency_strength_meter.jpg",
    excerpt: "Learn how the Currency Strength Meter helps traders analyze market strength and choose the right pairs."
  },
  {
    title: "How to Take Extra Confirmation in Trades",
    slug: "extra-confirmation-trades",
    image: "/images/trade_confirmation_chart.jpg",
    excerpt: "Discover advanced techniques to confirm your trade setups using multiple indicators."
  },
  {
    title: "Preventing Bad Trades: Risk Management Tips",
    slug: "prevent_bad_trades",
    image: "/images/prevent_bad_trades.jpg",
    excerpt: "Avoid bad trades with proper risk management techniques and maintain consistency in Forex."
  }
];

export default function Blog() {
  return (
    <div className="container mt-5" id="blog-section">
      <h1 className="fw-bold text-center mb-4">📖 Blog</h1>
      <div className="row">
        {blogs.map((blog, index) => (
          <div key={index} className="col-md-4 d-flex">
            <div className={`card mb-4 shadow-sm border-0 rounded-3 overflow-hidden d-flex flex-column w-100 h-100 ${styles.cardHover}`}>

              {/* Image Section with Fixed Aspect Ratio */}
              <div className="position-relative w-100" style={{ aspectRatio: "16/9", overflow: "hidden" }}>
                <Image src={blog.image} layout="fill" objectFit="cover" alt={blog.title} className="img-fluid p-2" />
              </div>

              {/* Card Content */}
              <div className="card-body d-flex flex-column justify-content-between p-4 flex-grow-1">
                <div>
                  <h5 className="card-title fw-bold fs-5">{blog.title}</h5>
                  <p className="card-text text-muted fs-6">{blog.excerpt}</p>
                </div>
                <Link href={`/blog/${blog.slug}`} className="btn btn-dark fw-semibold shadow-sm mt-auto">
                  Read More →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CSS Fixes */}
      <style jsx>{`
        .${styles.cardHover} {
          transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
        }
        .${styles.cardHover}:hover {
          transform: scale(1.03);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </div>
  );
}
