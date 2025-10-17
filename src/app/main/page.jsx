"use client";

import Features from "@/components/Features";
import { useGetWindowSize } from "@/hooks/useGetWindowSize";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function MainPage() {
  const { t, i18n } = useTranslation();
  const { screen, isClient } = useGetWindowSize();
  const [isRecording, setIsRecording] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideContainer, setSlideContainer] = useState(null);

  // 슬라이드 이미지 데이터
  const slideImages = [
    {
      src: "/images/hero-demo-dark.png",
      alt: "Manora Mobile App Demo - Light Mode",
    },
    {
      src: "/images/hero-demo-light.png",
      alt: "Manora Mobile App Demo - Dark Mode",
    },
  ];

  const isShow = false;

  // 클라이언트 사이드 마운트 확인
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 화면 크기에 따른 동적 클래스 생성
  const getResponsiveClasses = () => {
    if (!isClient) {
      // SSR 중에는 기본 클래스 반환
      return {
        sectionPadding: "py-8 md:py-16 lg:py-20",
        titleSize: "text-3xl sm:text-4xl md:text-5xl lg:text-7xl",
        descriptionSize: "text-base sm:text-lg md:text-xl",
        badgeSize: "h-12 sm:h-14 md:h-16",
        badgePadding: "p-2 sm:p-3 md:p-4",
        containerPadding: "px-4 sm:px-6",
        gridCols: "grid-cols-1 lg:grid-cols-2",
        textAlign: "text-center lg:text-left",
      };
    }

    switch (screen) {
      case "MOBILE":
        return {
          sectionPadding: "py-8",
          titleSize: "text-3xl",
          descriptionSize: "text-base",
          badgeSize: "h-12",
          badgePadding: "p-2",
          containerPadding: "px-4",
          gridCols: "grid-cols-1",
          textAlign: "text-center",
        };
      case "TABLET":
        return {
          sectionPadding: "py-12",
          titleSize: "text-4xl",
          descriptionSize: "text-lg",
          badgeSize: "h-14",
          badgePadding: "p-3",
          containerPadding: "px-6",
          gridCols: "grid-cols-1",
          textAlign: "text-center",
        };
      case "WEB":
        return {
          sectionPadding: "py-20",
          titleSize: "text-8xl",
          descriptionSize: "text-xl",
          badgeSize: "h-16",
          badgePadding: "p-4",
          containerPadding: "px-6",
          gridCols: "grid-cols-2",
          textAlign: "text-left",
        };
      default:
        return {
          sectionPadding: "py-8 md:py-16 lg:py-20",
          titleSize: "text-3xl sm:text-4xl md:text-5xl lg:text-7xl",
          descriptionSize: "text-base sm:text-lg md:text-xl",
          badgeSize: "h-12 sm:h-14 md:h-16",
          badgePadding: "p-2 sm:p-3 md:p-4",
          containerPadding: "px-4 sm:px-6",
          gridCols: "grid-cols-1 lg:grid-cols-2",
          textAlign: "text-center lg:text-left",
        };
    }
  };

  const responsiveClasses = getResponsiveClasses();

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

  // 언어별 번역 함수 - 현재 언어에 맞는 번역 반환
  const translate = (key) => {
    // 마운트되지 않았으면 키만 반환 (로딩 후 번역됨)
    if (!isMounted) {
      return key;
    }

    try {
      return t && typeof t === "function" ? t(key) : key;
    } catch (error) {
      return key;
    }
  };

  // 생산성 CTA에서 진행할 함수
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
      <section
        id="hero"
        className={`relative ${responsiveClasses.sectionPadding}`}
      >
        <div
          className={`max-w-6xl mx-auto ${responsiveClasses.containerPadding}`}
        >
          <div
            className={`grid ${responsiveClasses.gridCols} gap-8 items-center`}
          >
            {/* 왼쪽 컬럼 - 텍스트 */}
            <div
              className={`${responsiveClasses.textAlign} ${screen === "WEB" ? "order-1" : ""}`}
              data-aos="fade-right"
              data-aos-delay="100"
              data-aos-anchor-placement="top-center"
              data-aos-anchor="#hero"
              data-aos-offset="0"
            >
              <h1
                className={`${responsiveClasses.titleSize} font-bold mb-6 tracking-tight gradient-text`}
                data-aos="fade-up"
                data-aos-delay="100"
                data-aos-anchor-placement="top-center"
                data-aos-anchor="#hero"
                data-aos-offset="0"
              >
                Manora
              </h1>

              <div
                className={`flex gap-6 flex-col ${responsiveClasses.descriptionSize} text-white/80 mb-6 leading-relaxed whitespace-pre-line`}
                data-aos="fade-up"
                data-aos-delay="100"
                data-aos-anchor-placement="top-center"
                data-aos-anchor="#hero"
                data-aos-offset="0"
              >
                <p className="text-2xl font-bold">
                  {translate("hitPlayOnLifePart1")}
                  <span className="text-[#667eea]">
                    {translate("hitPlayOnLifePart2")}
                  </span>
                  {translate("hitPlayOnLifePart3")}
                </p>
                <p className="font-semibold text-lg">
                  <span className="font-bold">
                    {translate("heroDescriptionpart1")}
                  </span>
                  {translate("heroDescriptionpart2")}
                </p>
              </div>

              {/* 액션 버튼들 */}
              <div
                className={`flex ${screen === "MOBILE" ? "flex-col" : "flex-row"} gap-4 mb-4 ${screen === "WEB" ? "justify-start mt-10" : "justify-center"}`}
                data-aos="fade-up"
                data-aos-delay="100"
                data-aos-anchor-placement="top-center"
                data-aos-anchor="#hero"
                data-aos-offset="0"
              >
                {/* App Store 배지 */}
                <div className="flex justify-center">
                  <Image
                    src={
                      i18n.language === "ko"
                        ? "/images/preorder/App_Store_Badge_KR_RGB_blk.svg"
                        : i18n.language === "jp"
                          ? "/images/preorder/App_Store_Badge_JP_RGB_blk.svg"
                          : "/images/preorder/App_Store_Badge_US-UK_RGB_blk.svg"
                    }
                    alt={translate("downloadAppStore")}
                    width={
                      i18n.language === "ko"
                        ? 150
                        : i18n.language === "jp"
                          ? 125
                          : 125
                    }
                    height={40}
                    className="object-contain hover:scale-105 transition-transform cursor-pointer"
                  />
                </div>

                {/* Google Play 배지 */}
                <div className="flex justify-center">
                  <Image
                    src={
                      i18n.language === "ko"
                        ? "/images/preorder/GooglePlay_Badge_Web_color_Korean.svg"
                        : i18n.language === "jp"
                          ? "/images/preorder/GooglePlay_Badge_Web_color_Japanese.svg"
                          : "/images/preorder/GooglePlay_Badge_Web_color_English.svg"
                    }
                    alt={translate("getGooglePlay")}
                    width={
                      i18n.language === "ko"
                        ? 160
                        : i18n.language === "jp"
                          ? 160
                          : 160
                    }
                    height={40}
                    className="object-contain hover:scale-105 transition-transform cursor-pointer"
                  />
                </div>
              </div>

              <p
                className="text-white/60 text-sm"
                data-aos="fade-up"
                data-aos-delay="100"
                data-aos-anchor-placement="top-center"
                data-aos-anchor="#hero"
                data-aos-offset="0"
              >
                {translate("freeTrial")}
              </p>
            </div>

            {/* 오른쪽 컬럼 - 모바일 앱 데모 */}
            <div
              className={`relative select-none ${screen === "WEB" ? "order-2" : ""} ${screen === "MOBILE" ? "mt-8" : "mt-0"}`}
              data-aos="fade-left"
              data-aos-delay="100"
              data-aos-anchor-placement="top-center"
              data-aos-offset="0"
            >
              <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                centeredSlides={true}
                allowTouchMove={false}
                loop={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                className="w-full"
              >
                {slideImages.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div
                      className={`aspect-[9/16] mx-auto rounded-2xl overflow-hidden ${
                        screen === "MOBILE"
                          ? "max-w-[280px]"
                          : screen === "TABLET"
                            ? "max-w-xs"
                            : "max-w-sm rounded-3xl"
                      }`}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={400}
                        height={700}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>

      <Features translate={translate} />

      {/* TODO:추후 데모 생길 시 작업 */}
      {isShow && (
        <>
          {/* 생산성 CTA */}
          <section
            id="productivity"
            className="py-16 sm:py-20"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="relative">
                {/* 그라디언트 스트라이프 배경 */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-fuchsia-500/10 to-cyan-500/10 rounded-2xl sm:rounded-3xl"></div>

                <div className="relative bg-white/5 rounded-2xl sm:rounded-3xl border border-white/10 p-6 sm:p-8 lg:p-12">
                  <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-center">
                    <div className="text-center lg:text-left">
                      <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 tracking-tight">
                        {translate("productivityOnGo")}
                      </h3>
                      <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                        {translate("maximizeMoments")}
                      </p>
                    </div>
                    <div className="flex justify-center lg:justify-end">
                      <button
                        onClick={simulateVoiceCommand}
                        className={`w-16 h-16 sm:w-20 sm:h-20 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer border border-white/30 backdrop-blur-sm voice-btn ${
                          isRecording ? "recording" : ""
                        }`}
                      >
                        <i className="ri-mic-fill text-white text-xl sm:text-2xl"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 기능 섹션 */}
          <section
            id="features"
            className="py-16 sm:py-20"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div
                className="text-center mb-12 sm:mb-16"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 tracking-tight">
                  {translate("smartFeatures")}
                </h2>
              </div>
              <div className="space-y-16 sm:space-y-20">
                {/* 기능 1 - 오디오 내레이션 */}
                <div
                  className="grid lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16 items-center"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <div className="bg-white/5 rounded-2xl sm:rounded-3xl border border-white/10 p-6 sm:p-8 lg:p-12">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-indigo-500/20 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                      <i className="ri-headphone-line text-indigo-400 text-xl sm:text-2xl"></i>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 tracking-tight">
                      {translate("audioNarration")}
                    </h3>
                    <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                      {translate("audioNarrationDesc")}
                    </p>
                  </div>
                  <div className="aspect-[4/3] bg-white/5 rounded-2xl sm:rounded-3xl border border-white/10 flex items-center justify-center lg:col-span-2">
                    <p className="text-white/60 text-center px-4 sm:px-6 text-sm sm:text-base">
                      Feature image placeholder
                    </p>
                  </div>
                </div>

                {/* 기능 2 - 자동 요약 */}
                <div
                  className="grid lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16 items-center"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  <div className="aspect-[4/3] bg-white/5 rounded-2xl sm:rounded-3xl border border-white/10 flex items-center justify-center lg:order-1 lg:col-span-2">
                    <p className="text-white/60 text-center px-4 sm:px-6 text-sm sm:text-base">
                      Feature image placeholder
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-2xl sm:rounded-3xl border border-white/10 p-6 sm:p-8 lg:p-12 lg:order-2">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-violet-500/20 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                      <i className="ri-file-text-line text-violet-400 text-xl sm:text-2xl"></i>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 tracking-tight">
                      {translate("autoSummaries")}
                    </h3>
                    <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                      {translate("autoSummariesDesc")}
                    </p>
                  </div>
                </div>

                {/* 기능 3 - 음성 트리거 내비게이션 */}
                <div
                  className="grid lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16 items-center"
                  data-aos="fade-up"
                  data-aos-delay="500"
                >
                  <div className="bg-white/5 rounded-2xl sm:rounded-3xl border border-white/10 p-6 sm:p-8 lg:p-12">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-fuchsia-500/20 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                      <i className="ri-mic-line text-fuchsia-400 text-xl sm:text-2xl"></i>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 tracking-tight">
                      {translate("voiceNavigation")}
                    </h3>
                    <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                      {translate("voiceNavigationDesc")}
                    </p>
                  </div>
                  <div className="aspect-[4/3] bg-white/5 rounded-2xl sm:rounded-3xl border border-white/10 flex items-center justify-center lg:col-span-2">
                    <p className="text-white/60 text-center px-4 sm:px-6 text-sm sm:text-base">
                      Feature image placeholder
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 재생 콘텐츠 타입 섹션 */}
          <section
            id="demo"
            className="py-16 sm:py-20"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div
                className="text-center mb-12 sm:mb-16"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 tracking-tight">
                  {translate("playFormats")}
                </h2>
                <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed px-4">
                  {translate("playFormatsDesc")}
                </p>
              </div>

              {/* 원활하게 통합된 비디오 그리드 */}
              <div className="relative" data-aos="fade-up" data-aos-delay="300">
                {/* 배경 그라디언트 오버레이 */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-violet-5/5 to-fuchsia-5/5 rounded-2xl sm:rounded-3xl"></div>

                <div className="relative bg-white/[0.02] rounded-2xl sm:rounded-3xl border border-white/5 p-4 sm:p-6 lg:p-8">
                  {/* 이전 버튼 */}
                  <button
                    onClick={goToPreviousSlide}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 slide-arrow-btn"
                    disabled={currentSlide === 0}
                  >
                    <i className="ri-arrow-left-s-line text-white text-lg sm:text-xl"></i>
                  </button>

                  {/* 다음 버튼 */}
                  <button
                    onClick={goToNextSlide}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 slide-arrow-btn"
                    disabled={currentSlide === 2}
                  >
                    <i className="ri-arrow-right-s-line text-white text-lg sm:text-xl"></i>
                  </button>

                  <div
                    ref={setSlideContainer}
                    className="flex gap-4 sm:gap-6 lg:gap-8 overflow-x-auto pb-4 sm:pb-6 scrollbar-hide slide-container"
                    onScroll={handleSlideScroll}
                    style={{
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                    }}
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
                      <div
                        key={index}
                        className="flex-shrink-0 w-72 sm:w-80 slide-card"
                      >
                        <div
                          className={`bg-gradient-to-br ${item.gradient} rounded-xl sm:rounded-2xl border border-white/10 overflow-hidden backdrop-blur-sm hover:scale-105 transition-transform duration-300 cursor-pointer`}
                        >
                          <div className="aspect-[9/16] flex items-center justify-center relative">
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40"></div>
                            <div className="relative text-center z-10 px-4">
                              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center mb-3 sm:mb-4 mx-auto backdrop-blur-sm">
                                <i className="ri-play-fill text-white text-lg sm:text-xl"></i>
                              </div>
                              <p className="text-white/90 text-base sm:text-lg font-medium">
                                {translate(item.type)}
                              </p>
                              <p className="text-white/60 text-xs sm:text-sm mt-2">
                                {translate(item.format)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 스크롤 인디케이터들 */}
                  <div className="flex justify-center mt-6 sm:mt-8 lg:mt-10 space-x-2">
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
          <section
            id="pricing"
            className="py-20"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="max-w-6xl mx-auto px-6">
              <div
                className="text-center mb-16"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <h2 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
                  {translate("pricing")}
                </h2>
                <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                  {translate("choosePlan")}
                </p>
              </div>

              <div
                className="grid md:grid-cols-3 gap-8"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                {/* 베이직 플랜 */}
                <div className="bg-white/5 rounded-3xl border border-white/10 p-8 h-full flex flex-col">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2 tracking-tight">
                      {translate("basic")}
                    </h3>
                    <p className="text-white/60 mb-6">
                      {translate("basicDesc")}
                    </p>
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
                    <p className="text-white/60 mb-6">
                      {translate("premiumDesc")}
                    </p>
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
          <section
            id="download"
            className="py-20"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h2
                className="text-4xl lg:text-5xl font-bold mb-8 tracking-tight"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                {translate("readyToStart")}
              </h2>
              <p
                className="text-xl text-white/80 mb-12 leading-relaxed"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                {translate("downloadToday")}
              </p>
              <div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <button className="p-2 rounded-2xl font-medium transition-all hover:-translate-y-0.5 hover:scale-105 cursor-pointer flex items-center justify-center">
                  <Image
                    src={
                      i18n.language === "ko"
                        ? "/images/preorder/App_Store_Badge_KR.svg"
                        : i18n.language === "jp"
                          ? "/images/preorder/App_Store_Badge_JP_RGB_blk.svg"
                          : "/images/preorder/App_Store_Badge_US-UK_RGB_blk.svg"
                    }
                    alt={translate("downloadAppStore")}
                    width={180}
                    height={60}
                    className="h-16 w-auto"
                  />
                </button>
                <button className="p-2 rounded-2xl font-medium transition-all hover:-translate-y-0.5 hover:scale-105 cursor-pointer flex items-center justify-center">
                  <Image
                    src={
                      i18n.language === "ko"
                        ? "/images/preorder/GooglePlay_Badge_Web_color_Korean.svg"
                        : i18n.language === "jp"
                          ? "/images/preorder/GooglePlay_Badge_Web_color_Japanese.svg"
                          : "/images/preorder/GooglePlay_Badge_Web_color_English.svg"
                    }
                    alt={translate("getGooglePlay")}
                    width={180}
                    height={60}
                    className="h-16 w-auto"
                  />
                </button>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
