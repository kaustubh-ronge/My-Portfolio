// Hero.jsx — Server Component
import HeroClient from "./HeroClient";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-svh items-center overflow-hidden"
    >
      <HeroClient />
    </section>
  );
}
