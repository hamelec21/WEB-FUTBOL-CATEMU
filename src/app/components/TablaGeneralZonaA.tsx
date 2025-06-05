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

interface ResultadoPlano {
  club_id: number;
  club_nombre: string;
  club_logo: string;
  total_puntos: string;
  goles_a_favor: string;
  goles_en_contra: string;
  partidos_jugados: string;
  partidos_ganados: string;
  partidos_perdidos: string;
  partidos_empatados: string;
}

export default function TablaGeneralZonaA() {
  const [resultados, setResultados] = useState<Resultado[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTabla = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/campeonato-zona-a`
        );
        const json = await res.json();

        if (json.success) {
          const datosPlanos = Object.values(
            json.data
          ).flat() as ResultadoPlano[];
          const agrupados: { [clubId: number]: Resultado } = {};

          datosPlanos.forEach((item) => {
            const id = item.club_id;

            const estadisticas: Omit<
              Resultado,
              "club_id" | "club_nombre" | "club_logo"
            > = {
              total_puntos: parseInt(item.total_puntos) || 0,
              goles_a_favor: parseInt(item.goles_a_favor) || 0,
              goles_en_contra: parseInt(item.goles_en_contra) || 0,
              partidos_jugados: parseInt(item.partidos_jugados) || 0,
              partidos_ganados: parseInt(item.partidos_ganados) || 0,
              partidos_perdidos: parseInt(item.partidos_perdidos) || 0,
              partidos_empatados: parseInt(item.partidos_empatados) || 0,
              diferencia_goles: 0,
            };

            if (!agrupados[id]) {
              agrupados[id] = {
                club_id: id,
                club_nombre: item.club_nombre,
                club_logo: item.club_logo,
                ...estadisticas,
              };
            } else {
              (
                Object.keys(estadisticas) as (keyof typeof estadisticas)[]
              ).forEach((key) => {
                agrupados[id][key] =
                  (agrupados[id][key] ?? 0) + (estadisticas[key] ?? 0);
              });
            }
          });

          Object.values(agrupados).forEach((club) => {
            club.diferencia_goles = club.goles_a_favor - club.goles_en_contra;
          });

          const ordenados = Object.values(agrupados).sort((a, b) => {
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
  }, []);

  if (loading)
    return <p className="text-center py-6 text-gray-600">Cargando tabla...</p>;

  return (
    <div className="w-full bg-white rounded-2xl shadow-lg p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 text-center mb-4">
        🏆 Tabla General - Zona A
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-[800px] w-full table-auto text-sm md:text-base text-center border-collapse">
          <thead className="sticky top-0 bg-gray-50 z-10 shadow-sm">
            <tr className="text-gray-600 uppercase text-xs md:text-sm">
              <th className="px-3 py-2">POS</th>
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
