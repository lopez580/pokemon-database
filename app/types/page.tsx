import Link from 'next/link';

export default async function TypesPage() {
    const res = await fetch('https://pokeapi.co/api/v2/type');
    const data = await res.json();

    // Colores para cada tipo
    const typeColors: { [key: string]: string } = {
        normal: 'bg-gray-400',
        fire: 'bg-red-500',
        water: 'bg-blue-500',
        electric: 'bg-yellow-400',
        grass: 'bg-green-500',
        ice: 'bg-cyan-300',
        fighting: 'bg-orange-700',
        poison: 'bg-purple-500',
        ground: 'bg-yellow-700',
        flying: 'bg-indigo-400',
        psychic: 'bg-pink-500',
        bug: 'bg-lime-500',
        rock: 'bg-yellow-800',
        ghost: 'bg-purple-700',
        dragon: 'bg-indigo-700',
        dark: 'bg-gray-800',
        steel: 'bg-gray-500',
        fairy: 'bg-pink-300',
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-5xl font-bold text-white text-center mb-12">
                    Tipos de Pokémon
                </h1>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {data.results.map((type: any) => (
                        <Link
                            key={type.name}
                            href={`/types/${type.name}`}
                            className={`${typeColors[type.name] || 'bg-gray-600'} 
                                p-8 rounded-xl text-white text-center font-bold text-xl 
                                capitalize hover:scale-105 transition-transform 
                                shadow-lg hover:shadow-2xl`}
                        >
                            {type.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}