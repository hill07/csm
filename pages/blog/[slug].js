import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";

// Map slug to corresponding blog file component
import ExtraConfirmation from "./extra-confirmation";
import HowToUse from "./how-to-use";
import PreventBadTrades from "./prevent-bad-trades";

const blogPages = {
  "extra-confirmation-trades": ExtraConfirmation,
  "how-to-use": HowToUse,
  "prevent_bad_trades": PreventBadTrades,
};

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;

  const BlogComponent = blogPages[slug];

  if (!BlogComponent) {
    return (
      <div className="container text-center mt-5">
        <h1>404 - Blog Not Found</h1>
        <button className="btn btn-primary mt-3" onClick={() => router.push("/#blog-section")}>
          ← Back to Blogs
        </button>
      </div>
    );
  }

  return <BlogComponent />;
}
