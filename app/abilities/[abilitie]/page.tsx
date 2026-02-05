import Link from 'next/link';

export default async function AbilityDetailPage({
    params
}: {
    params: Promise<{ abilitie: string }>
}) {
    const { abilitie } = await params;

    const res = await fetch(`https://pokeapi.co/api/v2/ability/${abilitie}`);

    if (!res.ok) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
                <h1 className="text-4xl font-bold text-white text-center">
                    Habilidad no encontrada
                </h1>
            </div>
        );
    }

    const data = await res.json();

    // Buscar la descripción en español o inglés
    const effectEntry = data.effect_entries.find((entry: any) => entry.language.name === 'en');
    const flavorText = data.flavor_text_entries.find((entry: any) => entry.language.name === 'en');

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
            <div className="max-w-5xl mx-auto">

                {/* Botón volver */}
                <Link
                    href="/abilities"
                    className="inline-block mb-6 px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition"
                >
                    ← Volver a habilidades
                </Link>

                {/* Encabezado */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8">
                    <h1 className="text-5xl font-bold text-white text-center mb-4 capitalize">
                        {data.name.replace('-', ' ')}
                    </h1>
                    <p className="text-gray-300 text-center text-lg">
                        ID: #{data.id}
                    </p>

                    {data.is_main_series && (
                        <div className="text-center mt-4">
                            <span className="bg-blue-500/30 px-4 py-2 rounded-full text-white text-sm">
                                ✨ Serie Principal
                            </span>
                        </div>
                    )}
                </div>

                {/* Descripción */}
                {effectEntry && (
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4">Efecto</h2>
                        <p className="text-gray-200 leading-relaxed">
                            {effectEntry.effect}
                        </p>
                        {effectEntry.short_effect && (
                            <p className="text-gray-300 mt-4 italic">
                                {effectEntry.short_effect}
                            </p>
                        )}
                    </div>
                )}

                {/* Descripción del juego */}
                {flavorText && (
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4">Descripción</h2>
                        <p className="text-gray-200 leading-relaxed">
                            {flavorText.flavor_text}
                        </p>
                        <p className="text-gray-400 text-sm mt-2">
                            Versión: {flavorText.version_group.name}
                        </p>
                    </div>
                )}

                {/* Generación */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Información</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-gray-400">Generación</p>
                            <p className="text-white text-xl capitalize">
                                {data.generation.name.replace('-', ' ')}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-400">Total de Pokémon con esta habilidad</p>
                            <p className="text-white text-xl">
                                {data.pokemon.length} Pokémon
                            </p>
                        </div>
                    </div>
                </div>



            </div>
        </div>
    );
}
