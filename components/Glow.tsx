export default function Glow() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-lavender/30 blur-[120px]" />
      <div className="absolute -right-40 top-1/3 h-112 w-md rounded-full bg-lavender/15 blur-[130px]" />
      <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-lavender/20 blur-[120px]" />
    </div>
  );
}