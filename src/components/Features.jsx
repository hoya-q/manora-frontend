import React from "react";
import { useGetWindowSize } from "@/hooks/useGetWindowSize";
import { Card, CardContent } from "@/components/ui/card";

export default function Features({ translate }) {
  const { screen, isClient } = useGetWindowSize();

  // 화면 크기에 따른 동적 클래스 생성
  const getResponsiveClasses = () => {
    if (!isClient) {
      return {
        sectionPadding: "py-8 sm:py-12 md:py-16 lg:py-20",
        titleSize: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
        cardPadding: "p-4 sm:p-6 md:p-8 lg:p-12",
        cardTitleSize: "text-lg sm:text-xl md:text-2xl",
        cardTextSize: "text-sm sm:text-base md:text-lg",
        spacing: "space-y-8 sm:space-y-12 md:space-y-16 lg:space-y-20",
      };
    }

    switch (screen) {
      case "MOBILE":
        return {
          sectionPadding: "py-8",
          titleSize: "text-2xl",
          cardPadding: "p-4",
          cardTitleSize: "text-sm",
          cardTextSize: "text-xs",
          spacing: "space-y-8",
        };
      case "TABLET":
        return {
          sectionPadding: "py-12",
          titleSize: "text-3xl",
          cardPadding: "p-6",
          cardTitleSize: "text-xl",
          cardTextSize: "text-base",
          spacing: "space-y-12",
        };
      case "WEB":
        return {
          sectionPadding: "py-20",
          titleSize: "text-5xl",
          cardPadding: "p-12",
          cardTitleSize: "text-2xl",
          cardTextSize: "text-xl",
          spacing: "space-y-20",
        };
      default:
        return {
          sectionPadding: "py-8 sm:py-12 md:py-16 lg:py-20",
          titleSize: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
          cardPadding: "p-4 sm:p-6 md:p-8 lg:p-12",
          cardTitleSize: "text-lg sm:text-xl md:text-2xl",
          cardTextSize: "text-sm sm:text-base md:text-lg",
          spacing: "space-y-8 sm:space-y-12 md:space-y-16 lg:space-y-20",
        };
    }
  };

  const responsiveClasses = getResponsiveClasses();

  return (
    <section id="features" className={responsiveClasses.sectionPadding}>
      <div
        className={`max-w-6xl mx-auto ${responsiveClasses.containerPadding}`}
      >
        <div
          className={`text-center ${screen === "MOBILE" ? "mb-8" : screen === "TABLET" ? "mb-12" : "mb-16"}`}
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <h2
            className={`${responsiveClasses.titleSize} font-bold ${screen === "MOBILE" ? "mb-3" : screen === "TABLET" ? "mb-4" : "mb-6"} tracking-tight`}
          >
            {translate("smartFeatures")}
          </h2>
        </div>
        <div className={responsiveClasses.spacing}>
          {/* 기능 1 - 오디오 내레이션 */}
          <div className="relative" data-aos="fade-up" data-aos-delay="200">
            <Card
              className={`bg-white/5 rounded-full border border-white/10 ${responsiveClasses.cardPadding}`}
            >
              <CardContent className="p-0">
                <h3
                  className={`${responsiveClasses.cardTitleSize} font-bold tracking-tight absolute top-[-13%] left-1/2 transform -translate-x-1/2 bg-indigo-500 text-white rounded-full ${
                    screen === "MOBILE"
                      ? "px-4 py-1"
                      : screen === "TABLET"
                        ? "px-6 py-2"
                        : "px-8 py-2"
                  }`}
                >
                  {translate("autoSummaries")}
                </h3>
                <p
                  className={`text-white/80 ${responsiveClasses.cardTextSize} font-medium leading-relaxed text-center whitespace-pre-line ${
                    screen === "MOBILE" ? "pt-2" : "pt-4"
                  }`}
                >
                  {translate("autoSummariesDesc")}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* 기능 2 - 자동 요약 */}
          <div className="relative" data-aos="fade-up" data-aos-delay="300">
            <Card
              className={`bg-white/5 rounded-full border border-white/10 ${responsiveClasses.cardPadding}`}
            >
              <CardContent className="p-0">
                <h3
                  className={`${responsiveClasses.cardTitleSize} font-bold tracking-tight absolute top-[-13%] left-1/2 transform -translate-x-1/2 bg-indigo-500 text-white rounded-full ${
                    screen === "MOBILE"
                      ? "px-4 py-1"
                      : screen === "TABLET"
                        ? "px-6 py-2"
                        : "px-8 py-2"
                  }`}
                >
                  {translate("voiceNavigation")}
                </h3>
                <p
                  className={`text-white/80 ${responsiveClasses.cardTextSize} font-medium leading-relaxed text-center whitespace-pre-line ${
                    screen === "MOBILE" ? "pt-2" : "pt-4"
                  }`}
                >
                  {translate("voiceNavigationDesc")}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* 기능 3 - 음성 트리거 내비게이션 */}
          <div className="relative" data-aos="fade-up" data-aos-delay="400">
            <Card
              className={`bg-white/5 rounded-full border border-white/10 ${responsiveClasses.cardPadding}`}
            >
              <CardContent className="p-0">
                <h3
                  className={`${responsiveClasses.cardTitleSize} font-bold tracking-tight absolute top-[-13%] left-1/2 transform -translate-x-1/2 bg-indigo-500 text-white rounded-full ${
                    screen === "MOBILE"
                      ? "px-4 py-1"
                      : screen === "TABLET"
                        ? "px-6 py-2"
                        : "px-8 py-2"
                  }`}
                >
                  {translate("audioNarration")}
                </h3>
                <p
                  className={`text-white/80 ${responsiveClasses.cardTextSize} font-medium leading-relaxed text-center whitespace-pre-line ${
                    screen === "MOBILE" ? "pt-2" : "pt-4"
                  }`}
                >
                  {translate("audioNarrationDesc")}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* 기능 4 */}
          <div className="relative" data-aos="fade-up" data-aos-delay="500">
            <Card
              className={`bg-white/5 rounded-full border border-white/10 ${responsiveClasses.cardPadding}`}
            >
              <CardContent className="p-0">
                <h3
                  className={`${responsiveClasses.cardTitleSize} font-bold tracking-tight absolute top-[-13%] left-1/2 transform -translate-x-1/2 bg-indigo-500 text-white rounded-full ${
                    screen === "MOBILE"
                      ? "px-4 py-1"
                      : screen === "TABLET"
                        ? "px-6 py-2"
                        : "px-8 py-2"
                  }`}
                >
                  {translate("productivity")}
                </h3>
                <p
                  className={`text-white/80 ${responsiveClasses.cardTextSize} leading-relaxed text-center whitespace-pre-line ${
                    screen === "MOBILE" ? "pt-2" : "pt-4"
                  }`}
                >
                  {translate("productivityDesc")}
                  <span className="font-extrabold text-[#667eea]">
                    {translate("Manora")}
                  </span>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
