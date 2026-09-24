export type Milestone = {
  kind: "milestone";
  id: string;
  title: string;
  commit: string; // message façon git log
  techs: string[];
  gained?: string[]; // technos nouvellement acquises à cette étape (sous-ensemble de techs)
  description: string;
  demoUrl?: string;
  repoUrl?: string;
  cover?: string; // capture dans public/projets/<id>/cover.png (optionnel)
};

export type Project = {
  kind: "project";
  slug: string;
  title: string;
  category: "capstone" | "client";
  tag: string; // release git, ex "v3.0.0"
  role: string;
  techs: string[];
  description: string;
  context: string;
  problem: string;
  approach: string;
  result: string;
  demoUrl?: string;
  repoUrl?: string;
  cover?: string;
  images?: string[];
  highlights?: string[]; // points techniques clés, pour les évaluateurs
};

export type ProjectNode = Milestone | Project;

export const nodes: ProjectNode[] = [
  {
    kind: "milestone",
    id: "site-portfolio",
    title: "Site Portfolio",
    commit: "feat: premier portfolio statique",
    techs: ["HTML", "CSS"],
    gained: ["HTML", "CSS"],
    description:
      "Template de portfolio en 4 pages (vidéo d'arrière-plan, barres de compétences, timeline, grille d'articles), en HTML/CSS sans framework.",
    demoUrl: "https://ineskeps.github.io/Site-portfolio",
    repoUrl: "https://github.com/InesKeps/Site-portfolio",
    cover: "/projets/sitePortfolio.png",
  },
  {
    kind: "milestone",
    id: "site-medinova",
    title: "Site Medinova",
    commit: "feat: intégration d'une maquette vitrine (santé)",
    techs: ["HTML", "CSS"],
    description:
      "Intégration HTML/CSS d'une maquette de site d'hôpital : services, prise de rendez-vous, forfaits, équipe, témoignages, blog.",
    demoUrl: "https://ineskeps.github.io/Site-Medinova",
    repoUrl: "https://github.com/InesKeps/Site-Medinova",
    cover: "/projets/medinova.png",
  },
  {
    kind: "milestone",
    id: "site-adex",
    title: "Site Adex",
    commit: "feat: interactivité en JS vanilla (slider, menu)",
    techs: ["HTML", "CSS", "JavaScript"],
    gained: ["JavaScript"],
    description:
      "Intégration d'une vitrine d'entreprise avec un slider d'images dans le hero, un menu burger, et des accordéons natifs.",
    demoUrl: "https://ineskeps.github.io/Site_Adex",
    repoUrl: "https://github.com/InesKeps/Site_Adex",
    cover: "/projets/adex.png",
  },
  {
    kind: "milestone",
    id: "site-rayal-park",
    title: "Site Rayal Park",
    commit: "feat: animations au scroll (IntersectionObserver)",
    techs: ["HTML", "CSS", "JavaScript"],
    description:
      "Landing page d'hôtel : formulaire de disponibilité, cartes de chambres, services et actualités, avec apparition des sections au défilement.",
    demoUrl: "https://ineskeps.github.io/Site-RayalPark",
    repoUrl: "https://github.com/InesKeps/Site-RayalPark",
    cover: "/projets/rayalPark.png",
  },
  {
    kind: "milestone",
    id: "ui-design",
    title: "Design d'interface",
    commit: "feat: du pixel-perfect au design d'interface",
    techs: ["Figma", "Adobe XD"],
    gained: ["Figma", "Adobe XD"],
    description:
      "Après avoir intégré fidèlement des maquettes existantes, j'ai appris à concevoir mes propres interfaces.",
  },
  {
    kind: "milestone",
    id: "template-admin",
    title: "Template Admin",
    commit: "refactor: passage à Tailwind (dashboard AdminLTE)",
    techs: ["HTML", "Tailwind CSS", "JavaScript", "Chart.js"],
    gained: ["Tailwind CSS", "Chart.js"],
    description:
      "Reproduction en Tailwind de l'interface AdminLTE 3, traduite en français : 7 pages dont un tableau de bord avec graphiques Chart.js.",
    demoUrl: "https://ineskeps.github.io/templateAdmin",
    repoUrl: "https://github.com/InesKeps/templateAdmin",
    cover: "/projets/templateAdmin.png",
  },
  {
    kind: "milestone",
    id: "taskin",
    title: "TaskIn",
    commit: "feat: première app React + TS + Redux + backend",
    techs: ["React", "TypeScript", "Redux Toolkit", "Tailwind CSS", "Formik", "Yup", "Back4App"],
    gained: ["React", "TypeScript", "Redux Toolkit", "Back4App"],
    description:
      "Gestionnaire de tâches avec authentification et données par utilisateur (Back4App) : CRUD, priorités, catégories, filtres par statut et priorité.",
    demoUrl: "https://ineskeps.github.io/Taskin",
    repoUrl: "https://github.com/InesKeps/Taskin",
    cover: "/projets/Taskin.png",
  },
  {
    kind: "milestone",
    id: "coding-city",
    title: "Coding City",
    commit: "feat: dashboard React/TS avec data viz",
    techs: ["React", "TypeScript", "Tailwind CSS", "Recharts"],
    gained: ["Recharts"],
    description:
      "Dashboard d'analyse en React/TS : 8 pages, mode clair/sombre, graphiques Recharts, recherche et filtres sur les tableaux.",
    demoUrl: "https://ineskeps.github.io/DashboardCoding",
    repoUrl: "https://github.com/InesKeps/DashboardCoding",
    cover: "/projets/codingCity.png",
  },

  {
    kind: "project",
    slug: "radiance",
    title: "Radiance — Gestion de cabinet dentaire",
    category: "client",
    tag: "v1.0.0",
    role: "Développeuse solo (conception, backend, frontend).",
    techs: ["React 19", "TypeScript", "Redux Toolkit", "Tailwind CSS", "shadcn/ui", "FullCalendar", "Recharts", "Formik", "Yup", "jsPDF", "Node.js", "Express 5", "Prisma 6", "MySQL", "JWT", "Jest"],
    description:
      "Application de gestion pour un cabinet dentaire : dossiers patients, consultations avec schéma dentaire, agenda, devis et ordonnances PDF, tableau de bord d'activité.",
    context:
      "Un cabinet dentaire au Cameroun gérait ses patients, ses rendez-vous et sa facturation à la main, sans logiciel unique. Il fallait un seul outil couvrant tout le parcours — de l'accueil du patient à l'ordonnance — utilisable par le dentiste comme par le secrétariat.",
    problem:
      "Un logiciel dentaire ne peut pas se contenter de listes génériques : chaque soin concerne une dent précise, certains actes touchent toute la bouche, et trois caries sur trois dents comptent comme trois actes à facturer. S'y ajoutent des exigences propres aux données de santé : ne jamais perdre un dossier, savoir qui a modifié quoi, et donner à chacun (dentiste, assistant) seulement les droits qui le concernent.",
    approach:
      "J'ai modélisé le dossier dentaire autour de la vraie notation des dents utilisée par les praticiens, pour que le logiciel parle leur langage. J'ai fait de la sécurité des données de santé une priorité : rien n'est jamais supprimé pour de bon, chaque consultation est enregistrée d'un seul bloc (une coupure ne laisse jamais un dossier à moitié saisi), et l'agenda refuse tout seul les rendez-vous qui se chevauchent.",
    result:
      "Logiciel livré et utilisé en production. Il gère les dossiers patients (assurances, antécédents, allergies), un schéma dentaire interactif où l'on désigne plusieurs dents d'un coup, la génération de devis, factures et ordonnances en PDF, un agenda en français avec glisser-déposer, et des rappels de rendez-vous par WhatsApp qui n'exposent aucune information médicale. Un journal réservé au dentiste en chef retrace toutes les modifications sensibles.",
    highlights: [
      "Modélisation du référentiel dentaire en notation FDI/ISO (chaque dent identifiée précisément)",
      "Enregistrement d'une consultation complète en une seule transaction (tout ou rien)",
      "Auth JWT access/refresh en cookies httpOnly révocables, bcrypt, contrôle des rôles centralisé, journal d'audit",
      "Recherche et pagination côté serveur pour tenir sur une connexion lente",
      "~24 500 lignes de code (API + interface), 39 tests unitaires et 46 vérifications d'intégration",
    ],
    cover: "/projets/radiancecover.png",
    images: ["/projets/radiance1.png", "/projets/radiance2.png"],
  },
  {
    kind: "project",
    slug: "jobdom",
    title: "JobDom — Plateforme de recrutement",
    category: "capstone",
    tag: "v2.0.0",
    role: "Projet web et mobile d'équipe : responsable de la version web de l'application (front-end et back-end).",
    techs: ["React 19", "TypeScript", "Redux Toolkit", "Tailwind CSS", "shadcn/ui", "Node.js", "Express 5", "Prisma", "MongoDB", "Socket.IO", "JWT", "Multer", "Nodemailer", "PDFKit"],
    description:
      "Plateforme de recrutement full-stack à deux espaces (candidat et recruteur) : correspondance par compétences, messagerie temps réel, génération de CV et back-office d'administration.",
    context:
      "Concevoir une plateforme de recrutement complète pour le marché francophone, qui met en relation candidats et recruteurs en se basant sur la vraie correspondance des compétences, et non sur de simples mots-clés.",
    problem:
      "Réunir dans une seule application cohérente tout ce dont chacun a besoin : pour le candidat, se rendre visible et postuler avec un CV ; pour le recruteur, publier des offres et trier les candidatures. Le tout en instaurant la confiance — emails vérifiés, entreprises vérifiées, avis modérés — et en permettant des échanges directs.",
    approach:
      "J'ai construit l'application web de bout en bout : une interface web réactive et une API sur mesure. La connexion est sécurisée (vérification de l'email par code, sessions protégées), et chaque type d'utilisateur — candidat, recruteur, administrateur — n'accède qu'à ce qui le concerne. Le cœur, c'est un moteur qui note les offres selon les compétences réellement partagées avec le candidat, une messagerie instantanée, et la génération automatique de CV en PDF.",
    result:
      "Plateforme déployée en ligne, complète : inscription avec vérification, création de profil, publication et recherche d'offres, candidature avec CV généré ou importé, suivi des candidatures, suggestions personnalisées, messagerie en temps réel, notifications, vérification légale des entreprises avec badge, avis modérés, et un tableau de bord d'administration (statistiques, gestion des utilisateurs et des offres, modération).",
    highlights: [
      "Auth JWT en cookies httpOnly + refresh token, vérification email par OTP",
      "Rôles CANDIDAT / EMPLOYEUR / ADMIN appliqués côté serveur",
      "Moteur de matching par score de recouvrement de compétences ; recherche insensible aux accents",
      "Messagerie et notifications temps réel via Socket.io (authentifié par cookie)",
      "Génération de CV en PDF (PDFKit), uploads via Multer, état global Redux Toolkit",
    ],
    cover: "/projets/jobdomcover.png",
    images: ["/projets/jobdom1.png", "/projets/jobdom2.png"],
  },
  {
    kind: "project",
    slug: "c-flow",
    title: "C-Flow — ERP de production industrielle",
    category: "client",
    tag: "v3.0.0",
    role: "Développeuse solo — du modèle de données au déploiement et à la mise en service. C'est le projet sur lequel j'ai appris et géré le déploiement moi-même.",
    techs: ["TypeScript", "Node.js", "Express", "Prisma 7", "PostgreSQL", "JWT", "Jest", "React 19", "Vite", "TanStack Query", "Zustand", "React Hook Form", "Zod", "TanStack Table", "Tailwind CSS", "shadcn/ui", "Docker", "GitHub Actions", "Nginx"],
    description:
      "ERP web sur mesure pour une usine de transformation d'huile de palme et de savonnerie : saisie de production par équipe, tableaux de bord (performance, rendements, stocks) et rapports imprimables. Déployé sur l'intranet et utilisé quotidiennement en production.",
    context:
      "Une usine de transformation d'huile de palme et de savonnerie pilotait sa production avec des dizaines de fichiers Excel séparés, remplis à partir de fiches papier. La direction n'avait aucune vue d'ensemble en temps réel de ses différentes unités (raffinerie, savonnerie, plasturgie, conditionnement, laboratoire, stocks, commercial).",
    problem:
      "Rassembler la saisie de production de toutes les unités dans un seul système fiable et traçable, en respectant des règles de terrain incontournables : des journées découpées en trois équipes dont une de nuit qui passe minuit, une saisie des données faite le lendemain à partir des fiches papier, et des calculs de performance.",
    approach:
      "J'ai conçu l'ensemble, du modèle de données jusqu'à la mise en service. Chaque journée de production est enregistrée d'un seul bloc : si quoi que ce soit échoue, rien n'est enregistré à moitié. Les calculs délicats liés aux horaires (une équipe de nuit qui franchit minuit, le bon fuseau horaire) sont isolés et testés un par un. J'ai ajouté de nombreux garde-fous dignes d'un logiciel critique : impossibilité d'effacer des données par erreur, journal de toutes les modifications, verrou contre les doubles saisies, sauvegardes automatiques. C'est aussi le projet sur lequel j'ai appris et géré moi-même le déploiement : mise en ligne automatisée et application isolée dans des conteneurs sur le serveur de l'usine.",
    result:
      "En service réel depuis septembre 2026 : la responsable saisit la production chaque jour, le directeur consulte les tableaux de bord et imprime un rapport quotidien, et seules les corrections de l'administrateur sont autorisées et tracées. Le système couvre toutes les unités plus les tableaux de bord de direction. 246 tests automatisés vérifient les cas limites du métier ; plusieurs bugs signalés par les utilisateurs ont été corrigés à la racine, sur données réelles.",
    highlights: [
      "Chaque journée = une transaction unique (tout ou rien) pour ne jamais corrompre les données",
      "Logique temporelle isolée en fonctions pures testées (équipe de nuit franchissant minuit, fuseau WAT, calculs de performance)",
      "Garde-fous production : blocage des scripts destructifs, journal d'audit, verrou anti-double-saisie, sauvegardes automatisées",
      "Déploiement géré de bout en bout : CI/CD (GitHub Actions, runner auto-hébergé), conteneurs Docker derrière Nginx",
      "246 tests automatisés côté backend",
    ],
    cover: "/projets/cflowcover.png",
    images: ["/projets/cflow1.png", "/projets/cflow2.png"],
  },
];

export const projects = nodes.filter(
  (node): node is Project => node.kind === "project"
);

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}