import { Nav } from "../components";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-black min-h-screen">
      <Nav />
      {children}
    </div>
  );
}
