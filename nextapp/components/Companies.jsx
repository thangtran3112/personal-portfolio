"use client";
// swiper
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { TESTIMONIAL } from "@/constants/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";

const Companies = () => {
  return (
    <section className="max-padd-container py-16 xl:py-28 text-center xl:text-start">
      {/* container */}
      <div className="flex flex-col xl:flex-row gap-16">
        {/* left */}
        <div className="flex flex-col max-w-full">
          {/* title */}
          <div className="flex flex-col xl:justify-center">
            <span className="text-primary uppercase font-bold">
              Working Experiences
            </span>
            <h3 className="h3 font-extrabold">Companies That I Worked At</h3>
          </div>
          {/* Projects */}
          <div className="mx-auto max-w-[70%] xl:max-w-full">
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
                1280: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="h-[399px] mt-10"
            >
              {TESTIMONIAL.map((testimonial) => (
                <SwiperSlide key={testimonial.desc}>
                  <TestimonialItem
                    title={testimonial.title}
                    URL={testimonial.URL}
                    desc={testimonial.desc}
                    profession={testimonial.profession}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialItem = ({ desc, title, profession, URL }) => {
  return (
    <Card className="my-8 rounded-md z-10 h-[70%]">
      <CardHeader className="pb-2 flexCenter xl:items-start">
        <Image
          src={URL}
          alt="user"
          height={77}
          width={77}
          className="rounded-full mb-4 z-20"
        />
      </CardHeader>
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <p className="mb-4">{profession}</p>
        <span className="absolute top-0 right-4 z-10 opacity-50 dark:opacity-20">
          <Image src={"/sparkle.svg"} alt="" height={62} width={62} />
        </span>
        <CardDescription className="line-clamp-4">"{desc}"</CardDescription>
      </CardContent>
    </Card>
  );
};

export default Companies;
