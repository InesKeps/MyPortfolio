import Image from "next/image";

export default function About() {
  return (
    <div className="grid items-center gap-10 md:grid-cols-[minmax(0,320px)_1fr]">
      <div className="relative mx-auto aspect-5/5 w-full max-w-xs">
        <div className="absolute -inset-3 rounded-4xl bg-linear-to-br from-accent/30 to-lavender/20 blur-2xl" />
        <Image
          src="/photo.png"
          alt="Ines Keps, développeuse web fullstack"
          fill
          sizes="(max-width: 768px) 80vw, 320px"
          className="rounded-3xl border border-accent/20 object-cover object-[center_25%]"
        />
      </div>

      <div>
        <h2 className="font-display text-4xl font-bold">À propos</h2>
        <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
          <p>
            Développeuse web fullstack, je conçois et je construis des applications
            de bout en bout — du design de l'interface jusqu'à la logique serveur.
          </p>
          <p>
            Mes compétences sont forgées par la pratique : une formation intensive en
            développement web, des projets concrets et de l'autodidaxie.
          </p>
          <p>
            Ce que j'aime : le soin du détail, des interfaces modernes et soignées,
            sans jamais sacrifier l'expérience utilisateur.
          </p>
        </div>
      </div>
    </div>
  );
}