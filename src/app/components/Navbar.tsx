"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleMobile = () => setMobileOpen(!mobileOpen);

  return (
    <header className="w-full">
      {/* Top red bar */}
      <div className="bg-red-600 text-white text-xs py-2 px-4 flex justify-between items-center">
        <div className="space-x-4">{/** se puede agregar contenido */}</div>
        <div className="space-x-3 text-lg flex">
          <Link href="#">
            <FaFacebookF />
          </Link>
          <Link href="#">
            <FaInstagram />
          </Link>
          <Link href="#">
            <FaYoutube />
          </Link>
        </div>
      </div>

      {/* Navigation bar */}
      <div className="bg-[#1f4e79] text-white text-sm font-semibold shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center justify-between py-3 relative">
            {/* Mobile button */}
            <button onClick={toggleMobile} className="lg:hidden text-2xl">
              {mobileOpen ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
            </button>

            {/* Left Menu */}
            <ul className="hidden lg:flex space-x-5 items-center">
              <li className="group relative">
                <Link href="/nosotros" className="hover:text-sky-400">
                  NOSOTROS
                </Link>
              </li>
              <li className="group relative">
                <Link href="/directorio" className="hover:text-sky-400">
                  DIRECTORIO
                </Link>
              </li>

              <li>
                <Link
                  href="/comite-de-etica"
                  className="hover:text-sky-400 text-center break-words w-[120px] leading-tight"
                >
                  COMITE DE ETICA
                </Link>
              </li>
              <li className="group relative">
                <Link href="/clubes" className="hover:text-sky-400">
                  CLUBES
                </Link>
              </li>
            </ul>

            {/* Logo */}
            <div className="mx-4">
              <Link href="/">
                <Image
                  src="/logo/logo_asociacion.png"
                  alt="Logo"
                  width={120}
                  height={48}
                  className="h-12 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Right Menu */}
            <ul className="hidden lg:flex space-x-5 items-center">
              <li>
                <Link
                  href="/docs/reglamento_arfa_2019.pdf"
                  target="_blank"
                  className="hover:text-sky-400"
                >
                  REGLAMENTO
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/bases-campeonatos.pdf"
                  target="_blank"
                  className="hover:text-sky-400"
                >
                  BASES CAMPEONATO
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-sky-400">
                  TRANSPARECIA
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu */}
          {mobileOpen && (
            <ul className="lg:hidden flex flex-col gap-3 py-4">
              <li>
                <Link href="#">NOSOTROS</Link>
              </li>
              <li>
                <Link href="#">ÁRBITROS</Link>
              </li>
              <li>
                <Link href="#">BASES DE CAMPEONATOS</Link>
              </li>
              <li>
                <Link href="">CLUBES</Link>
              </li>
              <li>
                <Link href="#">SELECCIONES</Link>
              </li>
              <li>
                <Link href="#">RES. DE TRIBUNALES</Link>
              </li>
              <li>
                <Link href="#">ESTATUTOS Y REGLAMENTOS</Link>
              </li>
              <li>
                <Link href="#">GESTIÓN FINANCIERA</Link>
              </li>
              <li>
                <Link href="#">TRANSPARENCIA</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}
