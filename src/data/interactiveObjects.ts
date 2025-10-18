// interactiveObjects.ts

export interface Transform {
  targetPosition: [number, number, number];
  targetQuaternion: [number, number, number];
  zoom: number;
}

export interface InteractiveObject {
  name: string;
  desktop: Transform;
  tablet?: Transform;
  mobile?: Transform;
  title?: string;
  text?: string;
}

export const interactiveObjects: InteractiveObject[] = [
  {
    name: "IntroView",
    desktop: { targetPosition: [0, 2.38, 10], targetQuaternion: [-0.251, 0, 0], zoom: 34 },
    tablet: { targetPosition: [0, 1.8, 10], targetQuaternion: [-0.25, 0, 0], zoom: 38 },
    mobile: { targetPosition: [0, 1.2, 10], targetQuaternion: [-0.23, 0, 0], zoom: 30 },
  },
  {
    name: "InitialView",
    desktop: { targetPosition: [0, 0, 10], targetQuaternion: [0, 0, 0], zoom: 60 },
    tablet: { targetPosition: [0, 0, 10], targetQuaternion: [0, 0, 0], zoom: 50 },
    mobile: { targetPosition: [0, 0, 10], targetQuaternion: [0, 0, 0], zoom: 25 },
  },
  {
    name: "Clock",
    desktop: { targetPosition: [6.07, -0.57, 10], targetQuaternion: [0.2, 0.748, 0], zoom: 400 },
    tablet: { targetPosition: [5.5, -0.4, 10], targetQuaternion: [0.2, 0.7, 0], zoom: 350 },
    mobile: { targetPosition: [5, -0.2, 10], targetQuaternion: [0.18, 0.65, 0], zoom: 300 },
    title: "Clock",
    text: "It's time to learn something new!",
  },
  {
    name: "Mug",
    desktop: { targetPosition: [-0.08399, -2.616, 10], targetQuaternion: [0.0384, -0.0084, -0.02156], zoom: 400 },
    tablet: { targetPosition: [-0.08399, -2.2, 10], targetQuaternion: [0.03, -0.008, -0.02], zoom: 340 },
    mobile: { targetPosition: [-0.08399, -1.8, 10], targetQuaternion: [0.02, -0.008, -0.02], zoom: 280 },
    title: "Mug",
    text: "A cup of coffee keeps the code flowing!",
  },
  {
    name: "Library",
    desktop: { targetPosition: [-3.579, -0.73, 10], targetQuaternion: [0.1784, -0.76159, -0.03159], zoom: 390 },
    tablet: { targetPosition: [-3.0, -0.6, 10], targetQuaternion: [0.15, -0.7, -0.03], zoom: 330 },
    mobile: { targetPosition: [-2.6, -0.5, 10], targetQuaternion: [0.12, -0.65, -0.03], zoom: 270 },
    title: "Library",
    text: "A room full of knowledge and adventure!",
  },
  {
    name: "Photos",
    desktop: { targetPosition: [8.085, 0.009799, 10], targetQuaternion: [0.208407, 0.648407, 0.00159], zoom: 265 },
    tablet: { targetPosition: [7.5, 0.0, 10], targetQuaternion: [0.20, 0.62, 0.0015], zoom: 230 },
    mobile: { targetPosition: [7.0, 0.0, 10], targetQuaternion: [0.19, 0.60, 0.0015], zoom: 200 },
    title: "Photos",
    text: "A room full of knowledge and adventure!",
  },
];

// Photos remain unchanged
export interface PhotoObject {
  name: string;
  websiteName: string;
  url: string;
}

export const photosObject: PhotoObject[] = [
  { name: "Photo-1", websiteName: "Breiz-Cola", url: "https://breiz-cola.fr/" },
  { name: "Photo-2", websiteName: "Breiz-Cola", url: "#" },
  { name: "Photo-3", websiteName: "Breiz-Cola", url: "#" },
  { name: "Photo-4", websiteName: "Breiz-Cola", url: "#" },
  { name: "Photo-5", websiteName: "Breiz-Cola", url: "#" },
  { name: "Photo-6", websiteName: "Breiz-Cola", url: "#" },
];
