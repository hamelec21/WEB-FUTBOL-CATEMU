"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Noticia = {
  id: number;
  titulo: string;
  slug: string;
  contenido: string;
  imagen: string | null;
  fecha_publicacion: string;
};

export default function UltimasNoticias() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUltimasNoticias() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/noticias/ultimas`
        );

        const data = await res.json();
        setNoticias(data);
      } catch (error) {
        console.error("Error al cargar noticias:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUltimasNoticias();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-8 text-gray-600 animate-pulse">
        Cargando últimas noticias...
      </div>
    );
  }

  if (noticias.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No hay noticias disponibles.
      </div>
    );
  }

  return (
    <section className="bg-gray-100 py-10 px-4">
      <h2 className="text-sm sm:text-xl md:text-2xl lg:text-3xl font-bold text-center mb-10 text-gray-800">
        📰 Últimas Noticias
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
        {noticias.map((noticia) => (
          <Link
            key={noticia.id}
            href={`/noticias/${noticia.slug}`}
            className="group relative bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition block"
          >
            {/* Contenedor con aspect ratio 2:1 para imagen */}
            {noticia.imagen && (
              <div className="w-full aspect-[2/1] overflow-hidden rounded-t-2xl relative">
                <Image
                  src={noticia.imagen}
                  alt={noticia.titulo}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            )}

            <div className="p-5 flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                {noticia.titulo}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-3">
                {noticia.contenido}
              </p>
              <div className="text-xs text-gray-400 mt-1">
                Publicado el{" "}
                {new Date(noticia.fecha_publicacion).toLocaleDateString(
                  "es-CL"
                )}
              </div>
              <div className="mt-2">
                <span className="inline-block bg-[#1f4e79] text-white text-sm font-medium py-2 px-4 rounded-full transition hover:bg-[#265d94]">
                  Seguir leyendo →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/noticias"
          className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-full transition"
        >
          Ver todas las noticias
        </Link>
      </div>
    </section>
  );
}
