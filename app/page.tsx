import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Nav } from "./landing-2/nav";
import { Hero } from "./landing-2/hero";
import { HowItWorks } from "./landing-2/how-it-works";
import { Integrations } from "./landing-2/integrations";
import { Faq } from "./landing-2/faq";
import { Footer } from "./landing-2/footer";

export default async function Home() {
  const session = await auth();
  if (session?.user) redirect("/dashboard");

  return (
    <div className="bg-black min-h-screen">
      <Nav />
      <Hero />
      <div className="max-w-5xl mx-auto h-px rule-fade" />
      <div className="max-w-5xl mx-auto h-px rule-fade" />
      <HowItWorks />
      <Integrations />
      <div className="max-w-5xl mx-auto h-px rule-fade" />
      <Faq />
      <Footer />
    </div>
  );
}
