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
      {/* title */}
      <div className="pb-12 text-center sm:text-start sm:ml-6">
        <span className="text-primary uppercase font-bold">
          Personal Projects
        </span>
        <h3 className="h3 font-extrabold flex flex-row justify-center sm:justify-start gap-4 items-center">
          <Link
            href="/portfolio"
            className="hover:-translate-y-1 hover:underline hover:text-sky-500 transition-all duration-500"
          >
            My Portfolios
          </Link>
          <GitHubLink fullUrl={SOCIALS_LINKS.Github} />
        </h3>
      </div>
      {/* container */}
      <div className="flex flex-col xl:flex-row gap-6">
        {/* Projects */}
        <div className="mx-auto max-w-[95%] xl:max-w-[100%]">
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
              1600: {
                slidesPerView: 3,
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
