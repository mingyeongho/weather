import { useEffect } from "react";

export const OSProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    try {
      if (/(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent)) {
        document.documentElement.classList.add("os-macos");
      }
    } catch (e) {
      console.error("Error: ", e);
    }
  }, []);

  return children;
};
