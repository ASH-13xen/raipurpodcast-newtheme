// src/data/episodelist.ts

export interface Episode {
  id: number;
  title: string;
  category: string;
  date: string;
  duration: string;
  image: string;
  yt_url: string;
}

// Added new accurate categories based on your video topics
export const CATEGORIES = [
  "All",
  "Culture",
  "Business",
  "Health & Fitness",
  "Art",
  "Spirituality",
  "History",
  "Food",
];

export const episodesList: Episode[] = [
  {
    id: 1,
    title:
      "How Lalluram Was Built|The Truth About Indian Media, Crime News Craze, Modiji POV & Politics Debate.",
    category: "Culture",
    date: "Mar 06, 2026",
    duration: "36 min",
    image: "https://i.ytimg.com/vi/vHyYxq0pAJU/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=vHyYxq0pAJU",
  },
  {
    id: 2,
    title:
      "From Quitting Crore MNC Jobs to Pitching on Shark Tank India | Risk, Rejections & Resilience.",
    category: "Business",
    date: "Feb 27, 2026",
    duration: "45 min",
    image: "https://i.ytimg.com/vi/o4tLR-EfO50/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=o4tLR-EfO50",
  },
  {
    id: 3,
    title:
      "He Dropped CA Final to Become a Teacher — Why Purpose Mattered More Than the Degree.",
    category: "Culture",
    date: "Feb 20, 2026",
    duration: "35 min",
    image: "https://i.ytimg.com/vi/G-9nTb-Zgak/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=G-9nTb-Zgak",
  },
  {
    id: 4,
    title:
      "128 Handwriting Parameters That Can Predict Personality, Mindset & Future Health Risks.",
    category: "Health & Fitness",
    date: "Feb 16, 2026",
    duration: "39 min",
    image: "https://i.ytimg.com/vi/CmInLV0vWj4/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=CmInLV0vWj4",
  },
  {
    id: 5,
    title:
      "From Engineers to Marketing Founders: How Technical Minds Are Winning at Business.",
    category: "Business",
    date: "Feb 10, 2026",
    duration: "34 min",
    image: "https://i.ytimg.com/vi/ra_NsrEIhMo/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=ra_NsrEIhMo",
  },
  {
    id: 6,
    title:
      "From Daily Dumbbell to Aarambh:How they are transforming Health, Fitness and life.",
    category: "Health & Fitness",
    date: "Jan 27, 2026",
    duration: "45 min",
    image: "https://i.ytimg.com/vi/7qLol1f-1KQ/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=7qLol1f-1KQ",
  },
  {
    id: 7,
    title:
      "From 108 KGs to Fitness Icon-Her journey will change how you see yourself.",
    category: "Health & Fitness",
    date: "Jan 23, 2026",
    duration: "42 min",
    image: "https://i.ytimg.com/vi/5B8sPTzNLHo/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=5B8sPTzNLHo",
  },
  {
    id: 8,
    title:
      "Every Woman Needs This Conversation|Honest Talk With a Gynaecologist.",
    category: "Health & Fitness",
    date: "Jan 19, 2026",
    duration: "24 min",
    image: "https://i.ytimg.com/vi/IlHAgkkKReo/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=IlHAgkkKReo",
  },
  {
    id: 9,
    title:
      "How Beliefs, Gratitute and energy alignment can make the universe deliver 10X what you want.",
    category: "Spirituality",
    date: "Jan 16, 2026",
    duration: "39 min",
    image: "https://i.ytimg.com/vi/dNpD_KyTv50/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=dNpD_KyTv50",
  },
  {
    id: 10,
    title:
      "From 60k salary to 5 lakh/month The discipline,Trading secrets and strategies that made it possible.",
    category: "Business",
    date: "Jan 13, 2026",
    duration: "42 min",
    image: "https://i.ytimg.com/vi/uIb9YGz_4Es/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=uIb9YGz_4Es",
  },
  {
    id: 11,
    title:
      "From Army Major To Building India's Future Soldiers Ft Major rtd Pravin Singh.",
    category: "Culture",
    date: "Jan 10, 2026",
    duration: "53 min",
    image: "https://i.ytimg.com/vi/lSHKB3WvBbo/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=lSHKB3WvBbo",
  },
  {
    id: 12,
    title:
      "Palash Shrivastava on Panchayat Viral Reel, Gangs of Raipur & Mumbai Industry.",
    category: "Art",
    date: "Jan 06, 2026",
    duration: "53 min",
    image: "https://i.ytimg.com/vi/1FE5Xn6j7Ac/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=1FE5Xn6j7Ac",
  },
  {
    id: 13,
    title:
      "What Certified Fitness Coaches Do Differently | Happy lifters Fitness Framework .",
    category: "Health & Fitness",
    date: "Jan 04, 2026",
    duration: "50 min",
    image: "https://i.ytimg.com/vi/h4YxaXo1M_I/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=h4YxaXo1M_I",
  },
  {
    id: 14,
    title: "Is AI Becoming Our Emotional Support?",
    category: "Culture",
    date: "Jan 01, 2026",
    duration: "1 hr 4 min",
    image: "https://i.ytimg.com/vi/7DDwfX_tPhA/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=7DDwfX_tPhA",
  },
  {
    id: 15,
    title:
      "Emotional Loneliness, Society & the Therapy Taboo | A Psychologist’s Perspective - Ann Kurian",
    category: "Health & Fitness",
    date: "Dec 30, 2025",
    duration: "1 hr 7 min",
    image: "https://i.ytimg.com/vi/AXcUZUebwOE/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=AXcUZUebwOE",
  },
  {
    id: 16,
    title:
      "Influencers vs Truth | Fake Reviews, Ads vs Influencers | Adarsh Sharma",
    category: "Business",
    date: "Dec 29, 2025",
    duration: "1 hr 6 min",
    image: "https://i.ytimg.com/vi/LpsuiaGQ1pE/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=LpsuiaGQ1pE",
  },
  {
    id: 17,
    title:
      "Music, Business & Life Truths | Passion vs Responsibility ft. Shyama Agrawal",
    category: "Art",
    date: "Dec 25, 2025",
    duration: "37 min",
    image: "https://i.ytimg.com/vi/ft2flsbyHYE/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=ft2flsbyHYE",
  },
  {
    id: 18,
    title:
      "Dr. Ashok Agrawal on Building ABCD | Inspiring the Next Generation of the Agrawal Community.",
    category: "Culture",
    date: "Dec 20, 2025",
    duration: "42 min",
    image: "https://i.ytimg.com/vi/ggPYu2uB8y0/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=ggPYu2uB8y0",
  },
  {
    id: 19,
    title:
      "Is Indian Education System Really Preparing Our Kids? DPS Perspective ft Mr. and Mrs. Mukherjee",
    category: "Culture",
    date: "Dec 18, 2025",
    duration: "48 min",
    image: "https://i.ytimg.com/vi/eqTreEYl47U/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=eqTreEYl47U",
  },
  {
    id: 20,
    title: "The Truth Behind Momo Magic Café",
    category: "Food",
    date: "Dec 13, 2025",
    duration: "24 min",
    image: "https://i.ytimg.com/vi/cVXFjQBAKcQ/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=cVXFjQBAKcQ",
  },
  {
    id: 21,
    title:
      "The Truth About Vastu & Numerology | Veena Taunk Reveals Secrets how your home interior impacts you.",
    category: "Spirituality",
    date: "Dec 11, 2025",
    duration: "37 min",
    image: "https://i.ytimg.com/vi/oL0yCUP8DkU/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=oL0yCUP8DkU",
  },
  {
    id: 22,
    title:
      "Black Magic & Tantra Secrets with Vibha Sukhdeve | Dark Truths You Won’t Forget",
    category: "Spirituality",
    date: "Dec 10, 2025",
    duration: "49 min",
    image: "https://i.ytimg.com/vi/LGn0ET4b00E/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=LGn0ET4b00E",
  },
  {
    id: 23,
    title:
      "The Future of Magazines: Trends, Challenges & Reality | Priya Lalwani",
    category: "Culture",
    date: "Dec 07, 2025",
    duration: "25 min",
    image: "https://i.ytimg.com/vi/-Z-twv4YFXU/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=-Z-twv4YFXU",
  },
  {
    id: 24,
    title:
      "Italy × India Love Story to Business Story: Ciao Namaste Founders Tell All",
    category: "Business",
    date: "Dec 03, 2025",
    duration: "37 min",
    image: "https://i.ytimg.com/vi/MTrf-E_KDqE/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=MTrf-E_KDqE",
  },
  {
    id: 25,
    title:
      "How WiseBooks Makes Accounting Easy and Helps Small Businesses Manage Money Smarter",
    category: "Business",
    date: "Nov 27, 2025",
    duration: "36 min",
    image: "https://i.ytimg.com/vi/3PziT7bHJPI/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=3PziT7bHJPI",
  },
  {
    id: 26,
    title:
      "Sana Speaks, Raipur Listens, A journey of rejections, courage, why Gen Z must choose friendships",
    category: "Culture",
    date: "Nov 26, 2025",
    duration: "43 min",
    image: "https://i.ytimg.com/vi/PqjYUGDCatI/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=PqjYUGDCatI",
  },
  {
    id: 27,
    title:
      "Exploring Raipur’s Hidden Heritage with Nishtha Joshi | History, Stories & Old Structures",
    category: "History",
    date: "Nov 25, 2025",
    duration: "24 min",
    image: "https://i.ytimg.com/vi/XBxtXUtA2yc/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=XBxtXUtA2yc",
  },
  {
    id: 28,
    title:
      "2026 Numerology Predictions | Mulank, Pregnancy & Marriage | What’s Coming for You? Ft.Harsheet kaur",
    category: "Spirituality",
    date: "Nov 23, 2025",
    duration: "20 min",
    image: "https://i.ytimg.com/vi/Zqx8VlpudCk/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=Zqx8VlpudCk",
  },
  {
    id: 29,
    title:
      "Journey from Imagination to Innovation: Story of Furni Tech & Harpreet Singh!",
    category: "Business",
    date: "Nov 22, 2025",
    duration: "13 min",
    image: "https://i.ytimg.com/vi/5ahpQfZBLIo/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=5ahpQfZBLIo",
  },
  {
    id: 30,
    title:
      "Why I Chose Congress: Sarthak Sharma Opens Up on BJP, Governance & Rahul Gandhi",
    category: "Culture",
    date: "Nov 19, 2025",
    duration: "47 min",
    image: "https://i.ytimg.com/vi/k6je5fCJu8E/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=k6je5fCJu8E",
  },
  {
    id: 31,
    title:
      "How This 9-Year-Old Plans to Win Wimbledon One Day! FT. Singer and Actor Abir luthra",
    category: "Art",
    date: "Nov 15, 2025",
    duration: "15 min",
    image: "https://i.ytimg.com/vi/2xTu6MBvgQ4/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=2xTu6MBvgQ4",
  },
  {
    id: 32,
    title:
      "From Passion to Trend: How the DJ Scene Is Evolving | DJ Lords Gurveer Podcast",
    category: "Art",
    date: "Nov 13, 2025",
    duration: "26 min",
    image: "https://i.ytimg.com/vi/T4IPA0UVmOk/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=T4IPA0UVmOk",
  },
  {
    id: 33,
    title:
      "The Life & Teachings of Guru Nanak Dev Ji | Guru Purab Special Episode FT. Daya Singh Ji",
    category: "Spirituality",
    date: "Nov 05, 2025",
    duration: "51 min",
    image: "https://i.ytimg.com/vi/4x_K_YPSonk/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=4x_K_YPSonk",
  },
  {
    id: 34,
    title:
      "Behind the Rise of Vistaar News | Rasika Pandey’s Inspiring Story | Head Anchor Of Vistaar News",
    category: "Culture",
    date: "Nov 04, 2025",
    duration: "28 min",
    image: "https://i.ytimg.com/vi/4Y0bwBsLeg0/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=4Y0bwBsLeg0",
  },
  {
    id: 35,
    title:
      "Healing PPD Through Inner Child Work & Reparenting | FT. Reparenting Coach Simran Kaur",
    category: "Health & Fitness",
    date: "Oct 31, 2025",
    duration: "55 min",
    image: "https://i.ytimg.com/vi/Ik7WBLEIExQ/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=Ik7WBLEIExQ",
  },
  {
    id: 36,
    title:
      "From Roast Stage to Boardroom: Divyajeet Singh on Gen Z, Work Culture & Family Business",
    category: "Business",
    date: "Oct 28, 2025",
    duration: "44 min",
    image: "https://i.ytimg.com/vi/1i6DP_g1XTo/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=1i6DP_g1XTo",
  },
  {
    id: 37,
    title:
      "Inside Vanakkam Foundation: Feeding 500+ Cancer Patients Daily | Humanity in Action",
    category: "Culture",
    date: "Oct 25, 2025",
    duration: "21 min",
    image: "https://i.ytimg.com/vi/mAl7M-5X9JQ/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=mAl7M-5X9JQ",
  },
  {
    id: 38,
    title: "Turning Raw Land into Modern Dreams! 🏠✨-- Prithvi Developers",
    category: "Business",
    date: "Oct 23, 2025",
    duration: "23 min",
    image: "https://i.ytimg.com/vi/BsInlaqFCeI/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=BsInlaqFCeI",
  },
  {
    id: 39,
    title:
      "Sustainable Tourism Is The Future —Here’s How We Do It 🌱| Stranger Group Trips | Travel @7th Gear",
    category: "History",
    date: "Oct 17, 2025",
    duration: "53 min",
    image: "https://i.ytimg.com/vi/UXlXotpvNj4/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=UXlXotpvNj4",
  },
  {
    id: 40,
    title:
      "Importance Of Crystal In Life | How Birth Dates Shape Destiny With Harsheet Kaur",
    category: "Spirituality",
    date: "Oct 14, 2025",
    duration: "23 min",
    image: "https://i.ytimg.com/vi/e3xNDCnAfNg/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=e3xNDCnAfNg",
  },
  {
    id: 41,
    title:
      "Is Yoga Still About Healing? Or Has It Become Just Another Fitness Fad? | NILESH ISSWANI",
    category: "Health & Fitness",
    date: "Oct 10, 2025",
    duration: "24 min",
    image: "https://i.ytimg.com/vi/yHiIS7o0b6U/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=yHiIS7o0b6U",
  },
  {
    id: 42,
    title:
      "'Behind the Mic: Payal Vishal on Becoming a Voice-Over Star | Podcast Episode'",
    category: "Art",
    date: "Oct 07, 2025",
    duration: "29 min",
    image: "https://i.ytimg.com/vi/Z5ZaUwL5ZV8/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=Z5ZaUwL5ZV8",
  },
  {
    id: 43,
    title: "From Struggle to Success: The Power of a Business Coach",
    category: "Business",
    date: "Oct 04, 2025",
    duration: "37 min",
    image: "https://i.ytimg.com/vi/jKIomUf8IDQ/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=jKIomUf8IDQ",
  },
  {
    id: 44,
    title:
      "Tattoo Surgery, Rejections & COVID… But This Is How She Won! | ZUMBA TRAINER ANCHAL GILANI",
    category: "Health & Fitness",
    date: "Oct 03, 2025",
    duration: "47 min",
    image: "https://i.ytimg.com/vi/DAqgyY5oe6I/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=DAqgyY5oe6I",
  },
  {
    id: 45,
    title:
      "Why India Must Lead Manufacturing Now | The Future of Make in India",
    category: "Business",
    date: "Sep 30, 2025",
    duration: "25 min",
    image: "https://i.ytimg.com/vi/k0UOLbVAAZo/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=k0UOLbVAAZo",
  },
  {
    id: 46,
    title: "“She Broke Barriers in the 90s | A Gemologist’s 3rd-Gen Legacy",
    category: "Business",
    date: "Sep 29, 2025",
    duration: "27 min",
    image: "https://i.ytimg.com/vi/SvpY1DrUy6w/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=SvpY1DrUy6w",
  },
  {
    id: 47,
    title:
      "From Riding Royal Enfield in the 90s to Building Panna Brand  | Swapna’s Inspiring Journey”",
    category: "Business",
    date: "Sep 28, 2025",
    duration: "17 min",
    image: "https://i.ytimg.com/vi/ZA7kutSU2qc/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=ZA7kutSU2qc",
  },
  {
    id: 48,
    title: "“Empowering Women, Winning Crowns | Aastha Goyal’s Journey”",
    category: "Culture",
    date: "Sep 27, 2025",
    duration: "25 min",
    image: "https://i.ytimg.com/vi/j4gtbKY02Cc/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=j4gtbKY02Cc",
  },
  {
    id: 49,
    title:
      "Modeling Is NOT What You See on Instagram | Diets, Insecurities & Industry Connections EXPOSED",
    category: "Art",
    date: "Sep 26, 2025",
    duration: "35 min",
    image: "https://i.ytimg.com/vi/1ZrFOV3fCvI/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=1ZrFOV3fCvI",
  },
  {
    id: 50,
    title:
      "“Youngest Entrepreneur Who Left Medicine for Finance | Khushi Pinjwani”",
    category: "Business",
    date: "Sep 25, 2025",
    duration: "17 min",
    image: "https://i.ytimg.com/vi/TFuC86I6VcE/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=TFuC86I6VcE",
  },
  {
    id: 51,
    title:
      "“Tarot Reading: Myth or Reality? | Priyanka Jadwani on Healing & Inner Power”",
    category: "Spirituality",
    date: "Sep 24, 2025",
    duration: "27 min",
    image: "https://i.ytimg.com/vi/B9MK_N5aAxw/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=B9MK_N5aAxw",
  },
  {
    id: 52,
    title:
      "“Unheard Stories of Hindu Gods | Parvati Desai Reveals Her Journey”",
    category: "Spirituality",
    date: "Sep 23, 2025",
    duration: "29 min",
    image: "https://i.ytimg.com/vi/j0Q-8j1FFcQ/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=j0Q-8j1FFcQ",
  },
  {
    id: 53,
    title:
      "Resigned from CRPF… Became Sarpanch of Manhora | Rekha Ji’s Untold Struggle”",
    category: "Culture",
    date: "Sep 22, 2025",
    duration: "18 min",
    image: "https://i.ytimg.com/vi/B1qMYCzEyv4/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=B1qMYCzEyv4",
  },
  {
    id: 54,
    title:
      "“Modeling Beyond Glamour | Kshitij’s Take on Society, Struggles & Success”",
    category: "Art",
    date: "Sep 18, 2025",
    duration: "51 min",
    image: "https://i.ytimg.com/vi/QBojj9JxZ90/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=QBojj9JxZ90",
  },
  {
    id: 55,
    title: "Is Filmmaking Really This Hard? | Sanyam Jain Spills the Truth",
    category: "Art",
    date: "Sep 16, 2025",
    duration: "33 min",
    image: "https://i.ytimg.com/vi/eQ9ETzUWYbQ/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=eQ9ETzUWYbQ",
  },
  {
    id: 56,
    title:
      "Find Your Vibe | Uplifting Local Workshops & Events in Raipur | No Convenience Fee",
    category: "Culture",
    date: "Sep 14, 2025",
    duration: "30 min",
    image: "https://i.ytimg.com/vi/GTIFvbPE7Cw/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=GTIFvbPE7Cw",
  },
  {
    id: 57,
    title:
      "Cancer Explained: Dr. Jayesh Sharma on Prevention, Vaccination, Junk Food & Hidden Risks",
    category: "Health & Fitness",
    date: "Sep 12, 2025",
    duration: "33 min",
    image: "https://i.ytimg.com/vi/Pip36yXOXYA/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=Pip36yXOXYA",
  },
  {
    id: 58,
    title: "Every Photo Has a Backstory. Let’s Talk About It With HARSH GUPTA",
    category: "Art",
    date: "Sep 10, 2025",
    duration: "35 min",
    image: "https://i.ytimg.com/vi/DiYMKURTAdo/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=DiYMKURTAdo",
  },
  {
    id: 59,
    title:
      "Teacher's Day Special Podcast | How Covid Has Affected Learning Process Of Kids |",
    category: "Culture",
    date: "Sep 05, 2025",
    duration: "31 min",
    image: "https://i.ytimg.com/vi/jqyequjOja8/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=jqyequjOja8",
  },
  {
    id: 60,
    title:
      "Life at 140 kg vs 80 kg: Vishwajeet's Weight Loss & Spiritual Journey",
    category: "Health & Fitness",
    date: "Sep 01, 2025",
    duration: "1 hr 2 min",
    image: "https://i.ytimg.com/vi/jbA5Dbe7dJI/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=jbA5Dbe7dJI",
  },
  {
    id: 61,
    title:
      "Tourism in Chhattisgarh | Bhangarh: India’s Haunted Fortress | BHARGAV VYAS",
    category: "History",
    date: "Aug 30, 2025",
    duration: "28 min",
    image: "https://i.ytimg.com/vi/DETgSwK8hzo/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=DETgSwK8hzo",
  },
  {
    id: 62,
    title:
      "Multi-Sector Construction with Interiors, Vaastu Guidance & CCTV Safety : Prithvi developers",
    category: "Business",
    date: "Aug 28, 2025",
    duration: "25 min",
    image: "https://i.ytimg.com/vi/TgSmcVTIxn4/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=TgSmcVTIxn4",
  },
  {
    id: 63,
    title:
      "Why Bastar Dussehra Is 75 Days Long | Gems of CG ft. Travel Influencer Akash sahu @akashkasafar",
    category: "History",
    date: "Aug 25, 2025",
    duration: "45 min",
    image: "https://i.ytimg.com/vi/-crmtxf2WQM/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=-crmtxf2WQM",
  },
  {
    id: 64,
    title:
      "Why the Hare Krishna movement started from the US despite Krishna being born in India #raipurpodcast",
    category: "Spirituality",
    date: "Aug 21, 2025",
    duration: "46 min",
    image: "https://i.ytimg.com/vi/dgHbMnMZMNo/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=dgHbMnMZMNo",
  },
  {
    id: 65,
    title: "Eye Care Secrets They Don't Tell You: DR. TANMAY GUPTA.",
    category: "Health & Fitness",
    date: "Aug 18, 2025",
    duration: "38 min",
    image: "https://i.ytimg.com/vi/M5_9_erYpJs/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=M5_9_erYpJs",
  },
];
