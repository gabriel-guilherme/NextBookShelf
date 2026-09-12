import Collection from "@/components/Home/Collection";
import Hero from "@/components/Home/Hero";
import Thoughts from "@/components/Home/Thoughts";

export default async function Home() {
  return (
    <main className="mx-auto">
      {/* Hero */}
      <Hero />

      {/* Pensamentos */}
      <Thoughts />

      {/* Coleção */}
      <Collection />
    </main>
  );
}
