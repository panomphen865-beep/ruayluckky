"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  "/assets/ruayluckky/banner/slide-01.jpg",
  "/assets/ruayluckky/banner/slide-02.jpg",
  "/assets/ruayluckky/banner/slide-03.jpg",
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((v) => (v + 1) % slides.length);
    }, 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="mt-4 overflow-hidden rounded-2xl border border-red-700/60 bg-black/40">
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-black md:aspect-[21/8]">
        <Image
          src={slides[index]}
          alt={`โปรโมชั่น ${index + 1}`}
          fill
          className="object-cover"
          priority
        />

        <button
          onClick={() => setIndex((v) => (v - 1 + slides.length) % slides.length)}
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 px-2 py-1 text-sm text-white"
          aria-label="previous slide"
        >
          ‹
        </button>
        <button
          onClick={() => setIndex((v) => (v + 1) % slides.length)}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 px-2 py-1 text-sm text-white"
          aria-label="next slide"
        >
          ›
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 p-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2.5 w-6 rounded-full ${i === index ? "bg-yellow-300" : "bg-white/40"}`}
            aria-label={`go slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
