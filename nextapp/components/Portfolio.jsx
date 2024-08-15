"use client";
// swiper
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import PfolioCard from "./PfolioCard";
import { WORKDATA } from "@/constants/data";

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
          <h3 className="h3 font-extrabold">My Portfolios</h3>
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
            className="h-[422px] sm:h-[477px] mt-10"
          >
            {WORKDATA.map((project, i) => {
              if (project.category === "fullStack") {
                return (
                  <SwiperSlide key={i} className="flexCenter">
                    <PfolioCard
                      url={project.url}
                      title={project.title}
                      category={project.category}
                      des={project.des}
                    />
                  </SwiperSlide>
                );
              }
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Work;
