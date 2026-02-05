import Link from "next/link";
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="text-3xl font-bold text-center">

        <img src="/logo.png" alt="" className="mx-auto mb-8" />

        <div className="flex flex-wrap gap-2 justify-center">
          <Link href="/pokemon">
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded text-sm px-4 py-2.5 text-center leading-5">
              POKEMONES
            </button>
          </Link>

          <Link href="/types">
            <button type="button" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded text-sm px-4 py-2.5 text-center leading-5">
              TIPOS
            </button>
          </Link>

          <Link href="/abilities">
            <button type="button" className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded text-sm px-4 py-2.5 text-center leading-5">
              HABILIDADES
            </button>
          </Link>

          <Link href="/items">
            <button type="button" className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded text-sm px-4 py-2.5 text-center leading-5">
              OBJETOS
            </button>
          </Link>

          <Link href="/region">
            <button type="button" className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded text-sm px-4 py-2.5 text-center leading-5">
              REGIONES
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}