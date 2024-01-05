import { categories } from "@/data/projects";

const project = categories
  .find((x) => x.id === "startups")!
  .projects.find((x) => x.id === "griddy")!;

export default async function () {
  return (
    <div className="">
      <div className="p-6 flex flex-col gap-4">
        <div className="h-10 flex flex-row items-center text-lg">
          {project.label}
        </div>
        <p className="leading-relaxed">
          Griddy.gg is a local sports platform crafted by a focused team of
          four. Set to launch in the DMV area, it's designed to streamline the
          sports experience with three key features: finding local games,
          managing teams, and facilitating team communication. Our platform,
          underpinned by the tagline "Discover nearby games, join sports
          communities, and manage your teams. Spend less time planning and more
          time playing," aims to simplify the organizational aspect of sports,
          allowing players to focus more on the game itself.
        </p>
        <div className="grid grid-cols-4 gap-4">
          <div className="flex flex-col gap-2">
            <div>Platform</div>
            <div>Web, Mobile</div>
          </div>
          <div className="flex flex-col gap-2">
            <div>Frameworks</div>
            <div>React, Next.JS</div>
          </div>
          <div className="flex flex-col gap-2">
            <div>Languages</div>
            <div>Typescript</div>
          </div>
        </div>
      </div>
    </div>
  );
}
