import {
  LinuxLogo,
  WifiHigh,
  DockerIcon,
  RaspberryPiIcon,
  SynologyIcon,
} from "../components/icons";

export function Integrations() {
  return (
    <section id="integrations" className="py-16 bg-black">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-medium text-white tracking-tight mb-4">
          Integrations
        </h2>

        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mt-10">
          <div className="group px-4 py-2 rounded-md border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors flex items-center gap-3">
            <LinuxLogo
              className="text-gray-400 text-lg group-hover:text-white transition-colors"
            />
            <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">
              Linux
            </span>
          </div>
          <div className="group px-4 py-2 rounded-md border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors flex items-center gap-3">
            <DockerIcon
              className="text-gray-400 text-lg group-hover:text-blue-400 transition-colors"
            />
            <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">
              Docker
            </span>
          </div>
          <div className="group px-4 py-2 rounded-md border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors flex items-center gap-3">
            <RaspberryPiIcon
              className="text-gray-400 text-lg group-hover:text-red-500 transition-colors"
            />
            <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">
              Raspberry Pi
            </span>
          </div>
          <div className="group px-4 py-2 rounded-md border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors flex items-center gap-3">
            <WifiHigh
              className="text-gray-400 text-lg group-hover:text-emerald-400 transition-colors"
            />
            <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">
              OpenWRT
            </span>
          </div>
          <div className="group px-4 py-2 rounded-md border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors flex items-center gap-3">
            <SynologyIcon
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
