"use client";

import { useState } from "react";
import TablaGeneralZonaA from "@/app/components/TablaGeneralZonaA";
import TablePosicionesSerieZonaA from "@/app/components/TablePosicionesPorSerieZonaA";

const series = [
  { id: null, nombre: "Tabla General" },
  { id: 3, nombre: "Tercera" },
  { id: 2, nombre: "Segunda" },
  { id: 4, nombre: "Senior" },
  { id: 1, nombre: "Primera" },
];

export default function ZonaAView() {
  const [serieIdSeleccionada, setSerieIdSeleccionada] = useState<number | null>(
    null
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      {/* Botones responsivos */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6">
        {series.map((serie) => {
          const isActive = serieIdSeleccionada === serie.id;
          return (
            <button
              key={serie.nombre}
              onClick={() => setSerieIdSeleccionada(serie.id)}
              aria-pressed={isActive}
              className={`px-4 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-base rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
                ${
                  isActive
                    ? "bg-red-600 text-white shadow-lg ring-2 ring-red-700"
                    : "bg-white text-gray-800 hover:bg-red-100"
                }`}
            >
              {serie.nombre}
            </button>
          );
        })}
      </div>

      {/* Tabla con comportamiento responsive */}
      <div className="animate-fade-in">
        {serieIdSeleccionada === null ? (
          <>
            <TablaGeneralZonaA />
            <p className="text-xs text-center text-gray-500 mt-2 sm:hidden">
              Desliza horizontalmente para ver toda la tabla →
            </p>
          </>
        ) : (
          <>
            <TablePosicionesSerieZonaA
              serieId={serieIdSeleccionada}
              titulo={`Tabla Serie ${
                series.find((s) => s.id === serieIdSeleccionada)?.nombre
              }`}
            />
            <p className="text-xs text-center text-gray-500 mt-2 sm:hidden">
              Desliza horizontalmente para ver toda la tabla →
            </p>
          </>
        )}
      </div>
    </div>
  );
}
