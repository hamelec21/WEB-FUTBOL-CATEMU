"use client";

import Link from "next/link";
import { FaFutbol } from "react-icons/fa";

const campeonatos = [
  {
    nombre: "Zona A",
    color: "from-green-500 to-green-700",
    ruta: "/campeonato/zona-a",
  },
  {
    nombre: "Zona B",
    color: "from-purple-500 to-purple-700",
    ruta: "/campeonato/zona-b",
  },
  {
    nombre: "Campeonato Infantil",
    color: "from-yellow-400 to-yellow-600",
    ruta: "/campeonato/infantil",
  },
  {
    nombre: "Campeonato Femeninas",
    color: "from-pink-500 to-pink-700",
    ruta: "/campeonato/femenino",
  },
  {
    nombre: "Campeonato Sub 45",
    color: "from-blue-500 to-blue-700",
    ruta: "/campeonato/sub45",
  },
  {
    nombre: "Seleccion",
    color: "from-red-500 to-red-700",
    ruta: "/selecciones",
  },
];

export default function CampeonatoCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 p-4">
      {campeonatos.map((item, index) => (
        <Link href={item.ruta} key={index} className="block">
          <div
            className={`flex items-center gap-4 text-white px-4 py-6 rounded-xl bg-gradient-to-r ${item.color} shadow-md hover:scale-105 transition-transform`}
          >
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <FaFutbol className="text-black w-6 h-6" />
            </div>
            <span className="text-base font-semibold">{item.nombre}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
