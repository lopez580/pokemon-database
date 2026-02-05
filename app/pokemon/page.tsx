
import Link from "next/link";
export default async function PokemonPage() {
    // Obtener los primeros 151 pokémon (generación 1)
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
    const data = await res.json();

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
            <h1 className="text-4xl font-bold text-white text-center mb-8">
                Pokémon - Generación 1
            </h1>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {data.results.map((pokemon: any, index: number) => {
                    const pokemonId = index + 1;

                    return (

                        <Link href={`/pokemon/${pokemonId}`} key={pokemon.name}>
                            <div
                                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition text-center"
                            >

                                <img
                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
                                    alt={pokemon.name}
                                    className="w-24 h-24 mx-auto"
                                />
                                <p className="text-white font-bold capitalize mt-2">
                                    #{pokemonId} {pokemon.name}
                                </p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div >
    );
}