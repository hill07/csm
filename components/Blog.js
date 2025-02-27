export default function Blog() {
  return (
    <div className="container mt-5" id="blog-section">
      <h1 className="fw-bold text-center mb-4">📖 Blog</h1>
      
      {/* Apply `gy-4` for spacing between rows */}
      <div className="row gy-4">
        {blogs.map((blog, index) => (
          <div key={index} className="col-12 col-sm-12 col-md-12 col-lg-4 d-flex">
            <div className={`card mb-4 shadow-sm border-0 rounded-3 overflow-hidden d-flex flex-column w-100 h-100 ${styles.cardHover}`}>

              {/* Image Section with Fixed Height */}
              <div className="position-relative" style={{ height: "260px", width: "100%", aspectRatio: "16/9", overflow: "hidden" }}>
                <Image src={blog.image} layout="fill" objectFit="cover" alt={blog.title} className="card-img-top" />
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
