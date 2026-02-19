import type { ReactNode } from "react";
import {
  SectionHeading,
  IconBox,
  BentoCard,
  StatusBadge,
  MethodBadge,
  IntegrationBadge,
  CodeBlock,
  AccordionItem,
  SectionDivider,
} from "./components";
import {
  CodeBlock as CodeBlockIcon,
  Clock,
  LockKey,
  GithubLogo,
  Star,
  Terminal,
  LinuxLogo,
  DockerIcon,
  RaspberryPiIcon,
} from "../landing-2/icons";

function PreviewSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-6">
        {title}
      </h3>
      {children}
    </div>
  );
}

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tighter mb-2">
          Design System
        </h1>
        <p className="text-neutral-500 text-sm font-light mb-20">
          Component library and visual reference for LlamaDNS.
        </p>

        <div className="space-y-24">
          {/* 1. Typography */}
          <PreviewSection title="Typography">
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-mono text-neutral-600 mb-1 block">
                  Display (h1)
                </span>
                <h1 className="text-4xl md:text-5xl font-semibold tracking-tighter leading-[1.05]">
                  Free dynamic DNS.
                </h1>
              </div>
              <div>
                <span className="text-[10px] font-mono text-neutral-600 mb-1 block">
                  Heading (h2)
                </span>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter">
                  Built for developers.
                </h2>
              </div>
              <div>
                <span className="text-[10px] font-mono text-neutral-600 mb-1 block">
                  Subheading (h3)
                </span>
                <h3 className="text-base font-medium tracking-tight">
                  API-first design
                </h3>
              </div>
              <div>
                <span className="text-[10px] font-mono text-neutral-600 mb-1 block">
                  Body
                </span>
                <p className="text-base md:text-lg text-neutral-400 leading-relaxed font-light">
                  Claim a subdomain, point it at your server, and update it with
                  a single HTTP request.
                </p>
              </div>
              <div>
                <span className="text-[10px] font-mono text-neutral-600 mb-1 block">
                  Small
                </span>
                <p className="text-sm text-neutral-500 leading-relaxed font-light">
                  Low TTL records mean your IP changes are live globally within a
                  minute.
                </p>
              </div>
              <div>
                <span className="text-[10px] font-mono text-neutral-600 mb-1 block">
                  Mono
                </span>
                <p className="font-mono text-[12px] text-neutral-400">
                  curl &quot;https://llamadns.org/update?domains=lab&amp;token=sk_...&quot;
                </p>
              </div>
              <div>
                <span className="text-[10px] font-mono text-neutral-600 mb-1 block">
                  Label
                </span>
                <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest bg-white/[0.03] border border-white/5 px-2 py-0.5 rounded">
                  REST
                </span>
              </div>
            </div>
          </PreviewSection>

          <SectionDivider />

          {/* 2. Colors */}
          <PreviewSection title="Colors">
            <div className="space-y-8">
              <div>
                <p className="text-xs text-neutral-500 mb-3">CSS Variables</p>
                <div className="flex flex-wrap gap-3">
                  {[
                    { name: "--background", value: "#080808" },
                    { name: "--foreground", value: "#ededed" },
                    { name: "--muted", value: "#a3a3a3" },
                    { name: "--border", value: "#262626" },
                    { name: "--accent", value: "#8b5cf6" },
                    { name: "--success", value: "#22c55e" },
                    { name: "--danger", value: "#ef4444" },
                    { name: "--card", value: "#171717" },
                  ].map((c) => (
                    <div key={c.name} className="flex flex-col items-center gap-2">
                      <div
                        className="w-12 h-12 rounded-lg border border-white/10"
                        style={{ background: c.value }}
                      />
                      <span className="text-[10px] font-mono text-neutral-500">
                        {c.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs text-neutral-500 mb-3">
                  White Opacity Scale
                </p>
                <div className="flex flex-wrap gap-3">
                  {["0.02", "0.03", "0.04", "0.05", "0.06", "0.08", "0.10", "0.12"].map(
                    (opacity) => (
                      <div
                        key={opacity}
                        className="flex flex-col items-center gap-2"
                      >
                        <div
                          className="w-12 h-12 rounded-lg border border-white/10"
                          style={{
                            background: `rgba(255,255,255,${opacity})`,
                          }}
                        />
                        <span className="text-[10px] font-mono text-neutral-500">
                          white/{opacity}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div>
                <p className="text-xs text-neutral-500 mb-3">
                  Neutral Text Scale
                </p>
                <div className="flex flex-wrap gap-4">
                  {[
                    { name: "white", cls: "text-white" },
                    { name: "neutral-300", cls: "text-neutral-300" },
                    { name: "neutral-400", cls: "text-neutral-400" },
                    { name: "neutral-500", cls: "text-neutral-500" },
                    { name: "neutral-600", cls: "text-neutral-600" },
                  ].map((t) => (
                    <span
                      key={t.name}
                      className={`text-sm font-medium ${t.cls}`}
                    >
                      {t.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </PreviewSection>

          <SectionDivider />

          {/* 3. Section Heading */}
          <PreviewSection title="Section Heading">
            <div className="space-y-10">
              <div>
                <p className="text-xs text-neutral-500 mb-4">Left-aligned</p>
                <SectionHeading
                  title="Built for developers."
                  subtitle="Infrastructure primitives that just work. No vendor lock-in, no bloat."
                />
              </div>
              <div>
                <p className="text-xs text-neutral-500 mb-4">Centered</p>
                <SectionHeading
                  title="How it works"
                  subtitle="Get up and running in less than 30 seconds."
                  align="center"
                />
              </div>
            </div>
          </PreviewSection>

          <SectionDivider />

          {/* 4. Icon Box */}
          <PreviewSection title="Icon Box">
            <div className="flex items-end gap-6">
              <div className="flex flex-col items-center gap-2">
                <IconBox size="sm">
                  <CodeBlockIcon className="text-xl" />
                </IconBox>
                <span className="text-[10px] font-mono text-neutral-600">
                  sm
                </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <IconBox size="sm">
                  <Clock className="text-xl" />
                </IconBox>
                <span className="text-[10px] font-mono text-neutral-600">
                  sm
                </span>
              </div>
              <div className="group flex flex-col items-center gap-2">
                <IconBox size="lg">
                  <GithubLogo className="text-2xl text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                </IconBox>
                <span className="text-[10px] font-mono text-neutral-600">
                  lg (hover me)
                </span>
              </div>
              <div className="group flex flex-col items-center gap-2">
                <IconBox size="lg">
                  <Star className="text-2xl text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                </IconBox>
                <span className="text-[10px] font-mono text-neutral-600">
                  lg (hover me)
                </span>
              </div>
            </div>
          </PreviewSection>

          <SectionDivider />

          {/* 5. Bento Card */}
          <PreviewSection title="Bento Card">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <BentoCard>
                <div className="flex items-start justify-between mb-8">
                  <IconBox size="sm">
                    <CodeBlockIcon className="text-xl" />
                  </IconBox>
                  <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest bg-white/[0.03] border border-white/5 px-2 py-0.5 rounded">
                    REST
                  </span>
                </div>
                <h3 className="text-white font-medium mb-2 tracking-tight">
                  Default size card
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed font-light">
                  Uses rounded-xl and p-6. Hover to see the border effect.
                </p>
              </BentoCard>

              <BentoCard size="compact">
                <div className="flex items-center gap-3 mb-2">
                  <MethodBadge method="GET" />
                  <span className="font-mono text-sm text-neutral-300">
                    /update
                  </span>
                </div>
                <p className="text-xs text-neutral-500 font-light">
                  Compact size card with rounded-lg and p-4. Used for API doc
                  entries.
                </p>
              </BentoCard>
            </div>
          </PreviewSection>

          <SectionDivider />

          {/* 6. Badges */}
          <PreviewSection title="Badges">
            <div className="space-y-6">
              <div>
                <p className="text-xs text-neutral-500 mb-3">StatusBadge</p>
                <StatusBadge>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    All systems operational
                  </span>
                </StatusBadge>
              </div>

              <div>
                <p className="text-xs text-neutral-500 mb-3">MethodBadge</p>
                <div className="flex gap-3">
                  <MethodBadge method="GET" color="green" />
                  <MethodBadge method="POST" color="blue" />
                  <MethodBadge method="GET" color="blue" />
                </div>
              </div>

              <div>
                <p className="text-xs text-neutral-500 mb-3">
                  IntegrationBadge
                </p>
                <div className="flex flex-wrap gap-2">
                  <IntegrationBadge icon={LinuxLogo} label="Linux" />
                  <IntegrationBadge icon={DockerIcon} label="Docker" />
                  <IntegrationBadge
                    icon={RaspberryPiIcon}
                    label="Raspberry Pi"
                  />
                </div>
              </div>
            </div>
          </PreviewSection>

          <SectionDivider />

          {/* 7. Code Block */}
          <PreviewSection title="Code Block">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-neutral-500 mb-3">
                  Terminal (no tabs)
                </p>
                <CodeBlock>
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center gap-2 text-neutral-500 mb-1">
                        <span className="text-emerald-500/70">$</span>
                        <span className="text-neutral-300">curl</span>{" "}
                        <span className="text-amber-200/80">
                          &quot;https://llamadns.org/update&quot;
                        </span>
                      </div>
                      <div className="pl-5 text-neutral-500 text-xs">
                        <span className="text-emerald-400/70">
                          {`{"status":"ok"}`}
                        </span>
                      </div>
                    </div>
                  </div>
                </CodeBlock>
              </div>

              <div>
                <p className="text-xs text-neutral-500 mb-3">With tabs</p>
                <CodeBlock
                  tabs={["crontab", "Docker", "systemd"]}
                  activeTab={0}
                >
                  <div className="text-neutral-600 italic mb-3">
                    # Update every 5 minutes
                  </div>
                  <div className="text-neutral-300">
                    <span className="text-amber-200/80">*/5 * * * *</span>{" "}
                    <span className="text-purple-400">curl</span> -s{" "}
                    <span className="text-emerald-400/80">
                      &quot;https://llamadns.org/update&quot;
                    </span>
                  </div>
                </CodeBlock>
              </div>
            </div>
          </PreviewSection>

          <SectionDivider />

          {/* 8. Accordion */}
          <PreviewSection title="Accordion">
            <div className="max-w-2xl space-y-2">
              <AccordionItem trigger="Is LlamaDNS really free?" defaultOpen>
                Yes. LlamaDNS is 100% free for personal use and open-source
                under the MIT license.
              </AccordionItem>
              <AccordionItem trigger="How fast do changes propagate?">
                DNS records update globally within 60 seconds thanks to low TTL
                settings.
              </AccordionItem>
            </div>
          </PreviewSection>

          <SectionDivider />

          {/* 9. Section Divider */}
          <PreviewSection title="Section Divider">
            <p className="text-xs text-neutral-500 mb-4">
              A 1px horizontal rule at white/[0.06] opacity, used between page
              sections.
            </p>
            <div className="space-y-8">
              <p className="text-sm text-neutral-400">Content above</p>
              <SectionDivider />
              <p className="text-sm text-neutral-400">Content below</p>
            </div>
          </PreviewSection>
        </div>
      </div>
    </div>
  );
}
