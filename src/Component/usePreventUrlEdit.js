"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const usePreventUrlEdit = () => {
  const router = useRouter();
  const pathname = usePathname();
  // console.log("routerrouterrouter", pathname);
  useEffect(() => {
    if (router.events) {
      // Add a null check here
      const handleRouteChange = (url) => {
        if (url !== router.asPath) {
          router.replace(router.asPath);
        }
      };
      router.events.on("routeChangeStart", handleRouteChange);
      return () => {
        router.events.off("routeChangeStart", handleRouteChange);
      };  
    }
  }, [router]);

  return null;
};

export default usePreventUrlEdit;
