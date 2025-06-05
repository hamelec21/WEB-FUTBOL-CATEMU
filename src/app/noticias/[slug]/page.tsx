"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Link from "next/link";
import Image from "next/image";

type Noticia = {
  id: number;
  titulo: string;
  slug: string;
  contenido: string;
  imagen: string | null;
  fecha_publicacion: string;
};

export default function DetalleNoticia() {
  const { slug } = useParams();
  const [noticia, setNoticia] = useState<Noticia | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNoticia() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/noticia/${slug}`
        );
        const data = await res.json();
        setNoticia(data);
      } catch (error) {
        console.error("Error al cargar la noticia:", error);
      } finally {
        setLoading(false);
      }
    }

    if (slug) fetchNoticia();
  }, [slug]);

  if (loading) {
    return (
      <>
        <div className="flex justify-center items-center min-h-[60vh] text-gray-500 text-lg font-medium">
          Cargando noticia...
        </div>
      </>
    );
  }

  if (!noticia) {
    return (
      <>
        <div className="flex justify-center items-center min-h-[60vh] text-gray-400 text-lg font-medium">
          Noticia no encontrada.
        </div>
      </>
    );
  }

  return (
    <>
      <main className="bg-white min-h-screen px-4 sm:px-6 lg:px-12 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Navegación */}
          <nav className="flex items-center justify-between mb-8">
            <span className="inline-block bg-blue-200 text-blue-900 text-xs font-semibold px-4 py-1 rounded-full tracking-wide">
              NOTICIA
            </span>
            <Link
              href="/noticias"
              className="text-blue-600 font-semibold hover:underline transition-colors duration-200"
              aria-label="Volver a noticias"
            >
              ← Volver a Noticias
            </Link>
          </nav>

          {/* Título */}
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-3 leading-tight tracking-tight">
            {noticia.titulo}
          </h1>

          {/* Fecha */}
          <time
            dateTime={noticia.fecha_publicacion}
            className="block text-gray-500 text-sm mb-10 italic"
          >
            Publicado el{" "}
            {new Date(noticia.fecha_publicacion).toLocaleDateString("es-CL", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>

          {/* Imagen */}
          {noticia.imagen && (
            <figure className="mb-12 rounded-lg overflow-hidden shadow-lg">
              <Image
                src={noticia.imagen}
                alt={noticia.titulo}
                width={800}
                height={500}
                className="w-full h-auto object-cover"
              />
            </figure>
          )}

          {/* Contenido */}
          <article
            className="prose prose-lg prose-blue max-w-none text-gray-800"
            dangerouslySetInnerHTML={{ __html: noticia.contenido }}
          />

          {/* Botón final */}
          <div className="mt-16 text-center">
            <Link
              href="/noticias"
              className="inline-block bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-full px-8 py-3 shadow-md transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              ← Ver todas las noticias
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
