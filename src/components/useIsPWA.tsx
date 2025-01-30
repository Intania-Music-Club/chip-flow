import { useEffect, useState } from "react";

const useIsPWA = () => {
  const [isPWA, setIsPWA] = useState(false);

  useEffect(() => {
    const checkPWA =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;

    setIsPWA(checkPWA);
  }, []);

  return isPWA;
};

export default useIsPWA;
