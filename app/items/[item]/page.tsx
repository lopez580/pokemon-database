import Link from 'next/link';

export default async function ItemDetailPage({
    params
}: {
    params: Promise<{ item: string }>
}) {
    const { item } = await params;

    try {
        const res = await fetch(`https://pokeapi.co/api/v2/item/${item}`);

        if (!res.ok) {
            throw new Error('Item no encontrado');
        }

        const data = await res.json();

        // Buscar la descripción en inglés
        const flavorText = data.flavor_text_entries.find((entry: any) => entry.language.name === 'en');
        const effectEntry = data.effect_entries.find((entry: any) => entry.language.name === 'en');

        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
                <div className="max-w-5xl mx-auto">

                    {/* Botón volver */}
                    <Link
                        href="/items"
                        className="inline-block mb-6 px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition"
                    >
                        ← Volver a items
                    </Link>

                    {/* Encabezado con imagen */}
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8">
                        <div className="flex flex-col md:flex-row items-center gap-8">

                            {/* Imagen del item */}
                            {data.sprites.default && (
                                <div className="bg-white/20 p-6 rounded-xl">
                                    <img
                                        src={data.sprites.default}
                                        alt={data.name}
                                        className="w-32 h-32 object-contain"
                                    />
                                </div>
                            )}

                            {/* Info del item */}
                            <div className="flex-1 text-center md:text-left">
                                <h1 className="text-5xl font-bold text-white mb-4 capitalize">
                                    {data.name.replace('-', ' ')}
                                </h1>
                                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                                    <span className="bg-blue-500/30 px-4 py-2 rounded-full text-white text-sm">
                                        ID: #{data.id}
                                    </span>
                                    {data.category && (
                                        <span className="bg-purple-500/30 px-4 py-2 rounded-full text-white text-sm capitalize">
                                            {data.category.name.replace('-', ' ')}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Descripción del juego */}
                    {flavorText && (
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">Descripción</h2>
                            <p className="text-gray-200 leading-relaxed text-lg">
                                {flavorText.text}
                            </p>
                            <p className="text-gray-400 text-sm mt-2">
                                Versión: {flavorText.version_group.name}
                            </p>
                        </div>
                    )}

                    {/* Efecto */}
                    {effectEntry && (
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">Efecto</h2>
                            <p className="text-gray-200 leading-relaxed">
                                {effectEntry.effect}
                            </p>
                            {effectEntry.short_effect && (
                                <p className="text-gray-300 mt-4 italic">
                                    📌 {effectEntry.short_effect}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Información adicional */}
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4">Información</h2>
                        <div className="grid md:grid-cols-2 gap-6">

                            <div>
                                <p className="text-gray-400 mb-2">Costo</p>
                                <p className="text-white text-2xl font-bold">
                                    {data.cost > 0 ? `₽${data.cost.toLocaleString()}` : 'No se vende'}
                                </p>
                            </div>

                            {data.fling_power && (
                                <div>
                                    <p className="text-gray-400 mb-2">Poder de lanzamiento</p>
                                    <p className="text-white text-2xl font-bold">
                                        {data.fling_power}
                                    </p>
                                </div>
                            )}

                            {data.attributes && data.attributes.length > 0 && (
                                <div className="md:col-span-2">
                                    <p className="text-gray-400 mb-2">Atributos</p>
                                    <div className="flex flex-wrap gap-2">
                                        {data.attributes.map((attr: any) => (
                                            <span
                                                key={attr.name}
                                                className="bg-white/20 px-3 py-1 rounded-lg text-white text-sm capitalize"
                                            >
                                                {attr.name.replace('-', ' ')}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Pokémon que sostienen este item */}
                    {data.held_by_pokemon && data.held_by_pokemon.length > 0 && (
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
                            <h2 className="text-3xl font-bold text-white mb-6">
                                Pokémon que pueden tener este item
                            </h2>

                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {data.held_by_pokemon.map((p: any) => {
                                    const pokemonId = p.pokemon.url.split('/').filter(Boolean).pop();

                                    return (
                                        <Link
                                            key={p.pokemon.name}
                                            href={`/pokemon/${pokemonId}`}
                                            className="bg-white/20 p-4 rounded-lg text-center hover:bg-white/30 transition group"
                                        >
                                            <p className="text-white capitalize group-hover:scale-105 transition">
                                                {p.pokemon.name}
                                            </p>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        );
    } catch (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
                <div className="max-w-5xl mx-auto text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        Item no encontrado
                    </h1>
                    <p className="text-gray-300 mb-6">
                        No se pudo cargar el item: {item}
                    </p>
                    <Link
                        href="/items"
                        className="inline-block px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition"
                    >
                        ← Volver a items
                    </Link>
                </div>
            </div>
        );
    }
}
