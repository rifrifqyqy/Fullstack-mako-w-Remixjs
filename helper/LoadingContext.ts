import { useEffect, useState } from "react";

export const useGlobalLoading = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false); // Sembunyikan modal setelah loading selesai
      }, 500); // Simulasi waktu loading
    };

    window.addEventListener("popstate", handlePopState); // Listener untuk back/forward
    return () => window.removeEventListener("popstate", handlePopState); // Bersihkan listener
  }, []);

  return { isLoading };
};
