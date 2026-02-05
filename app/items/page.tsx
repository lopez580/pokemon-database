import Link from 'next/link';

export default async function ItemsPage() {
    // La API trae muchos items, limitamos a los primeros 150
    const res = await fetch('https://pokeapi.co/api/v2/item?limit=150');
    const data = await res.json();

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-5xl font-bold text-white text-center mb-12">
                    Items Pokémon
                </h1>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {data.results.map((item: any) => (
                        <Link
                            key={item.name}
                            href={`/items/${item.name}`}
                            className="bg-white/20 backdrop-blur-md p-6 rounded-xl text-white 
                                hover:bg-white/30 transition-all hover:scale-105 shadow-lg 
                                text-center"
                        >
                            <h2 className="text-lg font-bold capitalize">
                                {item.name.replace('-', ' ')}
                            </h2>
                        </Link>
                    ))}
                </div>

                <p className="text-center text-gray-300 mt-8">
                    Mostrando los primeros 150 items
                </p>
            </div>
        </div>
    );
}