import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { GitHubLink } from "./SocialIcons";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { Category } from "@/constants/data";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useState } from "react";
import MediaOverlay, {
  isVideoItem,
  getDisplaySrc,
  VideoThumbnail,
} from "./MediaOverlay";

const PorfolioTooltips = () => {
  return (
    <>
      {/* Add ReactTooltip components */}
      <ReactTooltip id={Category.Backend.id} place="top" effect="solid" />
      <ReactTooltip id={Category.Frontend.id} place="top" effect="solid" />
      <ReactTooltip id={Category.AWS.id} place="top" effect="solid" />
      <ReactTooltip id={Category.ML.id} place="top" effect="solid" />
      <ReactTooltip id={Category.AgenticAI.id} place="top" effect="solid" />
      <ReactTooltip id={Category.ANN.id} place="top" effect="solid" />
      <ReactTooltip id={Category.NLP.id} place="top" effect="solid" />
    </>
  );
};

const PfolioCard = ({ media, title, categories, des, git, link }) => {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [overlayIndex, setOverlayIndex] = useState(0);

  const openOverlay = (index) => {
    setOverlayIndex(index);
    setOverlayOpen(true);
  };

  return (
    <Card className="relative group rounded-xl overflow-hidden">
      <PorfolioTooltips />
      <CardHeader className="px-4 pt-6 pb-2">
        <div className="flex flex-row gap-3 justify-start">
          {categories.map((category) => {
            return (
              <Badge
                key={category.id}
                className="mb-3 capitalize"
                data-tooltip-id={category.id}
                data-tooltip-content={category.content}
              >
                {category.id}
              </Badge>
            );
          })}
        </div>
        <div className="rounded-lg !inline-flex relative overflow-hidden group">
          <Swiper
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className="rounded-lg"
          >
            {media?.map((item, index) => {
              const isVideo = isVideoItem(item);
              return (
                <SwiperSlide key={index}>
                  {isVideo ? (
                    <VideoThumbnail
                      item={item}
                      width={444}
                      height={299}
                      onClick={() => openOverlay(index)}
                    />
                  ) : (
                    <div
                      className="cursor-pointer"
                      onClick={() => openOverlay(index)}
                    >
                      <Image
                        src={item}
                        alt=""
                        height={299}
                        width={444}
                        className="rounded-lg"
                      />
                    </div>
                  )}
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </CardHeader>
      {/* info */}
      <CardContent>
        <CardTitle className="mb-2 flex gap-3 lg:gap-4 items-center -mt-1">
          <Link
            href={link}
            className="text-blue-500 hover:-translate-y-1 hover:underline hover:text-sky-300 transition-all duration-500"
          >
            {title}
          </Link>
          <GitHubLink fullUrl={git} />
        </CardTitle>
        <CardDescription>{des}</CardDescription>
      </CardContent>

      {/* Overlay modal */}
      {overlayOpen && (
        <MediaOverlay
          media={media}
          initialIndex={overlayIndex}
          onClose={() => setOverlayOpen(false)}
        />
      )}
    </Card>
  );
};

export default PfolioCard;
