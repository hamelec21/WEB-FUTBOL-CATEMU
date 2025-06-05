// app/zona-b/ZonaBView.tsx
"use client";

import { useState } from "react";
import TablaGeneralZonaB from "@/app/components/TablaGeneralZonaB";
import TablePosicionesSerieZonaB from "@/app/components/TablePosicionesPorSerieZonaB";

const series = [
  { id: null, nombre: "Tabla General" },
  { id: 3, nombre: "Tercera" },
  { id: 2, nombre: "Segunda" },
  { id: 4, nombre: "Senior" },
  { id: 1, nombre: "Primera" },
];

export default function ZonaBView() {
  const [serieIdSeleccionada, setSerieIdSeleccionada] = useState<number | null>(
    null
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      <div className="flex flex-wrap justify-center gap-3 mb-8">
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

      <div className="animate-fade-in">
        {serieIdSeleccionada === null ? (
          <TablaGeneralZonaB />
        ) : (
          <TablePosicionesSerieZonaB
            serieId={serieIdSeleccionada}
            titulo={`Tabla Serie ${
              series.find((s) => s.id === serieIdSeleccionada)?.nombre
            }`}
          />
        )}
      </div>
    </div>
  );
}
