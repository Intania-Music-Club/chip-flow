"use client"

import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders, ClientSafeProvider  } from "next-auth/react";

type ProvidersType = Record<string, ClientSafeProvider> | null;

export default function LandingPage() {
  const { data:session } = useSession();

  const [ providers, setProviders ] = useState<ProvidersType>(null);
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    }
    setUpProviders();
  }, []);

  const handleSignIn = async (providerId: string) => {
    await signIn(providerId, {
      callbackUrl: "/home",
    });
  }
  return (
    <main className="px-5 h-screen flex flex-col justify-center items-center gap-5">
        <header className="px-10 flex flex-col">
          <h1 className="text-center text-5xl font-bold">
            CHIPFLOW
          </h1>
          <h1 className="text-center mt-5 font-light">
            The platform for poker players to manage <span className="font-medium text-red-400">limited chips</span> with easy buying, selling, and tracking!
          </h1>
          <div className="mt-4 flex justify-center">
            <button className="border p-3 text-sm rounded-xl">Buy me a coffee</button>
          </div>
        </header>
        <section className="px-8 pt-6 flex justify-center items-center gap-2">
              <Image src="/images/homepage.png" alt="HomePageImg" width={144} height={348} />
              <div className="flex flex-col gap-12 text-2xl font-bold">
                <h1>LIMITED CHIP</h1>
                <h1>BUY-IN MANAGER</h1>
                <h1>TRACKING</h1>
              </div>
        </section>
      {providers && Object.values(providers).map((provider) => (
        <div key={provider.name} className="mt-4">
          <button type="button" onClick={() => handleSignIn(provider.id)} className="py-4 px-14 bg-white text-black rounded-3xl transform transition-all duration-100 hover:bg-white hover:scale-105">
            <div className="flex justify-center gap-4">
              <Image src="/google.svg" alt="googleIcon" width={24} height={24}/>
              Continue with Google
            </div>
          </button>
      </div>
      ))}
    </main>
  )      
}
