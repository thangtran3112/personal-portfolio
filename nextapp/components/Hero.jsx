import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { MoveRight } from "lucide-react";
import SocialIcons from "./SocialIcons";
import Badge from "./Badge";
import { FaAws, FaDocker, FaReact } from "react-icons/fa6";
import {
  SiNextdotjs,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiAmazondynamodb,
  SiKubernetes,
  SiAwslambda,
  SiNestjs,
} from "react-icons/si";
import { BsFiletypeJava } from "react-icons/bs";
import { SiSpring, SiSpringboot } from "react-icons/si";

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
            showcasing innovative web development projects crafted with
            precision and passion for digital excellence.
          </p>
          <div className="mt-6 flex gap-4">
            <Button className="gap-x-2 shadow-xl">
              Hire me
              <MoveRight size={20} />
            </Button>
            <Button className="shadow-xl bg-black hover:bg-[#222] text-white">
              Download CV
            </Button>
          </div>
          <div className="mt-20">
            <SocialIcons />
          </div>
        </div>
        {/* right */}
        <div className="flex flex-1 relative z-10 top-12">
          <div className="">
            <Image
              src={"/bg.jpg"}
              height={488}
              width={488}
              priority
              alt=""
              className="drop-shadow-sm"
            />
          </div>
          <div className="hidden xl:flex">
            <Badge
              containerStyles={"absolute top-[58%] -left-[5%]"}
              icon={<FaAws />}
            />
            <Badge
              containerStyles={"absolute top-[70%] -left-[2%]"}
              icon={<SiAwslambda />}
            />
            <Badge
              containerStyles={"absolute -top-5 right-[38%]"}
              icon={<FaReact />}
            />
            <Badge
              containerStyles={"absolute -top-8 right-[50%]"}
              icon={<SiNestjs />}
            />
            <Badge
              containerStyles={"absolute -top-5 right-[62%]"}
              icon={<SiNextdotjs />}
            />
            <Badge
              containerStyles={"absolute top-[14%] left-0"}
              icon={<SiMongodb />}
            />
            <Badge
              containerStyles={"absolute top-[26%] -left-[3%]"}
              icon={<SiAmazondynamodb />}
            />
            <Badge
              containerStyles={"absolute bottom-[32%] xl:left-[460px]"}
              icon={<FaDocker />}
            />
            <Badge
              containerStyles={"absolute bottom-[20%] xl:left-[440px]"}
              icon={<SiKubernetes />}
            />
            <Badge
              containerStyles={"absolute top-[14%] xl:left-[430px]"}
              icon={<SiPostgresql />}
            />
            <Badge
              containerStyles={"absolute top-[26%] xl:left-[450px]"}
              icon={<SiMysql />}
            />
            <Badge
              containerStyles={"absolute -bottom-5 right-[62%]"}
              icon={<BsFiletypeJava />}
            />
            <Badge
              containerStyles={"absolute -bottom-5 right-[38%]"}
              icon={<SiSpring />}
            />
            <Badge
              containerStyles={"absolute -bottom-8 right-[50%]"}
              icon={<SiSpringboot />}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
