import ResultadoTableFemeninas from "@/app/components/ResultadoTableFemeninas";

export default function CampeonatoFemeniasPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      {/* TÍTULO PRINCIPAL DE LA PÁGINA */}
      <div className="text-center py-6">
        <h1 className="text-3xl font-bold text-gray-800">
          🏅 Campeonato Femenino
        </h1>
      </div>
      <section className="max-w-5xl mx-auto py-8 px-4">
        <ResultadoTableFemeninas />
      </section>
    </main>
  );
}
