export interface Transform {
  readonly targetPosition: [number, number, number];
  readonly targetRotation: [number, number, number];
  zoom: number;
}
export interface IntroSetting {
  name: string;
  desktop: Transform;
  tablet: Transform;
  mobile: Transform;
}

export const introSettings: IntroSetting[] = [
  {
    name: "IntroView",
    desktop: {
      targetPosition: [0, 5.249, 10],
      targetRotation: [-0.40156, 0, 0],
      zoom: 26,
    },
    tablet: {
      targetPosition: [0, 5.249, 10],
      targetRotation: [-0.40156, 0, 0],
      zoom: 38,
    },
    mobile: {
      targetPosition: [0, 5.249, 10],
      targetRotation: [-0.40156, 0, 0],
      zoom: 15,
    },
  },
  {
    name: "InitialView",
    desktop: {
      targetPosition: [0, 0, 10],
      targetRotation: [0, 0, 0],
      zoom: 60,
    },
    tablet: { targetPosition: [0, 0, 10], targetRotation: [0, 0, 0], zoom: 38 },
    mobile: { targetPosition: [0, 0, 10], targetRotation: [0, 0, 0], zoom: 25 },
  },
];

export interface InteractiveItem {
  icon: string;
  name: string;
}
export type InteractiveBlock =
  | { type: "text"; content: string }
  | { type: "techList"; items: InteractiveItem[] }
  | { type: "textWithIcon"; content: string; icon: string };

export interface InteractiveObject {
  name: string;
  desktop: Transform;
  tablet: Transform;
  mobile: Transform;
  title: string;
  text?: string;
  special?: string;
  items?: InteractiveItem[];
  blocks?: InteractiveBlock[];
}

