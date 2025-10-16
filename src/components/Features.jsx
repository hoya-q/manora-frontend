import React from "react";

export default function Features({ translate }) {
  return (
    <section id="features" className="py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 tracking-tight">
            {translate("smartFeatures")}
          </h2>
        </div>
        <div className="space-y-16 sm:space-y-20">
          {/* 기능 1 - 오디오 내레이션 */}
          <div className="relative">
            <div className="bg-white/5 rounded-full border border-white/10 p-6 sm:p-8 lg:p-12">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 tracking-tight absolute top-[-13%] left-1/2 transform -translate-x-1/2 bg-indigo-500 px-8 py-2 rounded-full">
                {translate("autoSummaries")}
              </h3>
              <p className="text-white/80 text-base sm:text-lg leading-relaxed  text-center whitespace-pre-line">
                {translate("autoSummariesDesc")}
              </p>
            </div>
          </div>

          {/* 기능 2 - 자동 요약 */}
          <div className="relative">
            <div className="bg-white/5 rounded-full border border-white/10 p-6 sm:p-8 lg:p-12">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 tracking-tight absolute top-[-13%] left-1/2 transform -translate-x-1/2 bg-indigo-500 px-8 py-2 rounded-full">
                {translate("voiceNavigation")}
              </h3>
              <p className="text-white/80 text-base sm:text-lg leading-relaxed  text-center whitespace-pre-line">
                {translate("voiceNavigationDesc")}
              </p>
            </div>
          </div>

          {/* 기능 3 - 음성 트리거 내비게이션 */}
          <div className="relative">
            <div className="bg-white/5 rounded-full border border-white/10 p-6 sm:p-8 lg:p-12">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 tracking-tight absolute top-[-13%] left-1/2 transform -translate-x-1/2 bg-indigo-500 px-8 py-2 rounded-full">
                {translate("audioNarration")}
              </h3>
              <p className="text-white/80 text-base sm:text-lg leading-relaxed  text-center whitespace-pre-line">
                {translate("audioNarrationDesc")}
              </p>
            </div>
          </div>

          {/* 기능 4 */}
          <div className="relative">
            <div className="bg-white/5 rounded-full border border-white/10 p-6 sm:p-8 lg:p-12">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 tracking-tight absolute top-[-13%] left-1/2 transform -translate-x-1/2 bg-indigo-500 px-8 py-2 rounded-full">
                {translate("productivity")}
              </h3>
              <p className="text-white/80 text-base sm:text-lg leading-relaxed  text-center whitespace-pre-line">
                {translate("productivityDesc")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
