"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Resultado {
  club_id: number;
  club_nombre: string;
  club_logo: string;
  total_puntos: number;
  goles_a_favor: number;
  goles_en_contra: number;
  partidos_jugados: number;
  partidos_ganados: number;
  partidos_perdidos: number;
  partidos_empatados: number;
  diferencia_goles: number;
}

interface ResultadoAPI {
  club_id: number;
  club_nombre: string;
  club_logo: string;
  PT: number;
  GF: number;
  GC: number;
  PJ: number;
  PG: number;
  PP: number;
  PE: number;
  DG: number;
}

interface Props {
  serieId: number;
  titulo?: string;
}

export default function ResultadosTableInfantil({ serieId, titulo }: Props) {
  const [resultados, setResultados] = useState<Resultado[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTabla = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/campeonato-infantil/serie/${serieId}`
        );
        const json = await res.json();

        if (json.success) {
          const datosAdaptados: Resultado[] = (json.data as ResultadoAPI[]).map(
            (item): Resultado => ({
              club_id: item.club_id,
              club_nombre: item.club_nombre,
              club_logo: item.club_logo,
              total_puntos: item.PT,
              goles_a_favor: item.GF,
              goles_en_contra: item.GC,
              partidos_jugados: item.PJ,
              partidos_ganados: item.PG,
              partidos_perdidos: item.PP,
              partidos_empatados: item.PE,
              diferencia_goles: item.DG,
            })
          );

          const ordenados = datosAdaptados.sort((a, b) => {
            if (b.total_puntos !== a.total_puntos) {
              return b.total_puntos - a.total_puntos;
            }
            return b.diferencia_goles - a.diferencia_goles;
          });

          setResultados(ordenados);
        }
      } catch (err) {
        console.error("Error al obtener datos de la API:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTabla();
  }, [serieId]);

  if (loading)
    return <p className="text-center py-6 text-gray-600">Cargando tabla...</p>;

  return (
    <div className="w-full bg-white rounded-2xl shadow-lg p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 text-center mb-4">
        {titulo ?? `🏆 Tabla General (Serie ${serieId})`}
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-[800px] w-full table-auto text-sm md:text-base text-center border-collapse">
          <thead className="sticky top-0 bg-gray-50 z-10 shadow-sm">
            <tr className="text-gray-600 uppercase text-xs md:text-sm">
              <th className="px-3 py-2">#</th>
              <th className="px-3 py-2">Logo</th>
              <th className="px-3 py-2 text-left">Club</th>
              <th className="px-3 py-2">PTS</th>
              <th className="px-3 py-2">GF</th>
              <th className="px-3 py-2">GC</th>
              <th className="px-3 py-2">DG</th>
              <th className="px-3 py-2">PJ</th>
              <th className="px-3 py-2">PG</th>
              <th className="px-3 py-2">PP</th>
              <th className="px-3 py-2">PE</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {resultados.map((item, index) => (
              <tr
                key={item.club_id}
                className="hover:bg-gray-50 transition duration-150 border-t border-gray-200"
              >
                <td className="px-3 py-3 font-semibold">{index + 1}</td>
                <td className="px-3 py-3">
                  <Image
                    src={item.club_logo}
                    alt={item.club_nombre}
                    width={32}
                    height={32}
                    className="mx-auto object-contain"
                    style={{ width: "2rem", height: "2rem" }}
                  />
                </td>
                <td className="px-3 py-3 text-left font-medium whitespace-nowrap">
                  {item.club_nombre}
                </td>
                <td className="px-3 py-3 font-bold text-gray-900">
                  {item.total_puntos}
                </td>
                <td className="px-3 py-3">{item.goles_a_favor}</td>
                <td className="px-3 py-3">{item.goles_en_contra}</td>
                <td
                  className={`px-3 py-3 font-semibold ${
                    item.diferencia_goles > 0
                      ? "text-green-600"
                      : item.diferencia_goles < 0
                      ? "text-red-600"
                      : "text-gray-700"
                  }`}
                >
                  {item.diferencia_goles > 0
                    ? `+${item.diferencia_goles}`
                    : item.diferencia_goles}
                </td>
                <td className="px-3 py-3">{item.partidos_jugados}</td>
                <td className="px-3 py-3">{item.partidos_ganados}</td>
                <td className="px-3 py-3">{item.partidos_perdidos}</td>
                <td className="px-3 py-3">{item.partidos_empatados}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
