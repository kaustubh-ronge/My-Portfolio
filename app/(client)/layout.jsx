import Header from "@/components/HeaderComponents/Header";
import { Footer } from "@/components/sections/Footer";

export default function ClientLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
