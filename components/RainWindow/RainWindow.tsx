"use client";

import { useState } from "react";
import Rain from "./Rain";
import RainImpacts from "./RainImpacts";
import Sky from "./Sky";
import WindowDrops from "./WindowDrops";
import WindowFrame from "./WindowFrame";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";

export default function RainWindow() {
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  return (
    <div className="flex items-center justify-center relative mx-auto max-w-7xl px-4 py-10">
      <div className="relative aspect-square w-[min(75vh,90vw)] max-w-xl overflow-hidden group">
        <Sky />

        <Rain isPaused={isPaused} isMuted={isMuted} />
        <WindowDrops isPaused={isPaused} />
        <RainImpacts isPaused={isPaused} />
        <WindowFrame />

        {/* Botões de Controle*/}
        <div className="absolute top-4 right-4 z-50 flex items-center gap-2 transition-opacity duration-300">
          {/* Botão de Som */}
          <button
            onClick={() => setIsMuted((prev) => !prev)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-black/60 transition-colors shadow-lg"
            title={isMuted ? "Ligar som" : "Mutar som"}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>

          {/* Botão de Animação */}
          <button
            onClick={() => setIsPaused((prev) => !prev)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-black/60 transition-colors shadow-lg"
            title={isPaused ? "Retomar animação" : "Pausar animação"}
          >
            {isPaused ? <Play size={18} /> : <Pause size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
}
