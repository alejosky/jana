import { SiteSocialItem } from "@/types/site";

type SiteFooterProps = {
  socialItems: SiteSocialItem[];
};

function SocialIcon({ label }: { label: string }) {
  const key = label.toLowerCase();

  if (key.includes("instagram")) {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5"
          stroke="currentColor"
          strokeWidth="1.6"
          fill="none"
        />
        <circle
          cx="12"
          cy="12"
          r="3.2"
          stroke="currentColor"
          strokeWidth="1.6"
          fill="none"
        />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
      </svg>
    );
  }

  if (key.includes("youtube")) {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect
          x="2"
          y="6"
          width="20"
          height="12"
          rx="3"
          stroke="currentColor"
          strokeWidth="1.6"
          fill="none"
        />
        <path d="M10 9.5L15 12L10 14.5V9.5Z" fill="currentColor" />
      </svg>
    );
  }

  if (key.includes("soundcloud")) {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M4 15c0-1.1.9-2 2-2s2 .9 2 2v1H4v-1z" fill="currentColor" />
        <path
          d="M8 14c0-2 1.79-3.5 4-3.5s4 1.5 4 3.5v0.5H8v-0.5z"
          fill="currentColor"
        />
        <path
          d="M16 9c.55 0 1 .45 1 1v6h-6v-7h3z"
          fill="currentColor"
          opacity="0.95"
        />
      </svg>
    );
  }

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <path d="M2 12h20M12 2v20" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function SiteFooter({ socialItems }: SiteFooterProps) {
  return (
    <footer className="footer">
      <ul className="social-links">
        {socialItems.map((item) => (
          <li key={`${item.label}-${item.href}`}>
            <a
              className="social-link"
              href={item.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={item.label}
            >
              <span className="social-link__icon" aria-hidden="true">
                <SocialIcon label={item.label} />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
