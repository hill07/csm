import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "@/components/Footer";

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
    <div>
      <Navbar />
      <div className="container-lg py-5">
        <h1 className="fw-bold text-center pt-5 mb-5">📖 Blog</h1>

        {blogs.map((blog, index) => (
          <div key={index} className={`row mb-5 align-items-center ${index % 2 === 0 ? "flex-row-reverse" : ""}`}>
            {/* Blog Image */}
            <div className="col-md-6 d-flex justify-content-center">
              <div className="rounded-4 shadow-sm overflow-hidden" style={{ width: "100%", maxWidth: "450px", height: "300px" }}>
                <Image
                  src={blog.image}
                  width={450} // Set fixed width
                  height={300} // Set fixed height
                  objectFit="contain" // Show full image without cropping
                  alt={blog.title}
                  className="rounded-4"
                />
              </div>
            </div>

            {/* Blog Content */}
            <div className="col-md-6 text-center text-md-start">
              <h3 className="fw-bold">{blog.title}</h3>
              <p className="text-muted">{blog.excerpt}</p>
              <Link href={`/blog/${blog.slug}`} className="btn btn-dark shadow-sm rounded-3 px-4 py-2">
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}
