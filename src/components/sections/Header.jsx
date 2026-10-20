import { useState } from "react";

const LINKS = [
  { label: "Classes Renamer", href: "/renamer" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a className="flex items-center gap-4 text-sm" href="/">
            <div className="w-6">
                <svg width="100%" viewBox="0 0 149 116" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M49.1676 5.94873H111.991L65.8032 74.2784H2.97998L49.1676 5.94873Z" fill="#007AFF"/>
                    <path d="M51.9208 80.6117L34.0312 107.078H99.8344L146.022 38.7479H97.4552L69.1571 80.6117H51.9208Z" fill="#312ECB"/>
                </svg>
            </div>
            <span>FacetsDev</span>
            <span className="sr-only">Home</span>
          </a>

          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              {LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    href={link.href}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75 md:hidden dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
          >
            <span className="sr-only">Toggle menu</span>
            <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {open && (
          <nav id="mobile-menu" aria-label="Mobile" className="pb-4 md:hidden">
            <ul className="flex flex-col gap-1 text-sm">
              {LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    className="block px-2 text-heading hover:text-text"
                    href={link.href}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}