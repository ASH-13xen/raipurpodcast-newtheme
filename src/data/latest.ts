// src/data/latest.ts

export interface LatestDrop {
  id: number;
  episode: string;
  title: string;
  yt_url: string;
}

export const latestDrops: LatestDrop[] = [
  {
    id: 1,
    episode: "EPISODE 99",
    title:
      "From Daily Dumbbell to Aarambh:How they are transforming Health, Fitness and life.",
    yt_url: "https://www.youtube.com/watch?v=7qLol1f-1KQ",
  },
  {
    id: 2,
    episode: "EPISODE 98",
    title:
      "From 108 KGs to Fitness Icon-Her journey will change how you see yourself.",
    yt_url: "https://www.youtube.com/watch?v=5B8sPTzNLHo",
  },
];
