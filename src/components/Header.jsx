"use client";

import { useRouter } from "next/navigation";
import { LanguageDropdown } from "./LanguageDropdown";
import Image from "next/image";
import { useGetWindowSize } from "../hooks/useGetWindowSize";

export function Header() {
  const router = useRouter();
  const { screen } = useGetWindowSize();

  return (
    <header
      className={`sticky top-0 z-50 bg-[#0b1020]/80 backdrop-blur-md border-b border-white/10 ${
        screen === "MOBILE" ? "h-[60px]" : "h-[70px]"
      }`}
    >
      <div
        className={`max-w-7xl mx-auto py-2 ${
          screen === "MOBILE"
            ? "px-3"
            : screen === "TABLET"
              ? "px-4"
              : "px-6 py-4"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => router.push("/")}
              className={`font-bold tracking-tight ${
                screen === "MOBILE" ? "text-lg" : "text-xl"
              }`}
            >
              <Image
                src="/images/logo/manora_white.png"
                width={120}
                height={40}
                alt="manora-logo"
                className={`w-auto ${screen === "MOBILE" ? "h-8" : "h-10"}`}
              />
            </button>
          </div>

          {/* Language Dropdown - 모든 화면 크기에서 표시 */}
          <nav className="flex items-center">
            <LanguageDropdown />
          </nav>
        </div>
      </div>
    </header>
  );
}
