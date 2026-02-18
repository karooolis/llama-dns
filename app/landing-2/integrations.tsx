import { Icon } from "@iconify/react";

export function Integrations() {
  return (
    <section
      id="integrations"
      className="py-24 border-t border-white/5 bg-black"
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-medium text-white tracking-tight mb-4">
          Integrations
        </h2>
        <p className="text-gray-500 text-sm mb-10">
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
  );
}
