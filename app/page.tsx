import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Nav, Footer } from "./components";
import { Hero } from "./components/home/hero";
import { HowItWorks } from "./components/home/how-it-works";
import { Faq } from "./components/home/faq";

export default async function Home() {
  const session = await auth();
  if (session?.user) redirect("/dashboard");

  return (
    <div className="min-h-screen bg-black">
      <Nav />
      <Hero />
      <div className="h-px w-full bg-white/10" />
      <HowItWorks />
      {/* <div className="w-full h-px bg-white/10" />
      <Integrations />
      <div className="w-full h-px bg-white/10" /> */}
      <Faq />
      <div className="h-px w-full bg-white/10" />
      <Footer />
    </div>
  );
}
