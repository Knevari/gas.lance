import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/landing/Hero";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <div style={{ height: "100vh" }}>
        {/* Placeholder for Features/Pricing to verify scroll effect */}
      </div>
    </main>
  );
}
