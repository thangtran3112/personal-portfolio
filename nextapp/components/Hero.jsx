"use client";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { MoveRight } from "lucide-react";
import SocialIcons from "./SocialIcons";
import { RESUME } from "@/constants/data";
import { download } from "@/lib/utils";
import Link from "next/link";

const downloadHandler = (reactMouseEvent) => {
  reactMouseEvent.preventDefault();

  download(RESUME.downloadable, RESUME.title);
};

const Hero = () => {
  return (
    <section className="max-padd-container bg-hero bg-no-repeat bg-center bg-cover py-20 bg-[#fdf3fb] dark:bg-transparent">
      <div className="flexCenter gap-24 flex-col xl:flex-row ">
        {/* left */}
        <div className="flex flex-1 flex-col pt-12 xl:pt-32">
          <h1 className="h1 !font-extrabold">
            From Backend to Frontend, No SQL to SQL, and infrastructure as code.
          </h1>
          <p>
            Explore my portfolio where creativity and functionality converge,
            showcasing clean web development projects crafted with precision and
            scalable modern backends on various infrastructure setups.
          </p>
          <div className="mt-6 flex gap-4">
            <Button className="gap-x-2 shadow-xl" asChild>
              <Link href="/contact">
                Connect me
                <MoveRight size={20} />
              </Link>
              {/* <a href={SOCIALS_LINKS.Linkedin}>
                Connect me
                <MoveRight size={20} />
              </a> */}
            </Button>
            {/* <Button
              className="shadow-xl bg-black hover:bg-[#222] text-white"
              onClick={downloadHandler}
            >
              Download CV
            </Button> */}
            <Button
              className="shadow-xl bg-black hover:bg-[#222] text-white"
              asChild
            >
              <a href={RESUME.googleDrive}>View CV</a>
            </Button>
          </div>
          <div className="mt-20">
            <SocialIcons />
          </div>
        </div>
        {/* right */}
        <div className="flex flex-1 relative z-10 top-12">
          <Image
            src={"/bg.jpg"}
            height={488}
            width={488}
            priority
            alt=""
            className="drop-shadow-sm"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
