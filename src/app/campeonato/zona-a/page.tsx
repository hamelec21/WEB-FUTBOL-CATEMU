import { Metadata } from "next";
import ZonaAView from "./ZonaAView";
export const metadata: Metadata = {
  title: "Campeonato - Zona A",
  description: "Tabla de posiciones del campeonato en la Zona A",
};

export default function ZonaAPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-5 mt-5">
        Campeonato - Zona A
      </h1>
      <ZonaAView />
    </main>
  );
}
