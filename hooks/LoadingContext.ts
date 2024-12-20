import { useNavigation } from "@remix-run/react";
import { useState, useEffect } from "react";

export const useGlobalLoading = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (navigation.state === "loading") {
      setIsLoading(true);
    } else if (navigation.state === "idle") {
      setIsLoading(false);
    } else if (navigation.state === "submitting") {
      setIsLoading(true);
    }
  }, [navigation.state]);

  return { isLoading };
};
