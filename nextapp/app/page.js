import About from "@/components/About";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/testimonials";
import Subscription from "@/components/Subscription";

export default function Home() {
  return (
    <main className="">
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Testimonials />
      <Subscription />
    </main>
  );
}
