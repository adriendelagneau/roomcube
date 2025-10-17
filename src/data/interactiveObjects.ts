// interactiveObjects.ts

// Type for 3D interactive objects
export interface InteractiveObject {
  name: string;
  targetPosition: [number, number, number];
  targetQuaternion: [number, number, number];
  zoom: number;
  title?: string;
  text?: string;
}

// Array of interactive objects
export const interactiveObjects: InteractiveObject[] = [
  {
    name: "IntroView",
    targetPosition: [0, 2.38, 10],
    targetQuaternion: [-0.251, 0, 0],
    zoom: 44,
  },
  {
    name: "InitialView",
    targetPosition: [0, 0, 10],
    targetQuaternion: [0, 0, 0],
    zoom: 65,
  },
  {
    name: "Clock",
    targetPosition: [6.07, -0.57, 10],
    targetQuaternion: [0.2, 0.748, 0],
    zoom: 400,
    title: "Clock",
    text: "It's time to learn something new !",
  },
  {
    name: "Mug",
    targetPosition: [-0.08399, -2.616, 10],
    targetQuaternion: [0.03840, -0.00840, -0.02156],
    zoom: 400,
    title: "Mug",
    text: "A cup of coffee keeps the code flowing!",
  },
  {
    name: "Library",
    targetPosition: [-3.579, -0.73, 10],
    targetQuaternion: [0.17840, -0.76159, -0.03159],
    zoom: 390,
    title: "Library",
    text: "A room full of knowledge and adventure!",
  },
  {
    name: "Photos",
    targetPosition: [8.085, 0.009799, 10],
    targetQuaternion: [0.208407, 0.648407, 0.00159],
    zoom: 265,
    title: "Photos",
    text: "A room full of knowledge and adventure!",
  },
];

// Type for photo objects
export interface PhotoObject {
  name: string;
  websiteName: string;
  url: string;
}

// Array of photos
export const photosObject: PhotoObject[] = [
  { name: "Photo-1", websiteName: "Breiz-Cola", url: "https://breiz-cola.fr/" },
  { name: "Photo-2", websiteName: "Breiz-Cola", url: "https://#" },
  { name: "Photo-3", websiteName: "Breiz-Cola", url: "https://#" },
  { name: "Photo-4", websiteName: "Breiz-Cola", url: "https://#" },
  { name: "Photo-5", websiteName: "Breiz-Cola", url: "https://#" },
  { name: "Photo-6", websiteName: "Breiz-Cola", url: "https://#" },
];
