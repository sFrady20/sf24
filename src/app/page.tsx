import { ShaderCard } from "@/components/shader";
import { Button } from "@/components/ui/button";
import frag3 from "@/shaders/genuary/2022/3.frag.glsl";
import frag4 from "@/shaders/genuary/2022/4.frag.glsl";
import frag5 from "@/shaders/genuary/2022/5.frag.glsl";
import Link from "next/link";
import Frady from "./frady.svg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/utils/cn";
import {
  HoverCard,
  HoverCardContent,
  HoverCardInner,
  HoverCardTrigger,
} from "@/components/hover-card";
import { categories } from "@/data/projects";

export default async function () {
  return (
    <>
      <section className="mt-[60px] md:mt-[100px] flex flex-col md:gap-0 py-[60px] md:py-[80px]">
        <div className="container @container">
          <Frady className={"w-full h-[20cqw]"} />
        </div>
      </section>

      <section className="md:pb-[60px]">
        <div className="container md:max-w-[600px]">
          <p className="text-left text-xs md:text-sm leading-loose">
            I am a creative full-stack developer with over 9 years of
            experience. I specialize in building elegant solutions and I'm
            constantly crafting new features with a focus on simplicity and
            scalability.
          </p>
        </div>
      </section>

      {categories
        .flatMap((x, i) => [
          <section key={i} className="py-[60px]" id={x.id}>
            <div className="max-lg:container md:px-14 flex flex-col lg:grid grid-cols-12 gap-10">
              <div className="col-span-5 xl:col-span-4 xl:col-start-2 row-start-1">
                <div className="sticky top-[160px] flex flex-col gap-6">
                  <h3 className="text-xl">{x.title}</h3>
                  <p className="text-sm md:text-md leading-loose opacity-80">
                    {x.intro}
                  </p>
                </div>
              </div>
              <div className="max-xl:col-span-6 col-span-5 max-xl:col-start-7 col-start-7 row-start-1">
                <Accordion type="single" collapsible value="">
                  {x.projects.map((x, i) => (
                    <AccordionItem key={i} value={x.id}>
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <AccordionTrigger className="text-left justify-start flex-1 flex flex-row gap-6 hover:bg-foreground/5">
                            <div className="flex flex-row items-center opacity-60 text-xs">
                              {(i + 1)
                                .toString()
                                .padStart(2, "0")
                                .split("")
                                .map((x, i) => (
                                  <div key={i}>{x}</div>
                                ))}
                            </div>
                            <div className="w-[40px]">{x.year}</div>
                            <div className="col-span-2 flex-1 text-sm sm:text-md">
                              {x.label}
                            </div>
                            <div className="text-right flex flex-row items-center">
                              {x.links?.map((x, i) => (
                                <Button
                                  key={i}
                                  variant={"ghost"}
                                  size={"icon"}
                                  asChild
                                >
                                  <Link href={x.link} target="_blank">
                                    <i className={cn(x.icon)} />
                                  </Link>
                                </Button>
                              ))}
                            </div>
                          </AccordionTrigger>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-[400px] h-[400px] overflow-hidden hidden xl:block z-[10] left-[40%] top-1/2 ">
                          <HoverCardInner
                            className="absolute left-0 top-0 w-full h-full"
                            variants={{
                              initial: { translateX: "-100%", opacity: 0 },
                              animate: {
                                translateX: 0,
                                opacity: 1,
                                transition: { ease: "easeOut" },
                              },
                              exit: {
                                translateX: "100%",
                                opacity: 0,
                                transition: { ease: "easeIn" },
                              },
                            }}
                          >
                            <img
                              src={`/projects/${x.id}.webp`}
                              width={400}
                              height={400}
                              alt={`${x.label}`}
                              className="absolute left-0 top-0 w-full h-full z-[1] object-cover"
                            />
                            {(x as any).hasVideo && (
                              <video
                                muted
                                autoPlay
                                playsInline
                                loop
                                src={`/projects/${x.id}.webm`}
                                className="absolute left-0 top-0 w-full h-full z-[2] object-cover"
                              />
                            )}
                          </HoverCardInner>
                        </HoverCardContent>
                      </HoverCard>
                      <AccordionContent className="h-[500px]"></AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </section>,
          <div className="container w-full h-[1px] bg-foreground/10" />,
        ])
        .slice(0, -1)}

      <section className="py-[60px] lg:py-0 flex flex-col gap-2" id="shaders">
        <div className="max-lg:sm:container flex flex-col lg:flex-col-reverse gap-4">
          <div className="grid grid-cols-3">
            <ShaderCard
              className="col-span-3 lg:col-span-1"
              autoplay
              frag={frag3}
              title={"Spacetime"}
              subtitle={"Genuary 2022 - Day 3"}
              shaderPath="genuary/2022/3"
            />
            <ShaderCard
              className="col-span-3 lg:col-span-1"
              autoplay
              frag={frag4}
              title={"The Next Fidenza"}
              subtitle={"Genuary 2022 - Day 4"}
              shaderPath="genuary/2022/4"
            />
            <ShaderCard
              className="col-span-3 lg:col-span-1"
              autoplay
              frag={frag5}
              title={"Destroy a square"}
              subtitle={"Genuary 2022 - Day 5"}
              shaderPath="genuary/2022/5"
            />
          </div>
          <div className="flex flex-row items-center justify-end lg:px-10">
            <Button variant={"ghost"} className="gap-1" asChild>
              <Link href={"/shaders"}>
                <div>More Shaders</div>
                <i className="icon-[ri--arrow-right-up-line] text-lg" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
