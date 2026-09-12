"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function Thoughts() {
  const windowRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: windowRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);

  return (
    <section className="flex min-h-[90vh] w-full items-center justify-center bg-secundary px-4 sm:px-8 lg:px-16 xl:px-24">
      <motion.div
        ref={windowRef}
        style={{ opacity }}
        className="flex w-full max-w-4xl flex-col items-center justify-center gap-6 text-center"
      >
        <h3 className="text-lg text-contrast opacity-70">FROM YOUR BOOKS</h3>

        <h1 className="text-4xl text-contrast sm:text-5xl">Little thoughts</h1>

        <p className="max-w-xl text-sm text-contrast opacity-50 sm:text-base">
          Fragments of thoughts, ideas and moments you&apos;ve left behind while
          reading
        </p>
      </motion.div>
    </section>
  );
}
