import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export const categories = [
  {
    id: "startups",
    title: "Startups",
    intro: `Startups showcase the process of turning concepts into concrete
      results. Here, you'll see projects where my skills and those of my
      peers come together to build practical, impactful solutions.`,
    projects: [
      {
        id: "griddy",
        label: "Griddy.GG",
        year: "2024",
        keywords: [
          "React",
          "React-Native",
          "Typescript",
          "Next.js",
          "Supabase",
        ],
        links: [
          {
            link: "https://griddy.gg/",
            icon: "icon-[ri--external-link-fill]",
          },
        ],
      },
      {
        id: "poolah",
        label: "Poolah",
        year: "2023",
        keywords: [
          "React",
          "React-Native",
          "Typescript",
          "Next.js",
          "Supabase",
        ],
      },
      {
        id: "wanderseat",
        label: "WanderSeat",
        year: "2021",
        keywords: [
          "React",
          "React-Native",
          "Typescript",
          "Next.js",
          "Supabase",
        ],
        links: [
          {
            link: "https://wanderseat.com/",
            icon: "icon-[ri--external-link-fill]",
          },
        ],
      },
    ],
  },
  {
    id: "solo",
    title: "Solopreneur Journey",
    intro: `Solopreneurship is the canvas for my personal and professional
      ethos. This space is dedicated to projects that are solely mine,
      from initial concept to final execution.`,
    projects: [
      {
        id: "landinggenius",
        label: "Landing Genius",
        year: "2024",
        keywords: ["OpenAI", "React", "Typescript", "Next.js", "Supabase"],
        links: [
          {
            link: "https://landinggeni.us/",
            icon: "icon-[ri--external-link-fill]",
          },
        ],
      },
    ],
  },
  {
    id: "oss",
    title: "Open-source Software",
    intro: `Open-source is where I'm laying the foundations for future collaboration. This section features projects in their initial phases, ripe for community input and collective development.`,
    projects: [
      {
        id: "earthling-ui",
        label: "Earthling UI",
        year: "2024",
        keywords: ["Typescript"],
        links: [
          {
            link: "https://github.com/sFrady20/earthling-ui",
            icon: "icon-[ri--github-fill]",
          },
        ],
      },
      {
        id: "brainwave",
        label: "Brainwave Broadcasting",
        year: "2023",
        keywords: ["Python", "OpenAI", "Typescript", "Next.js"],
        links: [
          {
            link: "https://brainwavebroadcasting.tv/",
            icon: "icon-[ri--external-link-fill]",
          },
          // {
          //   link: "https://www.youtube.com/@BrainwaveBroadcasting",
          //   icon: "icon-[ri--youtube-fill]",
          // },
        ],
      },
      {
        id: "easy-mesh-gradient",
        label: "Easy Mesh Gradient",
        year: "2023",
        keywords: ["Typescript"],
        links: [
          {
            link: "https://easy-mesh-gradient.stevenfrady.com/",
            icon: "icon-[ri--external-link-fill]",
          },
          // {
          //   link: "https://github.com/sFrady20/easy-mesh-gradient",
          //   icon: "icon-[ri--github-fill]",
          // },
        ],
      },
      {
        id: "labctrl",
        label: "Lab Controller",
        year: "2022",
        keywords: ["React", "Typescript", "Electron", "Vite"],
        links: [
          {
            link: "https://github.com/sFrady20/labctrl",
            icon: "icon-[ri--github-fill]",
          },
        ],
      },
    ],
  },
  {
    id: "freelance",
    title: "Freelance",
    intro: (
      <>
        <p>
          In the freelance world, versatility is key. Here, you'll find projects
          that showcase my ability to meet diverse client needs with precision
          and creativity.
        </p>
        <div className="mt-10 flex flex-row items-center justify-start gap-3">
          <Badge className="flex flex-row items-center gap-4">
            <div className="shadow-xl shadow-[#00FF00] w-2 h-2 bg-[#00FF00] rounded-full drop-shadow-[0_0_5px_rgba(0,255,0,1)]" />
            <div>Open for work</div>
          </Badge>
          <Link
            className="underline"
            href="mailto:sfrady20@gmail.com"
            target="_blank"
          >
            Email Me
          </Link>
        </div>
      </>
    ),
    projects: [
      {
        id: "homerunderby",
        label: "Capital One Home Run Derby",
        year: "2023",
        hasVideo: true,
        keywords: ["Unity", "C#"],
      },
      {
        id: "meteor-game",
        label: "Meteor Game",
        year: "2023",
        hasVideo: true,
        keywords: ["Unity", "C#"],
      },
      {
        id: "coke-juggle",
        label: "Coca-Cola Kick Ups",
        year: "2023",
        hasVideo: true,
        keywords: ["React", "Typescript", "Vite", "Electron"],
      },
      {
        id: "road-to-greatness",
        label: "Road to Greatness",
        year: "2022",
        hasVideo: true,
        keywords: ["Unity", "C#"],
      },
      {
        id: "juggle",
        label: "Verizon Kick Ups",
        year: "2022",
        hasVideo: true,
        keywords: ["React", "Typescript", "Vite", "Electron", "Unity", "C#"],
      },
      {
        id: "abundant",
        label: "Abundant Staffing Portal",
        year: "2022",
        keywords: ["React", "Typescript", "Next.js", "Prisma"],
      },
      {
        id: "drrandyross",
        label: "Dr. Randy Ross",
        year: "2021",
        keywords: ["React", "Typescript", "Next.js"],
        links: [
          {
            link: "https://drrandyross.com",
            icon: "icon-[ri--external-link-fill]",
          },
        ],
      },
      {
        id: "drexls",
        label: "Drexls",
        year: "2021",
        keywords: ["Roku", "Android", "Kotlin", "PHP"],
        links: [
          {
            link: "https://www.drexls.com/",
            icon: "icon-[ri--external-link-fill]",
          },
        ],
      },
      {
        id: "phonetopia",
        label: "Phonetopia Keyboard Game",
        year: "2020",
        keywords: ["Unity", "C#"],
        links: [
          {
            link: "https://www.madwell.com/project/phonetopia",
            icon: "icon-[ri--external-link-fill]",
          },
        ],
      },
      {
        id: "thedownstairsgallery",
        label: "The Downstairs Gallery",
        year: "2012",
        keywords: ["PHP", "Wordpress"],
        links: [
          {
            link: "https://thedownstairsgallery.com/",
            icon: "icon-[ri--external-link-fill]",
          },
        ],
      },
    ],
  },
];
