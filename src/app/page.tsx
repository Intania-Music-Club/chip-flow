import Image from "next/image";

export default function Home() {
  return (
    <main className="pt-24 flex flex-col justify-center items-center gap-5">
      <header className="px-10">
        <h1 className="text-center text-5xl font-bold">
          CHIPFLOW
        </h1>
        <h1 className="text-center text-lg mt-5 font-thin">
          The platform for poker players to manage <span className="font-medium text-red-400">limited chips</span> with easy buying, selling, and tracking!
        </h1>
      </header>
      <div>
        <button className="border p-3 text-sm rounded-xl">Buy me a coffee</button>
      </div>
      <div className="mt-5 flex flex-col gap-6">
        <button type="button" className="px-20 py-5 text-xl font-bold bg-primary-red rounded-3xl transform transition-all duration-100 hover:bg-white hover:text-primary-red hover:scale-105">
          Join Table
        </button>
        <button type="button" className="px-20 py-5 text-xl font-bold bg-primary-red rounded-3xl transform transition-all duration-100 hover:bg-white hover:text-primary-red hover:scale-105">
          Create New Table
        </button>
      </div>
    </main>
  )      
}
