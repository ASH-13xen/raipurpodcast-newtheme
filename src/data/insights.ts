// src/data/insights.ts

export interface Insight {
  id: number;
  episode: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  content: string;
  videoUrl?: string;
}

export const insightsList: Insight[] = [
  {
    id: 1,
    episode: "EP 042",
    title: "Why did the capital shift from Raipur to Atal Nagar?",
    category: "History",
    date: "Oct 12, 2024",
    readTime: "3 min",
    content:
      "The shift was primarily driven by the need for better urban planning. Raipur's old infrastructure was struggling to keep up with the population boom. Atal Nagar (Nava Raipur) is designed as India's first greenfield smart city, focusing on sustainability and administrative efficiency.",
    videoUrl: "https://youtube.com/shorts/qC0BGrn7Lz0",
  },
  {
    id: 2,
    episode: "EP 038",
    title: "The secret recipe behind the famous 'Poha' of Jaistambh Chowk",
    category: "Food",
    date: "Sep 28, 2024",
    readTime: "2 min",
    content:
      "It's all about the 'Jeeravan Masala'. Unlike Indori Poha which is sweet, the Raipur variant relies heavily on a spicy, tangy mix of fennel, coriander, and dried mango powder. Plus, the double-steam method keeps it fluffy.",
    videoUrl: "https://youtube.com/shorts/dQw4w9WgXcQ",
  },
  {
    id: 3,
    episode: "EP 045",
    title: "How startups are changing the landscape of Chhattisgarh?",
    category: "Business",
    date: "Nov 02, 2024",
    readTime: "5 min",
    content:
      "With the new incubation center at NIT Raipur and 36Inc, we are seeing a surge in D2C brands. The cost of living advantage allows founders to have a longer runway compared to Bangalore or Delhi.",
    videoUrl: "https://www.instagram.com/reels/DAI0z33S6pT/",
  },
  {
    id: 4,
    episode: "EP 012",
    title: "Hidden waterfalls near Raipur you can visit in a day",
    category: "Travel",
    date: "Aug 15, 2024",
    readTime: "4 min",
    content:
      "Apart from Chitrakote, check out Ghatarani and Jatmai. They are best visited during the monsoon (July-Sept). There is also a lesser-known trek near Bernawapara Wildlife Sanctuary that leads to a secluded pool.",
    videoUrl: "https://www.youtube.com/shorts/lSHKB3WvBbo",
  },
  {
    id: 5,
    episode: "EP 050",
    title: "Understanding the tribal art forms of Bastar",
    category: "Art",
    date: "Dec 10, 2024",
    readTime: "6 min",
    content:
      "Dhokra art isn't just metal casting; it's a 4000-year-old lost-wax tradition. Each piece tells a story of nature, hunting, or village life. The 'Bell Metal' used is an alloy of brass, nickel, and zinc.",
  },
  {
    id: 6,
    episode: "EP 029",
    title: "Is the real estate market in Raipur bubbling?",
    category: "Business",
    date: "July 22, 2024",
    readTime: "3 min",
    content:
      "Experts suggest steady growth rather than a bubble. The demand is end-user driven rather than speculative investor driven. Areas like Saddu and Kachna are seeing the highest appreciation.",
  },
  {
    id: 7,
    episode: "EP 033",
    title: "The legend of Hatkeshwar Mahadev Temple",
    category: "History",
    date: "Aug 05, 2024",
    readTime: "2 min",
    content:
      "Built in 1402 by Haihaya ruler Brahmadeo, this temple on the banks of Kharun river is a prime example of Nagara architectural style. The intricate carvings resemble those of Khajuraho.",
  },
];
