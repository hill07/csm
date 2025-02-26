import dynamic from "next/dynamic";

// Import Navbar without SSR
const Navbar = dynamic(() => import("../components/Navbar"), { ssr: false });

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
