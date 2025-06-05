import React from "react";
import ResponsiveSlider from "./components/ResponsiveSlider"; // sin dynamic
import ClubLogoSlider from "./components/ClubLogoSlider";
import CampeonatoCards from "./components/CampeonatoCards";
import BannerSection from "./components/BannerSection";
import FixtureZona from "@/app/components/FixtureZona";
import FixtureZonaB from "@/app/components/FixtureZonaB";
import FixtureModal from "@/app/components/FixtureModal";
import TablaGeneralZonaA from "./components/TablaGeneralZonaA";
import TablaGeneralZonaB from "./components/TablaGeneralZonaB";
import UltimasNoticias from "./components/UltimasNoticias";
import ResultadoTableSub45 from "./components/ResultadosTableSub45";
import ResultadoTableFemeninas from "./components/ResultadoTableFemeninas";

export default function Home() {
  return (
    <div className="min-h-screen">
      <ResponsiveSlider />
      <ClubLogoSlider />
      <main className="p-0">
        <CampeonatoCards />
        <BannerSection />

        <section className="bg-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            <div className="bg-white rounded-2xl shadow-md p-4 md:p-6">
              <TablaGeneralZonaA />
            </div>
            <div className="bg-white rounded-2xl shadow-md p-4 md:p-6">
              <TablaGeneralZonaB />
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-4 mt-10 mb-10">
          <FixtureModal
            tipoCampeonatoId={2}
            titulo="Zona A"
            color="blue"
            ComponenteZona={FixtureZona}
          />
          <FixtureModal
            tipoCampeonatoId={3}
            titulo="Zona B"
            color="purple"
            ComponenteZona={FixtureZonaB}
          />
        </section>

        <section className="bg-gray-100">
          <UltimasNoticias />
        </section>
        <section className="bg-white mt-5 mb-5">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center uppercase">
                  Campeonato Sub45
                </h2>
                <ResultadoTableSub45 />
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center uppercase">
                  Campeonato Femenino
                </h2>
                <ResultadoTableFemeninas />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
