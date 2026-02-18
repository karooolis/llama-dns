import { Icon } from "@iconify/react";

const items = [
  {
    q: "Is LlamaDNS really free?",
    a: "Yes. LlamaDNS is 100% free for personal use and open source under the MIT license.",
  },
  {
    q: "How fast do changes propagate?",
    a: "DNS records update globally within 60 seconds thanks to low TTL settings.",
  },
  {
    q: "Do you support IPv6?",
    a: "Yes. Full AAAA record support. Update IPv4 and IPv6 addresses independently.",
  },
  {
    q: "How many subdomains can I have?",
    a: "There's no limit — create as many subdomains as you need.",
  },
  {
    q: "What does LlamaDNS actually do?",
    a: "It points a subdomain (like yourname.llamadns.org) to whatever IP address you choose. Think of it as a friendly, memorable name for your server.",
  },
  {
    q: "Why would I need dynamic DNS?",
    a: "Every time your router reconnects or your cloud server reboots, your IP address can change. Dynamic DNS keeps your domain pointed at the right place automatically, so you don't have to remember a new IP every time.",
  },
  {
    q: "Who's behind this?",
    a: "A small team of software engineers with over 15 years of industry experience each, building something we wish existed sooner.",
  },
  {
    q: "Why is it free?",
    a: "Honestly — because building it is fun. We wanted to learn, we wanted it to exist, and now it does.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="py-20 md:py-24 px-6 bg-black">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-semibold tracking-tighter text-white text-center mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-2">
          {items.map((item) => (
            <details
              key={item.q}
              className="group rounded-lg border border-white/5 bg-white/[0.01] open:bg-white/[0.03] hover:border-white/[0.08] transition-all cursor-pointer"
            >
              <summary className="flex items-center justify-between p-4 text-[15px] font-medium text-neutral-300 tracking-tight">
                {item.q}
                <Icon
                  icon="solar:alt-arrow-down-linear"
                  width={14}
                  className="text-neutral-600 group-open:rotate-180 transition-transform duration-300"
                />
              </summary>
              <p className="px-4 pb-4 text-[13px] text-neutral-500 font-light leading-relaxed">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
