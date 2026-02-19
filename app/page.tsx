import { Nav, Footer } from "./components";
import { Hero } from "./landing/hero";
import { HowItWorks } from "./landing/how-it-works";
import { Integrations } from "./landing/integrations";
import { Faq } from "./landing/faq";

export default function Home() {
  return (
    <div className="bg-black min-h-screen">
      <Nav />
      <Hero />
      <div className="w-full h-px bg-white/[0.06]" />
      <HowItWorks />
      <div className="w-full h-px bg-white/[0.06]" />
      <Integrations />
      <div className="w-full h-px bg-white/[0.06]" />
      <Faq />
      <div className="w-full h-px mt-4 bg-white/[0.06]" />
      <Footer />
    </div>
  );
}
