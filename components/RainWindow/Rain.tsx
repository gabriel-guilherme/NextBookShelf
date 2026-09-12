"use client";

import { motion } from "motion/react";
import NoSsr from "../NoSsr";
import { useEffect, useRef } from "react";

const drops = Array.from({ length: 100 }, (_, i) => ({
  id: i,
  left: -20 + Math.random() * 160,
  diagonal: 30 + Math.random() * 10,
  delay: Math.random() * 2,
  duration: 0.8 + Math.random() * 0.6,
  height: 15 + Math.random() * 25,
  opacity: 0 + Math.random() * 0.3,
}));

type RainProps = {
  isPaused: boolean;
  isMuted: boolean;
};

export default function Rain({ isPaused, isMuted }: RainProps) {
  const audioRef1 = useRef<HTMLAudioElement | null>(null);
  const audioRef2 = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const a1 = audioRef1.current;
    const a2 = audioRef2.current;
    if (!a1 || !a2) return;

    a1.volume = 0.4;
    a2.volume = 0.4;

    if (isMuted) {
      a1.pause();
      a2.pause();
    } else {
      a1.play().catch(() => {});

      const handleTimeUpdate = () => {
        if (a1.duration - a1.currentTime < 0.5 && a2.paused) {
          a2.currentTime = 0;
          a2.play().catch(() => {});
        }
      };

      const handleTimeUpdate2 = () => {
        if (a2.duration - a2.currentTime < 0.5 && a1.paused) {
          a1.currentTime = 0;
          a1.play().catch(() => {});
        }
      };

      a1.addEventListener("timeupdate", handleTimeUpdate);
      a2.addEventListener("timeupdate", handleTimeUpdate2);

      return () => {
        a1.removeEventListener("timeupdate", handleTimeUpdate);
        a2.removeEventListener("timeupdate", handleTimeUpdate2);
      };
    }
  }, [isMuted, isPaused]);

  return (
    <NoSsr>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* transicao sem corte com 2 audios */}
        <audio ref={audioRef1} src="/sounds/rain.mp3" preload="auto" />
        <audio ref={audioRef2} src="/sounds/rain.mp3" preload="auto" />

        {drops.map((drop) => (
          <motion.div
            key={drop.id}
            className="absolute w-[1px] origin-top rotate-[25deg] bg-blue-300"
            style={{
              left: `${drop.left}%`,
              height: drop.height,
              top: 0,
              opacity: drop.opacity,
            }}
            animate={
              isPaused
                ? { top: `${drop.height - 50}px`, left: `${drop.left}%` }
                : {
                    top: ["-5%", "105%"],
                    left: [`${drop.left}%`, `${drop.left - drop.diagonal}%`],
                  }
            }
            transition={
              isPaused
                ? { duration: 0 }
                : {
                    duration: drop.duration,
                    delay: drop.delay,
                    repeat: Infinity,
                    ease: "linear",
                  }
            }
          />
        ))}
      </div>
    </NoSsr>
  );
}
