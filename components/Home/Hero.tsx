"use client";

import RainWindow from "../RainWindow/RainWindow";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function Hero() {
  const windowRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: windowScrollYProgress } = useScroll({
    target: windowRef,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: messageScrollYProgress } = useScroll({
    target: messageRef,
    offset: ["start end", "end start"],
  });

  const windowOpacity = useTransform(
    windowScrollYProgress,
    [0, 0.4, 0.6, 0.8],
    [0, 1, 1, 0],
  );

  const messageOpacity = useTransform(
    messageScrollYProgress,
    [0, 0.4, 0.8, 1],
    [1, 1, 0, 0],
  );

  return (
    <section className="relative min-h-[120vh] w-full overflow-hidden bg-darkest lg:min-h-[80vh]">
      {/* Conteúdo */}
      <div
        className="
          relative z-10
          flex min-h-screen flex-col items-center justify-center
          px-6 pb-12 text-center

          lg:absolute lg:inset-y-0 lg:right-0
          lg:flex lg:min-h-0 lg:w-[480px]
          lg:items-center lg:justify-center
          lg:px-0 lg:pb-0 lg:pr-8
          xl:right-[8%]
        "
      >
        <motion.div
          ref={messageRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ opacity: messageOpacity }}
        >
          <h3 className="text-lg text-interaction">Rainbound</h3>

          <h1 className="mt-4 text-4xl text-contrast sm:text-5xl lg:text-6xl xl:text-7xl">
            Your little <br /> reading space
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-sm text-contrast opacity-50 sm:text-base lg:max-w-lg">
            A quiet place for your books, your thoughts, and the stories you
            haven&apos;t finished yet
          </p>

          <button className="mt-8 rounded-3xl border border-interaction bg-interaction-contrast px-5 py-3 text-contrast">
            Continue reading
          </button>
        </motion.div>
      </div>

      {/* Janela */}
      <motion.div
        ref={windowRef}
        style={{
          opacity: windowOpacity,
        }}
        className="
          relative z-10
          flex w-full justify-center
          pb-40

          lg:absolute lg:inset-y-0 lg:left-0
          lg:w-[calc(100%-480px)]
          lg:items-center lg:justify-center
          lg:pb-0
        "
      >
        <RainWindow />
      </motion.div>
    </section>
  );
}
