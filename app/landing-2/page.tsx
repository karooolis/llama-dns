import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Nav } from "./nav";
import { Hero } from "./hero";
import { Features } from "./features";
import { HowItWorks } from "./how-it-works";
import { Docs } from "./docs";
import { Integrations } from "./integrations";
import { Faq } from "./faq";
import { Footer } from "./footer";

export default async function Landing2() {
  const session = await auth();
  if (session?.user) redirect("/dashboard");

  return (
    <div className="bg-black min-h-screen">
      <Nav />
      <Hero />
      <div className="max-w-5xl mx-auto h-px rule-fade" />
      {/* <Features /> */}
      <div className="max-w-5xl mx-auto h-px rule-fade" />
      <HowItWorks />
      {/* <div className="max-w-5xl mx-auto h-px rule-fade" /> */}
      {/* <Docs /> */}
      <Integrations />
      <div className="max-w-5xl mx-auto h-px rule-fade" />
      <Faq />
      <Footer />
    </div>
  );
}
