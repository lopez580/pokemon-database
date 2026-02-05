import Link from 'next/link';

export default async function RegionDetailPage({
    params
}: {
    params: Promise<{ region: string }>
}) {
    const { region } = await params;

    try {
        const res = await fetch(`https://pokeapi.co/api/v2/region/${region}`);

        if (!res.ok) {
            throw new Error('Región no encontrada');
        }

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
                <div className="max-w-7xl mx-auto">

                    {/* Botón volver */}
                    <Link
                        href="/region"
                        className="inline-block mb-6 px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition"
                    >
                        ← Volver a regiones
                    </Link>

                    {/* Encabezado */}
                    <div className="text-center mb-12">
                        <div className={`${regionColors[region] || 'bg-gray-600'} inline-block px-16 py-8 rounded-3xl mb-4 shadow-2xl`}>
                            <h1 className="text-6xl font-bold text-white capitalize">
                                {data.name}
                            </h1>
                        </div>
                        <p className="text-gray-300 text-xl">
                            ID: #{data.id}
                        </p>
                    </div>

                    {/* Información de la región */}
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4">Información General</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-gray-400 mb-2">Generación Principal</p>
                                <p className="text-white text-xl capitalize">
                                    {data.main_generation ? data.main_generation.name.replace('-', ' ') : 'N/A'}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-400 mb-2">Total de Ubicaciones</p>
                                <p className="text-white text-xl">
                                    {data.locations.length} ubicaciones
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Versiones de juegos */}
                    {data.version_groups && data.version_groups.length > 0 && (
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8">
                            <h2 className="text-3xl font-bold text-white mb-6">
                                Versiones de juegos
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {data.version_groups.map((vg: any) => (
                                    <span
                                        key={vg.name}
                                        className="bg-white/20 px-5 py-3 rounded-lg text-white font-semibold capitalize"
                                    >
                                        {vg.name.replace('-', ' ')}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Pokédex disponibles */}
                    {data.pokedexes && data.pokedexes.length > 0 && (
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8">
                            <h2 className="text-3xl font-bold text-white mb-6">
                                Pokédex Regionales
                            </h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {data.pokedexes.map((dex: any) => (
                                    <div
                                        key={dex.name}
                                        className="bg-white/20 p-4 rounded-lg text-white font-semibold capitalize text-center"
                                    >
                                        📖 {dex.name.replace('-', ' ')}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Ubicaciones */}
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
                        <h2 className="text-3xl font-bold text-white mb-6">
                            Ubicaciones en {data.name}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto pr-2">
                            {data.locations.map((location: any) => {
                                // Extraer el ID del URL
                                const locationId = location.url.split('/').filter(Boolean).pop();

                                return (
                                    <div
                                        key={location.name}
                                        className="bg-white/20 p-4 rounded-lg hover:bg-white/30 transition"
                                    >
                                        <p className="text-white capitalize">
                                            📍 {location.name.replace('-', ' ')}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

                        <p className="text-gray-400 text-center mt-4">
                            Total: {data.locations.length} ubicaciones
                        </p>
                    </div>

                </div>
            </div>
        );
    } catch (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
                <div className="max-w-5xl mx-auto text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        Región no encontrada
                    </h1>
                    <p className="text-gray-300 mb-6">
                        No se pudo cargar la región: {region}
                    </p>
                    <Link
                        href="/region"
                        className="inline-block px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition"
                    >
                        ← Volver a regiones
                    </Link>
                </div>
            </div>
        );
    }
}
