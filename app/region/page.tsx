import Link from 'next/link';

export default async function RegionPage() {
    const res = await fetch('https://pokeapi.co/api/v2/region');
    const data = await res.json();

    // Colores para cada región
    const regionColors: { [key: string]: string } = {
        kanto: 'bg-red-600',
        johto: 'bg-yellow-600',
        hoenn: 'bg-green-600',
        sinnoh: 'bg-blue-600',
        unova: 'bg-gray-700',
        kalos: 'bg-pink-600',
        alola: 'bg-orange-500',
        galar: 'bg-purple-600',
        paldea: 'bg-indigo-600',
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-5xl font-bold text-white text-center mb-12">
                    Regiones Pokémon
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.results.map((region: any) => (
                        <Link
                            key={region.name}
                            href={`/region/${region.name}`}
                            className={`${regionColors[region.name] || 'bg-gray-600'} 
                                p-10 rounded-2xl text-white text-center 
                                hover:scale-105 transition-transform shadow-2xl`}
                        >
                            <h2 className="text-3xl font-bold capitalize">
                                {region.name}
                            </h2>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}