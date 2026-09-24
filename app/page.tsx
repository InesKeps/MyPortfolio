import HeroContent from "@/components/hero/HeroContent";
import ParticleCanvasLoader from "@/components/hero/ParticleCanvasLoader";
import About from "@/components/About";
import SkillsGrid from "@/components/SkillsGrid";
import Contact from "@/components/Contact";
import GithubActivity from "@/components/GithubActivity";
import CommitGraph from "@/components/CommitGraph";

export default function Home() {
  return (
    <>
      <section
        id="accueil"
        className="relative flex min-h-screen scroll-mt-20 items-center justify-center overflow-hidden"
      >
        <ParticleCanvasLoader />
        <HeroContent />
      </section>

      <section id="a-propos" className="mx-auto max-w-5xl scroll-mt-20 px-6 py-24">
        <About />
      </section>

      <section id="projets" className="mx-auto max-w-4xl scroll-mt-20 px-6 py-24">
        <CommitGraph />
      </section>

      <section id="activite" className="mx-auto max-w-5xl scroll-mt-20 px-6 py-24">
        <GithubActivity />
      </section>

      <section id="competences" className="mx-auto max-w-5xl scroll-mt-20 px-6 py-24">
        <SkillsGrid />
      </section>

      <section id="contact" className="mx-auto max-w-5xl scroll-mt-20 px-6 py-24">
        <Contact />
      </section>
    </>
  );
}