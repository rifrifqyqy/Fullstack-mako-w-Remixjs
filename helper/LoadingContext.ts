import { useEffect, useState } from "react";

export const useGlobalLoading = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 800);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState); 
  }, []);

  return { isLoading };
};
