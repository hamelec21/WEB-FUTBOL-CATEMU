"use client";

export default function Footer() {
  return (
    <footer className="bg-red-700 text-white py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm md:text-base">
          &copy; {new Date().getFullYear()} Mi Sitio Web. Todos los derechos
          reservados.
        </p>
        <nav
          className="flex gap-6 text-sm md:text-base"
          role="navigation"
          aria-label="Enlaces del pie de página"
        >
          <a
            href="/about"
            className="hover:underline focus:outline-none focus:ring-2 focus:ring-white rounded transition"
          >
            Acerca de
          </a>
          <a
            href="/contact"
            className="hover:underline focus:outline-none focus:ring-2 focus:ring-white rounded transition"
          >
            Contacto
          </a>
          <a
            href="/privacy"
            className="hover:underline focus:outline-none focus:ring-2 focus:ring-white rounded transition"
          >
            Política de privacidad
          </a>
        </nav>
      </div>

      <div className="mt-6 text-center text-xs text-red-200 font-light">
        Sitio desarrollado por{" "}
        <a
          href="https://www.proscom.cl"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-white transition"
        >
          www.proscom.cl
        </a>
      </div>
    </footer>
  );
}