export const interactiveObjects: InteractiveObject[] = [
  {
    name: "Clock",
    desktop: {
      targetPosition: [3.784, 2.407, 10],
      targetRotation: [0.028407, 0.668407, 0.138407],
      zoom: 223,
    },
    tablet: {
      targetPosition: [6.97, 2.259, 10],
      targetRotation: [0, 0.8764, 0.1784],
      zoom: 189,
    },
    mobile: {
      targetPosition: [6.371, 1.705, 10],
      targetRotation: [0.0984, 0.8484, 0.0784],
      zoom: 162,
    },
    title: "Clock :",
    text: "Parce qu’en code comme dans la vie, tout est une question de timing, Iure nemo sit ab, saepe voluptatum, possimus porro asperiores error eaque molestias nisi quae magnam enim eligendi nihil quod minus mollitia aliquid! Tempore exercitationem dolor quidem doloribus temporibus illum iste! Eius, accusamus. Numquam, soluta? Quibusdam magni officia accusantium sunt impedit repellendus, modi distinctio nisi sint deserunt earum mollitia non dignissimos, architecto corporis ratione odit! Excepturi, quas voluptatem. Dolorem, explicabo iure. Minus quod, eaque asperiores obcaecati aspernatur laudantium a deleniti. Cupiditate nisi alias cumque? Mollitia modi totam quis rem optio in possimus. A ipsa, est ea fugiat porro, facere consequuntur tenetur excepturi deleniti quasi, sequi dolores laudantium esse beatae minus nihil itaque quod! Laboriosam obcaecati, nulla ducimus eveniet voluptatem magni repellendus, provident dicta dolore aperiam architecto qui, quasi dolorum ipsa.",
  },
  {
    name: "Monkey",
    desktop: {
      targetPosition: [-2.618, 3.282, 10],
      targetRotation: [0, -0.72156, -0.15156],
      zoom: 223,
    },
    tablet: {
      targetPosition: [0, 1.8, 10],
      targetRotation: [-0.25, 0, 0],
      zoom: 38,
    },
    mobile: {
      targetPosition: [0, 1.2, 10],
      targetRotation: [-0.23, 0, 0],
      zoom: 30,
    },
    title: "Monkey :",
    text: "Une expérimentation 3D en Three.js, basée sur le modèle emblématique Suzanne. Un jeu de particules, de shaders et de morphing, pour explorer les possibilités du web interactif.",
    special: "monkey",
  },
  {
    name: "Mug",
    desktop: {
      targetPosition: [-0.08399, -2.616, 10],
      targetRotation: [0.0384, -0.0084, -0.02156],
      zoom: 400,
    },
    tablet: {
      targetPosition: [0, 1.8, 10],
      targetRotation: [-0.25, 0, 0],
      zoom: 38,
    },
    mobile: {
      targetPosition: [0, 1.2, 10],
      targetRotation: [-0.23, 0, 0],
      zoom: 30,
    },
    title: "Un café :",
    text: "Entre deux lignes de code et une gorgée de café, je suis toujours ouvert à de nouveaux projets. Télécharge ma carte de visite pour qu’on en parle !",
    special: "mug",
  },
  {
    name: "Library",
    desktop: {
      targetPosition: [-1.635, -0.16, 10],
      targetRotation: [0.128407, -0.80156, -0.07156],
      zoom: 275,
    },
    tablet: {
      targetPosition: [0, 1.8, 10],
      targetRotation: [-0.25, 0, 0],
      zoom: 38,
    },
    mobile: {
      targetPosition: [0, 1.2, 10],
      targetRotation: [-0.23, 0, 0],
      zoom: 30,
    },
    title: "Library :",
    special: "Library",
    blocks: [
      {
        type: "text",
        content:
          "J’ai commencé mon parcours de développeur par une formation centrée sur les bases du web. Cette première expérience m’a permis d’acquérir une compréhension solide du développement et des fondamentaux du code.",
      },
      {
        type: "techList",
        items: [
          { icon: "/icons/html-5.svg", name: "Html" },
          { icon: "/icons/css-3.svg", name: "CSS" },
          { icon: "/icons/js.svg", name: "Javascript" },
          { icon: "/icons/sql.svg", name: "Sql" },
          { icon: "/icons/php.svg", name: "Php" },
        ],
      },
      {
        type: "text",
        content:
          "Par la suite, je me suis orienté vers le MERN stack, ce qui m’a permis d’élargir mes compétences et de gagner en autonomie sur la création d’applications complètes, du front au back.",
      },
      {
        type: "techList",
        items: [
          { icon: "/icons/mongodb.svg", name: "MongoDB" },
          { icon: "/icons/react.svg", name: "React" },
          { icon: "/icons/nodejs.svg", name: "Node.js" },
        ],
      },

      {
        type: "text",
        content:
          "Aujourd’hui, je travaille principalement avec Next.js, Tailwind CSS, shadcn/ui, GSAP et Three.js — un écosystème moderne que j’utilise pour concevoir des interfaces dynamiques, fluides et immersives.",
      },
      {
        type: "techList",
        items: [
          { icon: "/icons/nextjs.svg", name: "Nextjs" },
          { icon: "/icons/tailwind.svg", name: "Tailwind" },
          { icon: "/icons/gsap.svg", name: "Gsap" },
          { icon: "/icons/github.svg", name: "Github" },
        ],
      },

      {
        type: "text",
        content:
          "Toujours curieux et passionné, j’aime découvrir de nouveaux outils, expérimenter et me tenir à jour sur les dernières évolutions du développement web.",
      },
    ],
  },
  {
    name: "Photos",
    desktop: {
      targetPosition: [11.641, 0.332, 10],
      targetRotation: [0.208407, 0.78407, 0.008407],
      zoom: 223,
    },

    tablet: {
      targetPosition: [0, 1.8, 10],
      targetRotation: [-0.25, 0, 0],
      zoom: 38,
    },
    mobile: {
      targetPosition: [0, 1.2, 10],
      targetRotation: [-0.23, 0, 0],
      zoom: 30,
    },
    title: "Projets :",
    text: "xplorez ma galerie : entre sites vitrines, boutiques en ligne et projets web interactifs, chaque création reflète une aventure unique.",
    special: "photos",
  },
];

export interface PhotoObject {
  name: string;
  websiteName: string;
  url: string;
}

export const photoObjects: PhotoObject[] = [
  { name: "Photo-1", websiteName: "Breiz-Cola", url: "https://breiz-cola.fr/" },
  { name: "Photo-2", websiteName: "Breiz-Cola", url: "#" },
  { name: "Photo-3", websiteName: "Breiz-Cola", url: "#" },
  { name: "Photo-4", websiteName: "Breiz-Cola", url: "#" },
  { name: "Photo-5", websiteName: "Breiz-Cola", url: "#" },
  { name: "Photo-6", websiteName: "Breiz-Cola", url: "#" },
  { name: "Photo-7", websiteName: "Breiz-Cola", url: "#" },
  { name: "Photo-8", websiteName: "Breiz-Cola", url: "#" },
];
