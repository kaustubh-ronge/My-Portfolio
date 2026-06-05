import Header from "@/components/HeaderComponents/Header";
import { Footer } from "@/components/sections/Footer";
import { SanityLive } from "@/sanity/lib/live";

export default function ClientLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <SanityLive />
    </>
  );
}
