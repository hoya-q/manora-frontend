"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";

export default function MainPage() {
  const { t } = useTranslation();
  const [isRecording, setIsRecording] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideContainer, setSlideContainer] = useState(null);

  // 클라이언트 사이드 마운트 확인
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 슬라이드 컨테이너 ref 설정
  useEffect(() => {
    if (slideContainer) {
      // 초기 스크롤 위치 설정
      slideContainer.scrollLeft = 0;
    }
  }, [slideContainer]);

  // 슬라이드 스크롤 핸들러
  const handleSlideScroll = (e) => {
    const container = e.target;
    const cardWidth = 320; // w-80 = 320px
    const gap = 32; // gap-8 = 32px
    const scrollLeft = container.scrollLeft;
    const newSlide = Math.round(scrollLeft / (cardWidth + gap));
    setCurrentSlide(Math.min(newSlide, 2)); // 최대 2번째 슬라이드
  };

  // 이전 슬라이드로 이동
  const goToPreviousSlide = () => {
    if (slideContainer) {
      const cardWidth = 320;
      const gap = 32;
      const scrollAmount = cardWidth + gap;
      const newScrollLeft = Math.max(
        0,
        slideContainer.scrollLeft - scrollAmount
      );
      slideContainer.scrollTo({ left: newScrollLeft, behavior: "smooth" });
    }
  };

  // 다음 슬라이드로 이동
  const goToNextSlide = () => {
    if (slideContainer) {
      const cardWidth = 320;
      const gap = 32;
      const scrollAmount = cardWidth + gap;
      const maxScroll = slideContainer.scrollWidth - slideContainer.clientWidth;
      const newScrollLeft = Math.min(
        maxScroll,
        slideContainer.scrollLeft + scrollAmount
      );
      slideContainer.scrollTo({ left: newScrollLeft, behavior: "smooth" });
    }
  };

  // SSR을 위한 폴백 처리 - 항상 영어로 일관성 유지
  const translate = (key) => {
    if (!isMounted) {
      // SSR 중에는 영어 폴백 반환
      const fallbacks = {
        hitPlayOnLife: "Hit play on your life.",
        heroDescription:
          "Manora condenses the clutter—lectures, photos, documents, and more—into a simple, personalized audio brief, ready when you are.",
        downloadAppStore: "Download on the App Store",
        getGooglePlay: "Get it on Google Play",
        freeTrial: "14-day free trial included • Cancel anytime.",
        productivityOnGo: "Productivity, on-the-go.",
        maximizeMoments:
          "Maximize your in-between moments with 'Hey, Manora!'.",
        smartFeatures: "Smart features that work while you move.",
        audioNarration: "Audio narration",
        audioNarrationDesc:
          "Listen to texts, emails, and notes at your own pace.",
        autoSummaries: "Auto-summaries",
        autoSummariesDesc:
          "Get concise summaries of your daily texts, emails, and recordings in seconds.",
        voiceNavigation: "Voice-triggered navigation",
        voiceNavigationDesc:
          "Control the app and access content hands-free, anytime.",
        playFormats: "Play as podcasts, lectures, and quizzes",
        playFormatsDesc:
          "Experience your content in different formats tailored to your learning style and preferences.",
        podcast: "Podcast",
        conversationFormat: "Conversational format",
        conversation: "Conversation",
        interactiveDialogue: "Interactive dialogue",
        lecture: "Lecture",
        educationalFormat: "Educational format",
        quiz: "Quiz",
        interactiveQA: "Interactive Q&A",
        flashcards: "Flashcards",
        memoryTraining: "Memory training",
        pricing: "Pricing",
        choosePlan:
          "Choose the plan that fits. Most people land on Essentials — it's the sweet spot.",
        basic: "Basic",
        basicDesc: "The bare minimum to get started.",
        free: "Free",
        limitedListens: "Limited listens",
        basicSummaries: "Basic summaries",
        manualVoice: "Manual voice commands",
        getBasic: "Get Basic",
        essentials: "Essentials",
        mostPopular: "Most Popular",
        essentialsDesc: "Biggest jump in value — recommended for most.",
        unlimitedBriefs: "Unlimited audio briefs",
        prioritySummaries: "Priority auto-summaries",
        heyManora: '"Hey, Manora" voice trigger',
        crossDeviceSync: "Cross-device sync",
        startEssentials: "Start Essentials",
        afterTrial:
          "After 14-day trial, you'll roll into Essentials unless you choose otherwise.",
        premium: "Premium",
        premiumDesc: "For power users who want everything.",
        allEssentialsFeatures: "All Essentials features",
        advancedAnalytics: "Advanced analytics & exports",
        prioritySupport: "Priority support & early features",
        goPremium: "Go Premium",
        readyToStart: "Ready to get started?",
        downloadToday:
          "Download Manora today and transform how you consume content.",
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

  const simulateVoiceCommand = () => {
    setIsRecording(true);

    setTimeout(() => {
      setIsRecording(false);

      // Show feedback
      const feedback = document.createElement("div");
      feedback.textContent = "Listening...";
      feedback.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        color: white;
        padding: 1rem 2rem;
        border-radius: 2rem;
        border: 1px solid rgba(255, 255, 255, 0.2);
        z-index: 1000;
        animation: fadeInOut 2s ease-in-out;
      `;

      document.body.appendChild(feedback);

      setTimeout(() => {
        if (document.body.contains(feedback)) {
          document.body.removeChild(feedback);
        }
      }, 2000);
    }, 1000);
  };

  return (
    <>
      {/* 배경 블러 효과 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-fuchsia-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* 메인 히어로 섹션 */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* 왼쪽 컬럼 - 텍스트 */}
            <div className="text-left">
              <p className="text-white/60 text-lg mb-4 tracking-wide">
                {translate("hitPlayOnLife")}
              </p>
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 tracking-tight gradient-text">
                Manora
              </h1>
              <p className="text-xl text-white/80 mb-8 leading-relaxed whitespace-pre">
                {translate("heroDescription")}
              </p>

              {/* 액션 버튼들 */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-medium hover:bg-white/90 transition-all hover:-translate-y-0.5 shadow-lg whitespace-nowrap cursor-pointer">
                  {translate("downloadAppStore")}
                </button>
                <button className="bg-white/10 text-white px-8 py-4 rounded-2xl font-medium border border-white/20 hover:bg-white/20 transition-all hover:-translate-y-0.5 whitespace-nowrap cursor-pointer">
                  {translate("getGooglePlay")}
                </button>
              </div>

              <p className="text-white/60 text-sm">{translate("freeTrial")}</p>
            </div>

            {/* 오른쪽 컬럼 - 모바일 앱 데모 */}
            <div className="relative">
              <div className="aspect-[9/16] max-w-sm mx-auto rounded-3xl overflow-hidden">
                <Image
                  src="/images/main-img.jpg"
                  alt="Manora Mobile App Demo"
                  width={400}
                  height={700}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 생산성 CTA */}
      <section id="productivity" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative">
            {/* 그라디언트 스트라이프 배경 */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-fuchsia-500/10 to-cyan-500/10 rounded-3xl"></div>

            <div className="relative bg-white/5 rounded-3xl border border-white/10 p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4 tracking-tight">
                    {translate("productivityOnGo")}
                  </h3>
                  <p className="text-white/80 text-lg leading-relaxed">
                    {translate("maximizeMoments")}
                  </p>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={simulateVoiceCommand}
                    className={`w-20 h-20 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer border border-white/30 backdrop-blur-sm voice-btn ${
                      isRecording ? "recording" : ""
                    }`}
                  >
                    <i className="ri-mic-fill text-white text-2xl"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 기능 섹션 */}
      <section id="features" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
              {translate("smartFeatures")}
            </h2>
          </div>
          <div className="space-y-20">
            {/* 기능 1 - 오디오 내레이션 */}
            <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 items-center">
              <div className="bg-white/5 rounded-3xl border border-white/10 p-8 lg:p-12">
                <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-6">
                  <i className="ri-headphone-line text-indigo-400 text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">
                  {translate("audioNarration")}
                </h3>
                <p className="text-white/80 text-lg leading-relaxed">
                  {translate("audioNarrationDesc")}
                </p>
              </div>
              <div className="aspect-[4/3] bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center lg:col-span-2">
                <p className="text-white/60 text-center px-6">
                  Feature image placeholder
                </p>
              </div>
            </div>

            {/* 기능 2 - 자동 요약 */}
            <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 items-center">
              <div className="aspect-[4/3] bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center lg:order-1 lg:col-span-2">
                <p className="text-white/60 text-center px-6">
                  Feature image placeholder
                </p>
              </div>
              <div className="bg-white/5 rounded-3xl border border-white/10 p-8 lg:p-12 lg:order-2">
                <div className="w-16 h-16 bg-violet-500/20 rounded-2xl flex items-center justify-center mb-6">
                  <i className="ri-file-text-line text-violet-400 text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">
                  {translate("autoSummaries")}
                </h3>
                <p className="text-white/80 text-lg leading-relaxed">
                  {translate("autoSummariesDesc")}
                </p>
              </div>
            </div>

            {/* 기능 3 - 음성 트리거 내비게이션 */}
            <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 items-center">
              <div className="bg-white/5 rounded-3xl border border-white/10 p-8 lg:p-12">
                <div className="w-16 h-16 bg-fuchsia-500/20 rounded-2xl flex items-center justify-center mb-6">
                  <i className="ri-mic-line text-fuchsia-400 text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">
                  {translate("voiceNavigation")}
                </h3>
                <p className="text-white/80 text-lg leading-relaxed">
                  {translate("voiceNavigationDesc")}
                </p>
              </div>
              <div className="aspect-[4/3] bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center lg:col-span-2">
                <p className="text-white/60 text-center px-6">
                  Feature image placeholder
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 재생 콘텐츠 타입 섹션 */}
      <section id="demo" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
              {translate("playFormats")}
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              {translate("playFormatsDesc")}
            </p>
          </div>

          {/* 원활하게 통합된 비디오 그리드 */}
          <div className="relative">
            {/* 배경 그라디언트 오버레이 */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-violet-5/5 to-fuchsia-5/5 rounded-3xl"></div>

            <div className="relative bg-white/[0.02] rounded-3xl border border-white/5 p-8 lg:p-12">
              {/* 이전 버튼 */}
              <button
                onClick={goToPreviousSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 slide-arrow-btn"
                disabled={currentSlide === 0}
              >
                <i className="ri-arrow-left-s-line text-white text-xl"></i>
              </button>

              {/* 다음 버튼 */}
              <button
                onClick={goToNextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 slide-arrow-btn"
                disabled={currentSlide === 2}
              >
                <i className="ri-arrow-right-s-line text-white text-xl"></i>
              </button>

              <div
                ref={setSlideContainer}
                className="flex gap-8 overflow-x-auto pb-6 scrollbar-hide slide-container"
                onScroll={handleSlideScroll}
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {/* 콘텐츠 타입 카드들 */}
                {[
                  {
                    type: "podcast",
                    format: "conversationFormat",
                    gradient: "from-indigo-500/10 to-purple-500/10",
                  },
                  {
                    type: "conversation",
                    format: "interactiveDialogue",
                    gradient: "from-violet-500/10 to-fuchsia-500/10",
                  },
                  {
                    type: "lecture",
                    format: "educationalFormat",
                    gradient: "from-fuchsia-500/10 to-cyan-500/10",
                  },
                  {
                    type: "quiz",
                    format: "interactiveQA",
                    gradient: "from-cyan-500/10 to-emerald-500/10",
                  },
                  {
                    type: "flashcards",
                    format: "memoryTraining",
                    gradient: "from-emerald-500/10 to-indigo-500/10",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex-shrink-0 w-80 slide-card">
                    <div
                      className={`bg-gradient-to-br ${item.gradient} rounded-2xl border border-white/10 overflow-hidden backdrop-blur-sm hover:scale-105 transition-transform duration-300 cursor-pointer`}
                    >
                      <div className="aspect-[9/16] flex items-center justify-center relative">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40"></div>
                        <div className="relative text-center z-10">
                          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto backdrop-blur-sm">
                            <i className="ri-play-fill text-white text-xl"></i>
                          </div>
                          <p className="text-white/90 text-lg font-medium">
                            {translate(item.type)}
                          </p>
                          <p className="text-white/60 text-sm mt-2">
                            {translate(item.format)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 스크롤 인디케이터들 */}
              <div className="flex justify-center mt-10 space-x-2">
                {[0, 1, 2].map((index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full slide-indicator ${
                      currentSlide === index
                        ? "bg-white/60 active"
                        : "bg-white/20"
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 요금제 섹션 */}
      <section id="pricing" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
              {translate("pricing")}
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              {translate("choosePlan")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* 베이직 플랜 */}
            <div className="bg-white/5 rounded-3xl border border-white/10 p-8 h-full flex flex-col">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2 tracking-tight">
                  {translate("basic")}
                </h3>
                <p className="text-white/60 mb-6">{translate("basicDesc")}</p>
                <div className="mb-8">
                  <span className="text-3xl font-bold">
                    {translate("free")}
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-white/80">
                    <i className="ri-check-line text-green-400 mr-3"></i>
                    {translate("limitedListens")}
                  </li>
                  <li className="flex items-center text-white/80">
                    <i className="ri-check-line text-green-400 mr-3"></i>
                    {translate("basicSummaries")}
                  </li>
                  <li className="flex items-center text-white/80">
                    <i className="ri-check-line text-green-400 mr-3"></i>
                    {translate("manualVoice")}
                  </li>
                </ul>
              </div>
              <button className="w-full bg-white/10 text-white py-3 rounded-2xl font-medium border border-white/20 hover:bg-white/20 transition-all hover:-translate-y-0.5 whitespace-nowrap cursor-pointer">
                {translate("getBasic")}
              </button>
            </div>

            {/* 에센셜 플랜 - 하이라이트 */}
            <div className="relative bg-white/5 rounded-3xl border-2 border-indigo-500/50 p-8 h-full flex flex-col shadow-2xl shadow-indigo-500/20">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-indigo-500 text-white px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap">
                  {translate("mostPopular")}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2 tracking-tight">
                  {translate("essentials")}
                </h3>
                <p className="text-white/60 mb-6">
                  {translate("essentialsDesc")}
                </p>
                <div className="mb-8">
                  <span className="text-3xl font-bold">$7.99</span>
                  <span className="text-white/60">/mo</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-white/80">
                    <i className="ri-check-line text-green-400 mr-3"></i>
                    {translate("unlimitedBriefs")}
                  </li>
                  <li className="flex items-center text-white/80">
                    <i className="ri-check-line text-green-400 mr-3"></i>
                    {translate("prioritySummaries")}
                  </li>
                  <li className="flex items-center text-white/80">
                    <i className="ri-check-line text-green-400 mr-3"></i>
                    {translate("heyManora")}
                  </li>
                  <li className="flex items-center text-white/80">
                    <i className="ri-check-line text-green-400 mr-3"></i>
                    {translate("crossDeviceSync")}
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <button className="w-full bg-white text-gray-900 py-3 rounded-2xl font-medium hover:bg-white/90 transition-all hover:-translate-y-0.5 shadow-lg whitespace-nowrap cursor-pointer">
                  {translate("startEssentials")}
                </button>
                <p className="text-white/60 text-sm text-center">
                  {translate("afterTrial")}
                </p>
              </div>
            </div>

            {/* 프리미엄 플랜 */}
            <div className="bg-white/5 rounded-3xl border border-white/10 p-8 h-full flex flex-col">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2 tracking-tight">
                  {translate("premium")}
                </h3>
                <p className="text-white/60 mb-6">{translate("premiumDesc")}</p>
                <div className="mb-8">
                  <span className="text-3xl font-bold">$14.99</span>
                  <span className="text-white/60">/mo</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-white/80">
                    <i className="ri-check-line text-green-400 mr-3"></i>
                    {translate("allEssentialsFeatures")}
                  </li>
                  <li className="flex items-center text-white/80">
                    <i className="ri-check-line text-green-400 mr-3"></i>
                    {translate("advancedAnalytics")}
                  </li>
                  <li className="flex items-center text-white/80">
                    <i className="ri-check-line text-green-400 mr-3"></i>
                    {translate("prioritySupport")}
                  </li>
                </ul>
              </div>
              <button className="w-full bg-white/10 text-white py-3 rounded-2xl font-medium border border-white/20 hover:bg-white/20 transition-all hover:-translate-y-0.5 whitespace-nowrap cursor-pointer">
                {translate("goPremium")}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 다운로드 섹션 */}
      <section id="download" className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-8 tracking-tight">
            {translate("readyToStart")}
          </h2>
          <p className="text-xl text-white/80 mb-12 leading-relaxed">
            {translate("downloadToday")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-medium hover:bg-white/90 transition-all hover:-translate-y-0.5 shadow-lg whitespace-nowrap cursor-pointer">
              {translate("downloadAppStore")}
            </button>
            <button className="bg-white/10 text-white px-8 py-4 rounded-2xl font-medium border border-white/20 hover:bg-white/20 transition-all hover:-translate-y-0.5 whitespace-nowrap cursor-pointer">
              {translate("getGooglePlay")}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
