import { Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  GithubIcon,
  LinkedinIcon,
  XIcon,
} from "@/components/icons/social-icons";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const items = [
  { key: "github", label: "GitHub", href: siteConfig.social.github, Icon: GithubIcon },
  {
    key: "linkedin",
    label: "LinkedIn",
    href: siteConfig.social.linkedin,
    Icon: LinkedinIcon,
  },
  { key: "twitter", label: "X (Twitter)", href: siteConfig.social.twitter, Icon: XIcon },
  { key: "email", label: "Email", href: siteConfig.social.email, Icon: Mail },
];

export function SocialLinks({
  className,
  variant = "outline",
  size = "icon",
  only,
}) {
  const list = only ? items.filter((i) => only.includes(i.key)) : items;
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {list.map(({ key, label, href, Icon }) => {
        const isMail = href?.startsWith("mailto");
        return (
          <Button
            key={key}
            asChild
            variant={variant}
            size={size}
            aria-label={label}
            className="rounded-xl transition-transform hover:-translate-y-0.5"
          >
            <a
              href={href}
              target={isMail ? undefined : "_blank"}
              rel={isMail ? undefined : "noopener noreferrer"}
            >
              <Icon className="size-4" />
            </a>
          </Button>
        );
      })}
    </div>
  );
}
