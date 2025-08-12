/* ---------------------------------------------------------------------
 * Dönen “border beam” efekti.
 *
 * Props:
 *  - size:        Kare hüzme parçasının eni (px)
 *  - duration:    Bir tur kaç saniye sürsün?
 *  - delay:       Başlamadan önceki gecikme (sn)
 *  - colorFrom / colorTo: Degrade renkleri
 *  - transition:  Framer‑Motion transition override
 *  - className:   Ek class (ör. Tailwind renk util’leri)
 *  - style:       Ek inline style
 *  - reverse:     Saat yönü yerine ters yönde döndür
 *  - initialOffset: Rotaya başlangıç yüzdesi (0‑100)
 *  - borderWidth: Ring kalınlığı (px)
 * --------------------------------------------------------------------- */
"use client";

import { motion } from "framer-motion";

export function BorderBeam({
  size = 50,
  duration = 6,
  delay = 0,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  transition,
  className,
  style,
  reverse = false,
  initialOffset = 0,
  borderWidth = 2,
  ...restProps
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 rounded-[inherit] overflow-visible ${ className ?? ""}`}
      style={{
        inset: `calc(${borderWidth / 3.14}px)`,           // Kutuyu kalınlığın yarısı kadar büyüt
        "--bb-size": `calc(50% - ${borderWidth / 2}px)`,  // Yol yarıçapı = 50% – borderWidth/2
        "--bb-width": `${borderWidth}px`,
        ...style,
      }}
      {...restProps}
    >
      {/* Kenarı oyup sadece ring’i gösteren maske */}
      <div
        className="absolute inset-0 rounded-[inherit]"
        style={{
          WebkitMaskImage:
            "radial-gradient(circle at center,transparent calc(100% - var(--bb-width)),#000 calc(100% - var(--bb-width)))",
          maskImage:
            "radial-gradient(circle at center,transparent calc(100% - var(--bb-width)),#000 calc(100% - var(--bb-width)))",
        }}
      >
        {/* Dönen hüzme */}
        <motion.div
          className="absolute aspect-square opacity-70"
          style={{
            width: "var(--bb-size)",
            offsetPath: "rect(0 auto auto 0 round var(--bb-size))",
            background: `linear-gradient(90deg, ${colorFrom}, ${colorTo}, transparent)`,
          }}
          initial={{ offsetDistance: `${initialOffset}%` }}
          animate={{
            offsetDistance: reverse
              ? [`${100 - initialOffset}%`, `-${initialOffset}%`]
              : [`${initialOffset}%`, `${100 + initialOffset}%`],
          }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration,
            delay: -delay,
            ...transition,
          }}
        />
      </div>
    </div>
  );
}