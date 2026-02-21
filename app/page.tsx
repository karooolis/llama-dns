import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Nav, Footer } from "./components";
import { Hero } from "./landing/hero";
import { HowItWorks } from "./landing/how-it-works";
import { Integrations } from "./landing/integrations";
import { Faq } from "./landing/faq";

export default async function Home() {
  const session = await auth();
  if (session?.user) redirect("/dashboard");

  return (
    <div className="bg-black min-h-screen">
      <Nav />
      <Hero />
      <div className="w-full h-px bg-white/10" />
      <HowItWorks />
      {/* <div className="w-full h-px bg-white/10" />
      <Integrations />
      <div className="w-full h-px bg-white/10" /> */}
      <Faq />
      <div className="w-full h-px bg-white/10" />
      <Footer />
    </div>
  );
}
