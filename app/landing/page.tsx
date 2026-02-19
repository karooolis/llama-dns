import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Hero } from "./hero";
import { HowItWorks } from "./how-it-works";
import { Integrations } from "./integrations";
import { Faq } from "./faq";
import { Footer } from "../components/footer";

export default async function Landing2() {
  const session = await auth();
  if (session?.user) redirect("/dashboard");

  return (
    <>
      <Hero />
      <div className="w-full h-px bg-white/10" />
      <HowItWorks />
      <div className="w-full h-px bg-white/10" />
      <Integrations />
      <div className="w-full h-px bg-white/10" />
      <Faq />
      <div className="w-full h-px bg-white/10" />
      <Footer />
    </>
  );
}
