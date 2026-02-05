import Link from 'next/link';

export default async function AbilitiesPage() {
    // La API trae muchas habilidades, limitamos a las primeras 100
    const res = await fetch('https://pokeapi.co/api/v2/ability?limit=100');
    const data = await res.json();

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-5xl font-bold text-white text-center mb-12">
                    Habilidades Pokémon
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.results.map((ability: any) => (
                        <Link
                            key={ability.name}
                            href={`/abilities/${ability.name}`}
                            className="bg-white/20 backdrop-blur-md p-6 rounded-xl text-white 
                                hover:bg-white/30 transition-all hover:scale-105 shadow-lg"
                        >
                            <h2 className="text-xl font-bold capitalize">
                                {ability.name.replace('-', ' ')}
                            </h2>
                        </Link>
                    ))}
                </div>

                <p className="text-center text-gray-300 mt-8">
                    Mostrando las primeras 100 habilidades
                </p>
            </div>
        </div>
    );
}