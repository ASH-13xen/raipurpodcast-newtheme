// src/data/testimonials.ts

export interface Review {
  id: number;
  name: string;
  role: string;
  quote: string;
  image: string;
}

export const reviewsList: Review[] = [
  {
    id: 1,
    name: "Aisha Verma",
    role: "Architect",
    quote:
      "I never realized how much history was hidden in our daily commute. This podcast has completely changed how I see Raipur.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Rohan Das",
    role: "Filmmaker",
    quote:
      "The sound design is absolutely world-class. It feels less like a podcast and more like a movie for your ears.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Priya Singh",
    role: "Food Blogger",
    quote:
      "You guys captured the soul of the street food scene. I was drooling the entire time listening to the Telibandha episode.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Kabir Mehta",
    role: "Musician",
    quote:
      "Finally, a platform that gives Chhattisgarh the artistic spotlight it deserves. Pure inspiration.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Sonia Kapoor",
    role: "Startup Founder",
    quote:
      "The episode on the local startup ecosystem was an eye-opener. It gave me the confidence to finally pitch my idea.",
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Amit Patel",
    role: "Student, NIT",
    quote:
      "I listen to this on my way to college every day. It's authentic, it's raw, and it feels like home.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 7,
    name: "Neha Sharma",
    role: "Journalist",
    quote:
      "You are documenting the oral history of our city. This is important work wrapped in great storytelling.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop",
  },
];
