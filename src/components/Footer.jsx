"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useGetWindowSize } from "../hooks/useGetWindowSize";
import { Button } from "@/components/ui/button";

export function Footer() {
  const router = useRouter();
  const { t } = useTranslation();
  const { screen } = useGetWindowSize();
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
      <div
        className={`max-w-6xl mx-auto ${
          screen === "MOBILE" ? "px-4" : screen === "TABLET" ? "px-6" : "px-6"
        }`}
      >
        <div
          className={`flex justify-between items-center ${
            screen === "MOBILE" ? "flex-col space-y-4" : "flex-row"
          }`}
        >
          <p className="text-white/60">© ArtygenSpace. All rights reserved.</p>
          <div className="flex space-x-6">
            <Button
              onClick={() => navigateToPage("privacy-terms")}
              variant="ghost"
              className="text-white/60 hover:text-white bg-transparent hover:bg-transparent p-0 h-auto"
            >
              {translate("privacyTerms")}
            </Button>
            <Button
              onClick={() => navigateToPage("contact")}
              variant="ghost"
              className="text-white/60 hover:text-white bg-transparent hover:bg-transparent p-0 h-auto"
            >
              {translate("support")}
            </Button>
            <Button
              asChild
              variant="ghost"
              className="text-white/60 hover:text-white bg-transparent hover:bg-transparent p-0 h-auto"
            >
              <a
                href="https://www.artygenspace.com/artygenspace-eng-version"
                target="_blank"
                rel="noopener noreferrer"
              >
                {translate("aboutUs")}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
