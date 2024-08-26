import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircleCheckBig, GraduationCap, Play } from "lucide-react";
import Accordion from "./Accordion";
import { EDUCATION, CERITIFCATES } from "@/constants/data";
import LanguagesProgress from "./LanguagesProgress";

const About = () => {
  return (
    <section className="max-padd-container py-16 xl:py-28">
      {/* title */}
      <div className="pb-10 text-center xl:text-start font-bold">
        <span className="text-primary uppercase">Meet Toby (Thang) Tran</span>
        <h3 className="h3 font-extrabold">About me</h3>
      </div>
      {/* container */}
      <div className="flex flex-col xl:flex-row gap-16">
        {/* left */}
        <div className="hidden xl:flexCenter flex-1 relative">
          <Image
            src={"/about.jpg"}
            alt="aboutme"
            height={444}
            width={666}
            className="rounded-lg"
          />
        </div>
        {/* right */}
        <div className="flex-1 mx-auto xl:mx-0">
          <Tabs defaultValue="intro">
            <TabsList className="w-full grid grid-cols-3 max-w-[511px] border dark:border-secondary mx-auto xl:mx-0">
              <TabsTrigger value="intro">About Me</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
            </TabsList>
            {/* tabs content */}
            <div className="pt-12 xl:pt-3 pl-3">
              <TabsContent value="intro">
                <h4 className="bold-20 uppercase pb-1">
                  Hello! My Name Is Toby (Thang) Tran
                </h4>
                <p className="max-w-md">
                  Fullstack software engineer with 10+ years of experience in
                  FrontEnd, BackEnd, Cloud Infrastructure as code, and automated
                  E2E tests.
                </p>
                {/* accordion */}
                <Accordion sliceCount={(0, 3)} />
              </TabsContent>
              {/* education */}
              <TabsContent value="education">
                <div className="flex flex-col gap-4">
                  <h4 className="bold-20 uppercase">
                    Education & Certificates
                  </h4>
                  {EDUCATION.map((item, i) => (
                    <div key={i} className="flex gap-4 medium-15">
                      <GraduationCap color="#d11a51" strokeWidth={1.25} />
                      <div>{item.title}</div>-<div>{item.year}</div>
                    </div>
                  ))}
                </div>
                <hr className="my-4 w-10/12" />
                <div className="flex flex-col gap-4 mt-1.5">
                  {CERITIFCATES.map((item, i) => (
                    <div key={i} className="flex gap-4 medium-15">
                      <CircleCheckBig color="#d11a51" strokeWidth={1.25} />
                      <div>{item.title}</div>-<div>{item.year}</div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              {/* skills */}
              <TabsContent value="skills">
                <div className="flex flex-col gap-4">
                  <LanguagesProgress />
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default About;
