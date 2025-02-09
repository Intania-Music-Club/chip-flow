"use client"

import { ClientSafeProvider, getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import useIsPWA from "../components/useIsPWA";

type ProvidersType = Record<string, ClientSafeProvider> | null;

export default function LandingPage() {
  const isPWA = useIsPWA();

  const [providers, setProviders] = useState<ProvidersType>(null);
  const [isVisibleProvider, setIsVisibleProvider] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [siginInText, setSignInText] = useState("Continue with Google");
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (providers) {
      const timer = setTimeout(() => {
        setIsVisibleProvider(true);
      }, 300); // Delay in milliseconds, 300ms in this case
      return () => clearTimeout(timer); // Clean up timer on unmount
    }
  }, [providers]);

  const handleSignIn = async (providerId: string) => {
    setSignInText("Signing In ...");
    await signIn(providerId, {
      callbackUrl: "/home",
    });
  };
  return (
    <main className="px-5 h-screen flex flex-col items-center gap-3">
      <header className="mt-14 px-10 flex flex-col">
        <h1
          className={`text-center text-5xl font-bold transition-all duration-1000 ease-out transform ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "-translate-y-16 opacity-0"
          }`}
        >
          CHIPPY
        </h1>
        <h1
          className={`text-center mt-5 font-light transition-all duration-500 ease-out transform ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "-translate-y-12 opacity-0"
          }`}
        >
          The platform for poker players to manage{" "}
          <span className="font-medium text-[#D95F59]">limited chips</span> with
          easy buying, selling, and tracking!
        </h1>
        <div
          className={`mt-6 flex justify-center transition-all duration-300 ease-out transform ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
          }`}
        >
          <button className="border px-3 py-2 text-sm rounded-lg">
            {isPWA ? (
              <p>Running in PWA Mode 🎉</p>
            ) : (
              <p>Running in Browser 🌍</p>
            )}
            {/* Buy me a coffee */}
          </button>
        </div>
      </header>
      <section className="px-8 pt-4 flex justify-center items-center gap-2">
        <Image
          src="/images/homepage.png"
          alt="HomePageImg"
          width={144}
          height={348}
          className={`transition-all duration-500 ease-out transform ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
          }`}
        />

        <div className={`flex flex-col gap-8 text-2xl font-bold`}>
          <h1
            className={`transition-all duration-1000 ease-out transform ${
              isVisible
                ? "translate-x-0 opacity-100 delay"
                : "translate-x-20 opacity-0"
            }`}
          >
            LIMITED CHIP
          </h1>
          <h1
            className={`transition-all duration-1000 ease-out transform ${
              isVisible
                ? "translate-x-0 opacity-100 delay-100"
                : "translate-x-20 opacity-0"
            }`}
          >
            BUY-IN MANAGER
          </h1>
          <h1
            className={`transition-all duration-1000 ease-out transform ${
              isVisible
                ? "translate-x-0 opacity-100 delay-300"
                : "translate-x-20 opacity-0"
            }`}
          >
            TRACKING
          </h1>
        </div>
      </section>
      {providers &&
        //  isPWA &&
        Object.values(providers).map((provider) => (
          <div
            key={provider.name}
            className={`w-full px-10 fixed bottom-0 mb-20 transition-all duration-1000 ease-out ${
              isVisibleProvider
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            } flex justify-center items-center`}
          >
            <button
              type="button"
              onClick={() => handleSignIn(provider.id)}
              className="py-3 bg-white w-full text-black rounded-lg transform transition-all duration-100 hover:bg-white hover:scale-105"
            >
              <div className="flex justify-center gap-4 w-full">
                <Image
                  src="/google.svg"
                  alt="googleIcon"
                  width={24}
                  height={24}
                />
                {siginInText}
              </div>
            </button>
          </div>
        ))}
    </main>
  );
}
