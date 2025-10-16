"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export function Footer() {
  const router = useRouter();
  const { t } = useTranslation();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fallback for SSR - always use English during SSR
  const translate = (key) => {
    if (!isClient) {
      // Return English fallback during SSR
      const fallbacks = {
        privacyTerms: "Privacy & Terms",
        support: "Support",
        aboutUs: "About Us",
      };
      return fallbacks[key] || key;
    }

    try {
      return t && typeof t === "function" ? t(key) : key;
    } catch (error) {
      return key;
    }
  };

  const navigateToPage = (page) => {
    if (page === "privacy-terms") {
      router.push("/privacy-terms");
    } else if (page === "contact") {
      router.push("/contact");
    }
  };

  return (
    <footer className="border-t border-white/10 py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-white/60">© ArtygenSpace. All rights reserved.</p>
          <div className="flex space-x-6">
            <button
              onClick={() => navigateToPage("privacy-terms")}
              className="text-white/60 hover:text-white transition-colors cursor-pointer"
            >
              {translate("privacyTerms")}
            </button>
            <button
              onClick={() => navigateToPage("contact")}
              className="text-white/60 hover:text-white transition-colors cursor-pointer"
            >
              {translate("support")}
            </button>
            <a
              href="https://www.artygenspace.com/artygenspace-eng-version"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors cursor-pointer"
            >
              {translate("aboutUs")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
