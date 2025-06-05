"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image"; // Importar componente optimizado de Next.js

type Noticia = {
  id: number;
  titulo: string;
  slug: string;
  contenido: string;
  imagen: string | null;
  fecha_publicacion: string;
};

const NOTICIAS_POR_PAGINA = 12;

export default function NoticiasPage() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);
  const [paginaActual, setPaginaActual] = useState(1);

  useEffect(() => {
    async function fetchNoticias() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/noticias`);
        const data = await res.json();
        setNoticias(data);
      } catch (error) {
        console.error("Error al cargar noticias:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchNoticias();
  }, []);

  const totalPaginas = Math.ceil(noticias.length / NOTICIAS_POR_PAGINA);
  const noticiasMostradas = noticias.slice(
    (paginaActual - 1) * NOTICIAS_POR_PAGINA,
    paginaActual * NOTICIAS_POR_PAGINA
  );

  const cambiarPagina = (nuevaPagina: number) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <section className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-12 text-center">
            📰 Todas las Noticias
          </h1>

          {loading ? (
            <div className="text-center py-16 text-gray-600 animate-pulse">
              Cargando noticias...
            </div>
          ) : noticias.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              No hay noticias disponibles.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {noticiasMostradas.map((noticia) => (
                  <Link key={noticia.id} href={`/noticias/${noticia.slug}`}>
                    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col group cursor-pointer">
                      {noticia.imagen && (
                        <div className="relative w-full rounded-t-xl overflow-hidden">
                          <Image
                            src={noticia.imagen}
                            alt={noticia.titulo}
                            width={820}
                            height={420}
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                            sizes="(max-width: 768px) 100vw, 820px"
                          />
                        </div>
                      )}
                      <div className="p-5 flex flex-col flex-grow">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                          {noticia.titulo}
                        </h3>
                        <p
                          className="text-sm text-gray-700 line-clamp-3 mb-3"
                          dangerouslySetInnerHTML={{
                            __html: noticia.contenido.slice(0, 120) + "...",
                          }}
                        />
                        <div className="text-xs text-gray-400 mb-3">
                          Publicado el{" "}
                          {new Date(
                            noticia.fecha_publicacion
                          ).toLocaleDateString("es-CL")}
                        </div>
                        <div className="mt-auto">
                          <span className="inline-block bg-[#1f4e79] hover:bg-[#265d94] text-white text-sm font-medium py-2 px-4 rounded-full transition">
                            Seguir leyendo →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Paginación */}
              <div className="mt-12 flex justify-center items-center gap-2 flex-wrap">
                <button
                  onClick={() => cambiarPagina(paginaActual - 1)}
                  disabled={paginaActual === 1}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full disabled:opacity-50"
                >
                  ← Anterior
                </button>

                {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(
                  (numero) => (
                    <button
                      key={numero}
                      onClick={() => cambiarPagina(numero)}
                      className={`px-4 py-2 rounded-full ${
                        numero === paginaActual
                          ? "bg-[#1f4e79] text-white"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      }`}
                    >
                      {numero}
                    </button>
                  )
                )}

                <button
                  onClick={() => cambiarPagina(paginaActual + 1)}
                  disabled={paginaActual === totalPaginas}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full disabled:opacity-50"
                >
                  Siguiente →
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
