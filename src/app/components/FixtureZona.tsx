"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Club = {
  id: number;
  nombre: string;
  logo: string | null;
};

type Fixture = {
  id: number;
  tipo_campeonato: string;
  serie: string;
  fecha_fixture: string;
  club_local: Club;
  club_visita: Club;
};

export default function FixtureZona({
  tipoCampeonatoId,
  titulo,
}: {
  tipoCampeonatoId: number;
  titulo: string;
}) {
  const [grouped, setGrouped] = useState<Record<string, Fixture[]>>({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/fixture/zona/${tipoCampeonatoId}`
      );
      const data: Fixture[] = await res.json();

      const groupedByFecha = data.reduce(
        (acc: Record<string, Fixture[]>, item: Fixture) => {
          acc[item.fecha_fixture] = acc[item.fecha_fixture] || [];
          acc[item.fecha_fixture].push(item);
          return acc;
        },
        {}
      );
      setGrouped(groupedByFecha);
    };

    fetchData();
  }, [tipoCampeonatoId]);

  return (
    <section className="w-full bg-white border rounded-xl shadow-md p-4 space-y-8">
      <h1 className="text-xl sm:text-2xl font-extrabold text-center text-gray-800">
        Fixture {titulo}
      </h1>

      {Object.entries(grouped).map(([fecha, partidos]) => (
        <div key={fecha} className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-blue-700 border-b border-blue-100 pb-1 text-center">
            🗓️ Fecha {fecha}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {partidos.map((fixture) => (
              <div
                key={fixture.id}
                className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition flex flex-col items-center text-center gap-3 w-full"
              >
                {/* Club local */}
                <div className="flex flex-col items-center gap-1">
                  <Image
                    src={fixture.club_local.logo || "/placeholder.png"}
                    alt={fixture.club_local.nombre}
                    width={48}
                    height={48}
                    className="object-contain rounded bg-white"
                  />
                  <span className="text-sm font-semibold text-gray-800 text-center">
                    {fixture.club_local.nombre}
                  </span>
                </div>

                {/* VS */}
                <div className="text-xs font-bold text-gray-500">VS</div>

                {/* Club visita */}
                <div className="flex flex-col items-center gap-1">
                  <Image
                    src={fixture.club_visita.logo || "/placeholder.png"}
                    alt={fixture.club_visita.nombre}
                    width={48}
                    height={48}
                    className="object-contain rounded bg-white"
                  />
                  <span className="text-sm font-semibold text-gray-800 text-center">
                    {fixture.club_visita.nombre}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
