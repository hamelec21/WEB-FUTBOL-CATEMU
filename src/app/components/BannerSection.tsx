"use client";

import { Download } from "lucide-react";

const downloads = [
  {
    title: "Reglamento ARFA",
    href: "https://web-futbol-catemu-k23dpff4n-juanramons-projects.vercel.app/docs/reglamento-arfa_2019.pdf",
  },
  {
    title: "Bases de Campeonatos",
    href: "https://web-futbol-catemu-k23dpff4n-juanramons-projects.vercel.app/docs/bases-campeonatos.pdf",
  },
];

export default function BannerSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 mt-6 mb-6">
      {downloads.map((item, index) => (
        <a
          key={index}
          href={item.href}
          download
          className="flex items-center justify-between px-5 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors duration-200 border border-gray-300"
        >
          <span className="text-base font-medium">{item.title}</span>
          <Download className="w-5 h-5" />
        </a>
      ))}
    </div>
  );
}
