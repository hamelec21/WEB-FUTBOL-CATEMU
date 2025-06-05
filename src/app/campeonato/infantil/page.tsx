import ResultadosTableInfantil from "@/app/components/ResultadosTableInfantil";

export default function CampeonatoInfantilPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      {/* TÍTULO PRINCIPAL DE LA PÁGINA */}
      <div className="text-center py-6">
        <h1 className="text-3xl font-bold text-gray-800">
          🏅 Campeonato Infantil
        </h1>
      </div>

      <section>
        <div className="max-w-5xl mx-auto mt-5 mb-5">
          <ResultadosTableInfantil serieId={3} titulo="🏆 Tercera Serie " />
        </div>
      </section>

      <section>
        <div className="max-w-5xl mx-auto mt-5 mb-5">
          <ResultadosTableInfantil serieId={2} titulo="🏆 Segunda Serie" />
        </div>
      </section>

      <section>
        <div className="max-w-5xl mx-auto mt-5 mb-5">
          <ResultadosTableInfantil serieId={1} titulo="🏆 Primera Serie" />
        </div>
      </section>
    </main>
  );
}
