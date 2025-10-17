"use client";

import { useEffect } from "react";
import AOS from "aos";

export default function AOSProvider({ children }) {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      mirror: false,
      offset: 50, // 일반 섹션들은 50px 오프셋
    });

    // 히어로 섹션 요소들을 즉시 보이도록 강제 실행
    setTimeout(() => {
      AOS.refresh();
    }, 100);
  }, []);

  return <>{children}</>;
}
