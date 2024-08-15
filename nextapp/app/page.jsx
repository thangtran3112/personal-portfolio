import About from "@/components/About";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Companies from "@/components/Companies";
import Subscription from "@/components/Subscription";

export default function Home() {
  return (
    <main className="">
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Companies />
      <Subscription />
    </main>
  );
}
