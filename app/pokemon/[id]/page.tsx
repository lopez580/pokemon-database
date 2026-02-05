import Link from "next/link";

export default async function PokemonIdPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;

    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

        if (!res.ok) {
            throw new Error('Pokemon no encontrado');
        }

        const data = await res.json();

        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
                <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl">
                    {/* Botón volver */}
                    <Link
                        href="/pokemon"
                        className="inline-block mb-6 px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition"
                    >
                        ← Volver a pokemones
                    </Link>

                    {/* Encabezado */}
                    <div className="text-center mb-8">
                        <h1 className="text-5xl font-bold text-white mb-2">
                            {data.name.charAt(0).toUpperCase() + data.name.slice(1)}
                        </h1>
                        <p className="text-gray-300 text-lg">#{data.id.toString().padStart(3, '0')}</p>
                    </div>

                    {/* Imagen */}
                    <div className="flex justify-center mb-8">
                        <img
                            src={data.sprites.other['official-artwork'].front_default || data.sprites.front_default}
                            alt={data.name}
                            className="w-64 h-64 drop-shadow-2xl"
                        />
                    </div>

                    {/* Tipos */}
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-white mb-3">Tipos</h2>
                        <div className="flex gap-3 flex-wrap">
                            {data.types.map((type: any) => (
                                <span
                                    key={type.type.name}
                                    className="px-6 py-2 bg-white/20 rounded-full text-white font-medium capitalize"
                                >
                                    {type.type.name}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Estadísticas */}
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-white mb-3">Estadísticas</h2>
                        <div className="space-y-3">
                            {data.stats.map((stat: any) => (
                                <div key={stat.stat.name}>
                                    <div className="flex justify-between text-white mb-1">
                                        <span className="capitalize">{stat.stat.name.replace('-', ' ')}</span>
                                        <span className="font-bold">{stat.base_stat}</span>
                                    </div>
                                    <div className="w-full bg-white/20 rounded-full h-2">
                                        <div
                                            className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full transition-all"
                                            style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Información adicional */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white/10 p-4 rounded-lg">
                            <h3 className="text-white font-semibold mb-2">Altura</h3>
                            <p className="text-gray-300 text-2xl">{data.height / 10} m</p>
                        </div>
                        <div className="bg-white/10 p-4 rounded-lg">
                            <h3 className="text-white font-semibold mb-2">Peso</h3>
                            <p className="text-gray-300 text-2xl">{data.weight / 10} kg</p>
                        </div>
                    </div>

                    {/* Habilidades */}
                    <div className="mt-6">
                        <h2 className="text-2xl font-semibold text-white mb-3">Habilidades</h2>
                        <div className="flex gap-3 flex-wrap">
                            {data.abilities.map((ability: any) => (
                                <span
                                    key={ability.ability.name}
                                    className="px-4 py-2 bg-white/10 rounded-lg text-white capitalize"
                                >
                                    {ability.ability.name.replace('-', ' ')}
                                </span>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        );
    } catch (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
                <h1 className="text-4xl font-bold text-white text-center">
                    Pokemon no encontrado
                </h1>
            </div>
        );
    }
}