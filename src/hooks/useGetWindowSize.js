import { useEffect, useState } from "react";

/**
 * 현재 윈도우의 innerWidth에 대응하는 상태 리턴
 * @returns screen<"WEB" | "TABLET" | "MOBILE">
 */
export const useGetWindowSize = () => {
  const [screen, setScreen] = useState(undefined);
  const [isClient, setIsClient] = useState(false);

  const handleResize = () => {
    if (typeof window !== "undefined") {
      if (1280 <= window.innerWidth) {
        setScreen("WEB");
      } else if (768 <= window.innerWidth && window.innerWidth < 1280) {
        setScreen("TABLET");
      } else if (window.innerWidth < 768) {
        setScreen("MOBILE");
      }
    }
  };

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return { screen, isClient };
};
