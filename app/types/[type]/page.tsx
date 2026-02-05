import Link from 'next/link';

export default async function TypeDetailPage({
    params
}: {
    params: Promise<{ type: string }>
}) {
    const { type } = await params;

    const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);

    if (!res.ok) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
                <h1 className="text-4xl font-bold text-white text-center">
                    Tipo no encontrado
                </h1>
            </div>
        );
    }

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
            <div className="max-w-7xl mx-auto">

                {/* Botón volver */}
                <Link
                    href="/types"
                    className="inline-block mb-6 px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition"
                >
                    ← Volver a tipos
                </Link>

                {/* Encabezado */}
                <div className="text-center mb-12">
                    <div className={`${typeColors[type] || 'bg-gray-600'} inline-block px-12 py-6 rounded-2xl mb-4`}>
                        <h1 className="text-6xl font-bold text-white capitalize">
                            {data.name}
                        </h1>
                    </div>
                </div>

                {/* Relaciones de daño */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">

                    {/* Fuerte contra */}
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-green-400 mb-4">
                            ⚡ Súper efectivo contra
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            {data.damage_relations.double_damage_to.length > 0 ? (
                                data.damage_relations.double_damage_to.map((t: any) => (
                                    <Link
                                        key={t.name}
                                        href={`/types/${t.name}`}
                                        className={`${typeColors[t.name] || 'bg-gray-600'} 
                                            px-4 py-2 rounded-lg text-white font-semibold 
                                            capitalize hover:scale-105 transition`}
                                    >
                                        {t.name}
                                    </Link>
                                ))
                            ) : (
                                <p className="text-gray-400">Ninguno</p>
                            )}
                        </div>
                    </div>

                    {/* Débil contra */}
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-red-400 mb-4">
                            💔 Débil contra
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            {data.damage_relations.double_damage_from.length > 0 ? (
                                data.damage_relations.double_damage_from.map((t: any) => (
                                    <Link
                                        key={t.name}
                                        href={`/types/${t.name}`}
                                        className={`${typeColors[t.name] || 'bg-gray-600'} 
                                            px-4 py-2 rounded-lg text-white font-semibold 
                                            capitalize hover:scale-105 transition`}
                                    >
                                        {t.name}
                                    </Link>
                                ))
                            ) : (
                                <p className="text-gray-400">Ninguno</p>
                            )}
                        </div>
                    </div>

                    {/* Resistente a */}
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-blue-400 mb-4">
                            🛡️ Resistente a
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            {data.damage_relations.half_damage_from.length > 0 ? (
                                data.damage_relations.half_damage_from.map((t: any) => (
                                    <Link
                                        key={t.name}
                                        href={`/types/${t.name}`}
                                        className={`${typeColors[t.name] || 'bg-gray-600'} 
                                            px-4 py-2 rounded-lg text-white font-semibold 
                                            capitalize hover:scale-105 transition`}
                                    >
                                        {t.name}
                                    </Link>
                                ))
                            ) : (
                                <p className="text-gray-400">Ninguno</p>
                            )}
                        </div>
                    </div>

                    {/* Inmune a */}
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-purple-400 mb-4">
                            🚫 Inmune a
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            {data.damage_relations.no_damage_from.length > 0 ? (
                                data.damage_relations.no_damage_from.map((t: any) => (
                                    <Link
                                        key={t.name}
                                        href={`/types/${t.name}`}
                                        className={`${typeColors[t.name] || 'bg-gray-600'} 
                                            px-4 py-2 rounded-lg text-white font-semibold 
                                            capitalize hover:scale-105 transition`}
                                    >
                                        {t.name}
                                    </Link>
                                ))
                            ) : (
                                <p className="text-gray-400">Ninguno</p>
                            )}
                        </div>
                    </div>
                </div>



            </div>
        </div>
    );
}
