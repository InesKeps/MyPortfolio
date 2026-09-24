import Keps from "@/components/Keps";

export default function HeroContent() {
  return (
    <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
      <p className="font-mono text-sm uppercase tracking-widest text-accent">
        Développeuse web fullstack
      </p>

      <h1 className="max-w-3xl font-display text-[clamp(36px,5.5vw,64px)] font-bold leading-[1.1] tracking-tight">
        Je construis des produits web, de bout en bout.
      </h1>

      <p className="max-w-xl text-lg leading-relaxed text-muted">
        Du design à la mise en production — des interfaces soignées, un code
        robuste, des systèmes qui tiennent.
      </p>

      <div className="mt-4 flex flex-col gap-4 sm:flex-row">
        <a
          href="#projets"
          className="rounded-full bg-lavender px-6 py-3 font-medium text-aubergine transition-transform hover:-translate-y-0.5"
        >
          Voir mes projets
        </a>
        <a
          href="#contact"
          className="rounded-full border border-mint/40 px-6 py-3 font-medium text-ink transition-colors hover:border-mint hover:bg-lavender/10"
        >
          Travaillons ensemble
        </a>
      </div>

      <Keps/>
    </div>
  );
}