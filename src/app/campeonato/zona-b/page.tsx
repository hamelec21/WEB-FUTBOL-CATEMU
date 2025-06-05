// app/campeonato/zona-a/page.tsx

// app/zona-b/page.tsx
import { Metadata } from "next";
import ZonaBView from "./ZonaBView";

export const metadata: Metadata = {
  title: "Campeonato - Zona B",
  description: "Tabla de posiciones del campeonato en la Zona B",
};

export default function ZonaBPage() {
  return (
    <main className="min-h-screen bg-gray-100">
  
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-5 mt-5">
        Campeonato - Zona B
      </h1>
      <ZonaBView />
    </main>
  );
}
