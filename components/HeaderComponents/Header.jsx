// Header.jsx — Server Component
import HeaderClient from "./HeaderClient";
import { siteConfig } from "@/lib/site-config";

export default function Header() {
  return (
    <HeaderClient nav={siteConfig.nav} resume={siteConfig.social.resume} />
  );
}
