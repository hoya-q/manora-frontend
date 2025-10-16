import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import MainPage from "./main/page";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b1020] via-[#0e1230] to-[#0b1020] text-white font-sans">
      <Header />
      <MainPage />
      <Footer />
    </div>
  );
}
