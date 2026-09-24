import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";

export default function ProjectCover({
  src,
  alt,
  demoUrl,
  width,
  height,
}: {
  src: string;
  alt: string;
  demoUrl?: string;
  width: number;
  height: number;
}) {
  const inner = (
    <>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`w-full ${demoUrl ? "transition-transform duration-500 group-hover/cover:scale-105" : ""}`}
      />
      {demoUrl && (
        <div className="absolute inset-0 flex items-center justify-center bg-aubergine/60 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover/cover:opacity-100">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-medium text-aubergine shadow-lg shadow-accent/30">
            Voir la démo <FiArrowUpRight />
          </span>
        </div>
      )}
    </>
  );

  const cls = "group/cover relative block overflow-hidden rounded-xl border border-white/10";

  return demoUrl ? (
    <a href={demoUrl} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <div className={cls}>{inner}</div>
  );
}