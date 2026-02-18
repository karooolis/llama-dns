import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Icon } from "@iconify/react";
import { ClaimInput } from "./components/claim-input";
import { NavAuthButtons } from "./components/nav-auth-buttons";

const domain = process.env.NEXT_PUBLIC_DOMAIN || "llamadns.org";

export default async function Home() {
  const session = await auth();
  if (session?.user) redirect("/dashboard");

  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-nav">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group">
            <Icon
              icon="solar:dns-linear"
              className="text-gray-200 text-xl group-hover:text-white transition-colors"
            />
            <span className="text-gray-200 font-medium tracking-tight text-sm">
              LlamaDNS
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-medium text-gray-400">
            <a href="#features" className="hover:text-gray-100 transition-colors">
              Features
            </a>
            <a href="#integrations" className="hover:text-gray-100 transition-colors">
              Documentation
            </a>
            <a href="#" className="hover:text-gray-100 transition-colors">
              Pricing
            </a>
          </div>

          <NavAuthButtons />
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden hero-mask">
        <div className="absolute inset-0 hero-glow -z-10 pointer-events-none" />

        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <a
            href="#"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-gray-300 hover:text-white hover:border-white/20 transition-all text-xs font-medium mb-8 group backdrop-blur-sm"
          >
            <span className="text-purple-400">New</span>
            <span className="w-px h-3 bg-white/10 mx-1" />
            <span>IPv6 Support is here</span>
            <Icon
              icon="solar:arrow-right-linear"
              className="group-hover:translate-x-0.5 transition-transform"
              width={12}
            />
          </a>

          <h1 className="text-5xl md:text-7xl font-medium tracking-tight mb-8 leading-[1.05]">
            <span className="linear-text-gradient">Dynamic DNS for</span>
            <br />
            <span className="linear-text-gradient">modern engineering.</span>
          </h1>

          <p className="text-lg text-gray-400 max-w-lg mx-auto mb-10 font-normal leading-relaxed tracking-tight">
            Secure, programmable, and blazing fast dynamic DNS.{" "}
            <br className="hidden md:block" />
            Update your IP with a simple curl request.
          </p>

          <ClaimInput />

          {/* Code Snippet */}
          <div className="max-w-xl mx-auto transform hover:-translate-y-1 transition duration-500">
            <div className="rounded-lg border border-white/10 bg-[#0A0A0A] overflow-hidden shadow-2xl text-left backdrop-blur-sm">
              <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                </div>
                <div className="text-[10px] text-gray-600 font-mono uppercase tracking-wider">
                  BASH
                </div>
              </div>
              <div className="p-5 font-mono text-xs md:text-sm overflow-x-auto whitespace-pre text-gray-300">
                <span className="text-gray-600"># Update your IP via curl</span>
                {"\n"}
                <span className="text-purple-400">curl</span>{" "}
                <span className="text-emerald-400/80">
                  &quot;https://{domain}/update?domains=my-server&amp;token=
                  <span className="text-white/40">YOUR_TOKEN</span>&quot;
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Grid */}
      <section id="features" className="py-24 border-t border-white/5 relative bg-black">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-2xl font-medium text-white tracking-tight mb-2">
              Power tools for your network.
            </h2>
            <p className="text-gray-500 text-sm">
              Everything you need to manage your dynamic IP addresses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            {/* Large Card - HTTPS & SSL */}
            <div className="md:col-span-4 feature-card bg-white/[0.02] border border-white/5 rounded-xl p-8 transition duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                <Icon icon="solar:shield-check-linear" width={120} className="text-white" />
              </div>
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-gray-200">
                  <Icon icon="solar:lock-keyhole-linear" width={20} />
                </div>
                <h3 className="text-gray-200 font-medium mb-2 tracking-tight">
                  HTTPS & SSL Ready
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
                  Automatic DNS-01 challenge support for Let&apos;s Encrypt. Secure your
                  home lab, Raspberry Pi, or NAS with valid SSL certificates in minutes.
                </p>
              </div>
            </div>

            {/* Small Card - GitHub Auth */}
            <div className="md:col-span-2 feature-card bg-white/[0.02] border border-white/5 rounded-xl p-8 transition duration-300">
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-gray-200">
                <Icon icon="solar:github-circle-linear" width={20} />
              </div>
              <h3 className="text-gray-200 font-medium mb-2 tracking-tight">GitHub Auth</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Single sign-on with GitHub. No new passwords to manage or lose.
              </p>
            </div>

            {/* Small Card - Simple API */}
            <div className="md:col-span-2 feature-card bg-white/[0.02] border border-white/5 rounded-xl p-8 transition duration-300">
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-gray-200">
                <Icon icon="solar:code-square-linear" width={20} />
              </div>
              <h3 className="text-gray-200 font-medium mb-2 tracking-tight">Simple API</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                RESTful API designed for developers. Integrate with any script.
              </p>
            </div>

            {/* Large Card - Real-time Propagation */}
            <div className="md:col-span-4 feature-card bg-white/[0.02] border border-white/5 rounded-xl p-8 transition duration-300 flex flex-col md:flex-row items-center gap-8 overflow-hidden">
              <div className="flex-1">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-gray-200">
                  <Icon icon="solar:clock-circle-linear" width={20} />
                </div>
                <h3 className="text-gray-200 font-medium mb-2 tracking-tight">
                  Real-time Propagation
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  DNS records update globally in seconds, not hours. Powered by a
                  distributed edge network.
                </p>
              </div>
              {/* Visual mock */}
              <div className="flex-1 w-full md:w-auto">
                <div className="rounded-lg border border-white/10 bg-[#0C0C0C] p-4 font-mono text-xs">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-2">
                    <span className="text-gray-500">Status</span>
                    <span className="text-emerald-500 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Active
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type</span>
                      <span className="text-gray-300">A Record</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">TTL</span>
                      <span className="text-gray-300">60s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">IP</span>
                      <span className="text-purple-400">192.168.1.42</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section id="integrations" className="py-32 border-t border-white/5 bg-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-medium text-white tracking-tight mb-4">
            Works where you work
          </h2>
          <p className="text-gray-500 text-sm mb-12">
            Compatible with your favorite tools and operating systems.
          </p>

          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            <div className="group px-4 py-2 rounded-md border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors flex items-center gap-3">
              <Icon
                icon="mdi:linux"
                className="text-gray-400 text-lg group-hover:text-white transition-colors"
              />
              <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">
                Linux
              </span>
            </div>
            <div className="group px-4 py-2 rounded-md border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors flex items-center gap-3">
              <Icon
                icon="mdi:docker"
                className="text-gray-400 text-lg group-hover:text-blue-400 transition-colors"
              />
              <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">
                Docker
              </span>
            </div>
            <div className="group px-4 py-2 rounded-md border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors flex items-center gap-3">
              <Icon
                icon="mdi:raspberry-pi"
                className="text-gray-400 text-lg group-hover:text-red-500 transition-colors"
              />
              <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">
                Raspberry Pi
              </span>
            </div>
            <div className="group px-4 py-2 rounded-md border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors flex items-center gap-3">
              <Icon
                icon="mdi:router-wireless"
                className="text-gray-400 text-lg group-hover:text-emerald-400 transition-colors"
              />
              <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">
                OpenWRT
              </span>
            </div>
            <div className="group px-4 py-2 rounded-md border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors flex items-center gap-3">
              <Icon
                icon="simple-icons:synology"
                className="text-gray-400 text-lg group-hover:text-white transition-colors"
              />
              <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">
                Synology
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-[#050505]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Icon icon="solar:dns-linear" className="text-white text-lg" />
              <span className="text-white text-sm font-medium tracking-tight">
                LlamaDNS
              </span>
            </div>
            <p className="text-xs text-gray-600 max-w-xs">
              Open source dynamic DNS made for developers,
              <br /> by developers.
            </p>
          </div>

          <div className="flex gap-12 text-xs text-gray-500 font-medium">
            <div className="flex flex-col gap-3">
              <span className="text-white">Product</span>
              <a href="#features" className="hover:text-white transition-colors">
                Features
              </a>
              <a href="#integrations" className="hover:text-white transition-colors">
                Integration
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Pricing
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-white">Resources</span>
              <a href="#" className="hover:text-white transition-colors">
                Documentation
              </a>
              <a href="#" className="hover:text-white transition-colors">
                API Reference
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Status
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-white">Legal</span>
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[10px] text-gray-700">
            &copy; {new Date().getFullYear()} LlamaDNS
          </div>
          <div className="flex gap-4">
            <a
              href="https://github.com"
              className="text-gray-600 hover:text-white transition-colors"
            >
              <Icon icon="mdi:github" width={16} />
            </a>
            <a href="#" className="text-gray-600 hover:text-white transition-colors">
              <Icon icon="mdi:twitter" width={16} />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
