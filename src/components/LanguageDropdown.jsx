"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

export function LanguageDropdown() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("EN");
  const [isClient, setIsClient] = useState(false);
  const dropdownRef = useRef(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isClient && i18n) {
      const updateLanguage = () => {
        try {
          const lang = i18n.language ? i18n.language.toUpperCase() : "EN";
          setCurrentLanguage(lang);
        } catch (error) {
          setCurrentLanguage("EN");
        }
      };

      updateLanguage();
      i18n.on("languageChanged", updateLanguage);

      return () => {
        i18n.off("languageChanged", updateLanguage);
      };
    }
  }, [isClient, i18n]);

  const changeLanguage = (lang) => {
    if (i18n && typeof i18n.changeLanguage === "function") {
      i18n.changeLanguage(lang);
    }
    setShowDropdown(false);
  };

  return (
    <div className="relative language-dropdown" ref={dropdownRef}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors cursor-pointer"
      >
        <i className="ri-global-line text-lg"></i>
        <span className="text-sm font-medium current-language">
          {isClient ? currentLanguage : "EN"}
        </span>
        <i
          className={`ri-arrow-down-s-line text-sm transition-transform arrow-icon ${showDropdown ? "rotate-180" : ""}`}
        ></i>
      </button>

      {isClient && (
        <div
          className={`absolute right-0 top-full mt-2 w-20 bg-[#0b1020]/95 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-xl language-dropdown-menu ${
            showDropdown ? "show" : ""
          }`}
        >
          <button
            onClick={() => changeLanguage("en")}
            className={`w-full px-4 py-2 text-sm text-left hover:bg-white/10 transition-colors cursor-pointer language-option ${
              currentLanguage === "EN" ? "active" : ""
            }`}
          >
            EN
          </button>
          <button
            onClick={() => changeLanguage("ko")}
            className={`w-full px-4 py-2 text-sm text-left hover:bg-white/10 transition-colors cursor-pointer language-option ${
              currentLanguage === "KO" ? "active" : ""
            }`}
          >
            KO
          </button>
          <button
            onClick={() => changeLanguage("jp")}
            className={`w-full px-4 py-2 text-sm text-left hover:bg-white/10 transition-colors cursor-pointer language-option ${
              currentLanguage === "JP" ? "active" : ""
            }`}
          >
            JP
          </button>
        </div>
      )}
    </div>
  );
}
