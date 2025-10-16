"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { LanguageDropdown } from "./LanguageDropdown";
import Image from "next/image";

export function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fallback for SSR - always use English during SSR
  const translate = (key) => {
    if (!isClient) {
      // Return English fallback during SSR
      const fallbacks = {
        features: "Features",
        demo: "Demo",
        pricing: "Pricing",
        getTheApp: "Get the app",
      };
      return fallbacks[key] || key;
    }

    try {
      return t && typeof t === "function" ? t(key) : key;
    } catch (error) {
      return key;
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setShowMobileMenu(false);
  };

  const navigateToPage = (page) => {
    if (page === "privacy-terms") {
      router.push("/privacy-terms");
    } else if (page === "contact") {
      router.push("/contact");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0b1020]/80 backdrop-blur-md border-b border-white/10 sm:h-[70px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => router.push("/")}
              className="text-xl font-bold tracking-tight"
            >
              <Image
                src="/images/logo/manora_white.png"
                width={120}
                height={40}
                alt="manora-logo"
                className="h-8 sm:h-10 w-auto"
              />
            </button>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* <button
              onClick={() => scrollToSection("features")}
              className="text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              {translate("features")}
            </button>
            <button
              onClick={() => scrollToSection("demo")}
              className="text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              {translate("demo")}
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              {translate("pricing")}
            </button>
            <button
              onClick={() => scrollToSection("download")}
              className="bg-white text-gray-900 px-6 py-2 rounded-2xl font-medium hover:bg-white/90 transition-all hover:-translate-y-0.5 shadow-lg whitespace-nowrap cursor-pointer"
            >
              {translate("getTheApp")}
            </button> */}

            {/* Language Dropdown */}
            <LanguageDropdown />
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden text-white"
          >
            <i
              className={`${showMobileMenu ? "ri-close-line" : "ri-menu-line"} text-xl`}
            ></i>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden mt-3 sm:mt-4 mobile-menu ${showMobileMenu ? "show" : ""}`}
        >
          <div className="bg-[#0b1020]/95 backdrop-blur-md border border-white/10 rounded-xl p-3 sm:p-4 space-y-3 sm:space-y-4">
            <button
              onClick={() => scrollToSection("features")}
              className="block w-full text-left text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              {translate("features")}
            </button>
            <button
              onClick={() => scrollToSection("demo")}
              className="block w-full text-left text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              {translate("demo")}
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="block w-full text-left text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              {translate("pricing")}
            </button>
            <button
              onClick={() => scrollToSection("download")}
              className="block w-full text-left bg-white text-gray-900 px-6 py-2 rounded-2xl font-medium hover:bg-white/90 transition-all hover:-translate-y-0.5 shadow-lg whitespace-nowrap cursor-pointer"
            >
              {translate("getTheApp")}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
