import { LinuxLogo, WifiHigh, DockerIcon, RaspberryPiIcon, SynologyIcon } from "../icons";

export function Integrations() {
  return (
    <section id="integrations" className="bg-black py-16">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <h2 className="mb-4 text-3xl font-medium tracking-tight text-white">Integrations</h2>

        <div className="mt-10 flex flex-wrap justify-center gap-2 md:gap-4">
          <div className="group flex items-center gap-3 rounded-md border border-white/5 bg-white/2 px-4 py-2 transition-colors hover:bg-white/5">
            <LinuxLogo className="text-lg text-gray-400 transition-colors group-hover:text-white" />
            <span className="text-sm font-medium text-gray-400 transition-colors group-hover:text-white">
              Linux
            </span>
          </div>
          <div className="group flex items-center gap-3 rounded-md border border-white/5 bg-white/2 px-4 py-2 transition-colors hover:bg-white/5">
            <DockerIcon className="text-lg text-gray-400 transition-colors group-hover:text-blue-400" />
            <span className="text-sm font-medium text-gray-400 transition-colors group-hover:text-white">
              Docker
            </span>
          </div>
          <div className="group flex items-center gap-3 rounded-md border border-white/5 bg-white/2 px-4 py-2 transition-colors hover:bg-white/5">
            <RaspberryPiIcon className="text-lg text-gray-400 transition-colors group-hover:text-red-500" />
            <span className="text-sm font-medium text-gray-400 transition-colors group-hover:text-white">
              Raspberry Pi
            </span>
          </div>
          <div className="group flex items-center gap-3 rounded-md border border-white/5 bg-white/2 px-4 py-2 transition-colors hover:bg-white/5">
            <WifiHigh className="text-lg text-gray-400 transition-colors group-hover:text-emerald-400" />
            <span className="text-sm font-medium text-gray-400 transition-colors group-hover:text-white">
              OpenWRT
            </span>
          </div>
          <div className="group flex items-center gap-3 rounded-md border border-white/5 bg-white/2 px-4 py-2 transition-colors hover:bg-white/5">
            <SynologyIcon className="text-lg text-gray-400 transition-colors group-hover:text-white" />
            <span className="text-sm font-medium text-gray-400 transition-colors group-hover:text-white">
              Synology
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
