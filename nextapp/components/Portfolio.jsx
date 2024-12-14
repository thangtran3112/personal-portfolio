"use client";
// swiper
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import PfolioCard from "./PfolioCard";
import { WORKDATA } from "@/constants/data";
import { SOCIALS_LINKS } from "@/constants/data";
import { GitHubLink } from "./SocialIcons";
import Link from "next/link";

const Work = () => {
  return (
    <section className="max-padd-container py-16 xl:py-28 text-center xl:text-start bg-[#fdf3fb] dark:bg-transparent">
      {/* container */}
      <div className="flex flex-col xl:flex-row gap-6">
        {/* title */}
        <div className="flex flex-col xl:justify-center">
          <span className="text-primary uppercase font-bold">
            Personal Projects
          </span>
          <h3 className="h3 font-extrabold flexCenter gap-3 lg:gap-4 pr-2">
            <Link
              href="/portfolio"
              className="hover:-translate-y-1 hover:underline hover:text-sky-500 transition-all duration-500"
            >
              My Portfolios
            </Link>
            <GitHubLink fullUrl={SOCIALS_LINKS.Github} />
          </h3>
        </div>
        {/* Projects */}
        <div className="mx-auto max-w-[70%] md:max-w-full xl:max-w-[70%]">
          <Swiper
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 30,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="h-[450px] sm:h-[500px] mt-10"
          >
            {WORKDATA.map((project, i) => {
              return (
                <SwiperSlide key={i} className="flexCenter">
                  <PfolioCard
                    url={project.url}
                    title={project.title}
                    categories={project.categories}
                    des={project.des}
                    git={project.git}
                    link={project.link}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Work;
