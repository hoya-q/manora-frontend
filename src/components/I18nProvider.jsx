"use client";

import { useEffect } from "react";
import i18n from "@/src/app/lib/i18n";

export function I18nProvider({ children }) {
  useEffect(() => {
    // Initialize i18n only on client side
    if (typeof window !== "undefined") {
      i18n.init();
    }
  }, []);

  return <>{children}</>;
}
