import "./globals.css";
import { I18nProvider } from "@/src/components/I18nProvider";

export const metadata = {
  title: "Manora - Hit play on your life",
  description:
    "Manora condenses the clutter—lectures, photos, documents, and more—into a simple, personalized audio brief, ready when you are.",
  keywords:
    "audio briefing, productivity app, voice recognition, auto summary, mobile app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Remix Icon CDN */}
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.1.0/fonts/remixicon.css"
          rel="stylesheet"
        />
        {/* Font Awesome CDN */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
