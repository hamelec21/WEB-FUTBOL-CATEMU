"use client";

import { useState, ComponentType } from "react";
import { CalendarDaysIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface FixtureModalProps {
  tipoCampeonatoId: number;
  titulo: string;
  color?: "blue" | "green" | "purple" | "red";
  ComponenteZona: ComponentType<{ tipoCampeonatoId: number; titulo: string }>;
}

export default function FixtureModal({
  tipoCampeonatoId,
  titulo,
  color = "blue",
  ComponenteZona,
}: FixtureModalProps) {
  const [open, setOpen] = useState(false);

  const colorMap = {
    blue: "from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800",
    green:
      "from-green-600 to-green-700 hover:from-green-700 hover:to-green-800",
    purple:
      "from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800",
    red: "from-red-600 to-red-700 hover:from-red-700 hover:to-red-800",
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`inline-flex items-center justify-center gap-2 text-lg px-6 py-3 rounded-xl bg-gradient-to-r text-white font-semibold shadow-lg transition ${colorMap[color]}`}
      >
        <CalendarDaysIcon className="h-6 w-6" />
        Ver Fixture {titulo}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center backdrop-blur-sm">
          <div className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl animate-fade-in-up p-6">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 p-2 rounded-full text-gray-600 hover:text-gray-900 transition"
              aria-label="Cerrar"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            {/* ✅ Aquí el componente dinámico */}
            <ComponenteZona
              tipoCampeonatoId={tipoCampeonatoId}
              titulo={titulo}
            />
          </div>
        </div>
      )}
    </>
  );
}
