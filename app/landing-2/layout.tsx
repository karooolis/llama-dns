import { Nav } from "./nav";

export default function Landing2Layout({
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
