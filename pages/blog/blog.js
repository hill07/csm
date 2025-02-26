// import Link from "next/link";
// import Image from "next/image";
// import "bootstrap/dist/css/bootstrap.min.css";

// const blogs = [
//   {
//     title: "How Currency Strength Meter Helps in Trading",
//     slug: "currency-strength-meter",
//     image: "/images/currency_strength_meter.jpg",
//     excerpt: "Learn how the Currency Strength Meter helps traders analyze market strength and choose the right pairs.",
//     content: "Full detailed article about Currency Strength Meter..."
//   },
//   {
//     title: "How to Take Extra Confirmation in Trades",
//     slug: "extra-confirmation-trades",
//     image: "/images/trade_confirmation_chart.jpg",
//     excerpt: "Discover advanced techniques to confirm your trade setups using multiple indicators.",
//     content: "Full article about taking extra confirmations..."
//   },
//   {
//     title: "Preventing Bad Trades: Risk Management Tips",
//     slug: "prevent-bad-trades",
//     image: "/images/prevent_bad_trades.jpg",
//     excerpt: "Avoid bad trades with proper risk management techniques and maintain consistency in Forex trading.",
//     content: "Detailed guide on risk management..."
//   }
// ];

// export default function Blog() {
//   return (
//     <div className="container mt-5">
//       <h1 className="fw-bold text-center mb-4">📖 Blog</h1>
//       <div className="row">
//         {blogs.map((blog, index) => (
//           <div key={index} className="col-md-4">
//             <div className="card mb-4 shadow-sm border-0 rounded-3">
//               <div className="position-relative" style={{ height: "260px", width: "100%" }}>
//                 <Image src={blog.image} layout="fill" objectFit="cover" alt={blog.title} className="card-img-top" />
//               </div>
//               <div className="card-body text-center p-4">
//                 <h5 className="card-title fw-bold fs-5">{blog.title}</h5>
//                 <p className="card-text text-muted fs-6">{blog.excerpt}</p>
//                 <Link href={`/blog/${blog.slug}`} className="btn btn-dark w-100 fw-semibold shadow-sm">
//                   Read More →
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
