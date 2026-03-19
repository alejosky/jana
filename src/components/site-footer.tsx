import { SiteNavItem, SiteSocialItem } from "@/types/site";

type SiteFooterProps = {
  socialItems: SiteSocialItem[];
  imprint?: SiteNavItem;
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

  if (key.includes("facebook")) {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
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

export function SiteFooter({ socialItems, imprint }: SiteFooterProps) {
  return (
    <footer className="footer">
      <div className="footer__content">
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
        {imprint && (
          <a href={imprint.href} className="imprint-link">
            {imprint.label}
          </a>
        )}
      </div>
    </footer>
  );
}
