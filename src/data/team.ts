// src/data/team.ts

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  imgUrl: string;
  isHost: boolean;
}

// Add your team members here
// You can use the same image path structure: /team/images/memberX.png
export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Prakhar Agrawal",
    role: "Host",
    imgUrl: "/team/images/member1.png",
    isHost: true,
  },
  {
    id: 2,
    name: "Tanya Krishnani",
    role: "Account Manager",
    imgUrl: "/team/images/member2.png",
    isHost: false,
  },
  {
    id: 3,
    name: "Driti Gupta",
    role: "Social Media Manager",
    imgUrl: "/team/images/member3.png",
    isHost: false,
  },
  {
    id: 4,
    name: "Monika Agrawal",
    role: "Content Manager",
    imgUrl: "/team/images/member4.png",
    isHost: false,
  },
  {
    id: 5,
    name: "Anamika Sonwani",
    role: "Customer Relationship Manager",
    imgUrl: "/team/images/member5.png",
    isHost: false,
  },
  {
    id: 6,
    name: "Ved Rajwade",
    role: "Videographer",
    imgUrl: "/team/images/member6.png",
    isHost: false,
  },
  {
    id: 7,
    name: "Saksham Gupta",
    role: "Videographer",
    imgUrl: "/team/images/member7.png",
    isHost: false,
  },
  {
    id: 8,
    name: "Rajni Gandha",
    role: "Video Editor",
    imgUrl: "/team/images/member8.png",
    isHost: false,
  },
  {
    id: 9,
    name: "Uddeshy Mishra",
    role: "Graphic Designer",
    imgUrl: "/team/images/member9.png",
    isHost: false,
  },
];
