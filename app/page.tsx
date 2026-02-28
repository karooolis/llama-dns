import { Nav, Footer } from "./components";
import { Hero } from "./components/home/hero";
import { HowItWorks } from "./components/home/how-it-works";
import { Faq } from "./components/home/faq";

export default async function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Nav />
      <Hero />
      <div className="h-px w-full bg-white/10" />
      <HowItWorks />
      <Faq />
      <div className="h-px w-full bg-white/10" />
      <Footer />
    </div>
  );
}
