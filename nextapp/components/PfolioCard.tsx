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


const PfolioCard = ({ media, title, categories, des, git, link }: {
  media?: any[];
  title: string;
  categories: { id: string; content: string }[];
  des: string;
  git: string;
  link: string;
}) => {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [overlayIndex, setOverlayIndex] = useState(0);

  const openOverlay = (index) => {
    setOverlayIndex(index);
    setOverlayOpen(true);
  };

  return (
    <Card className="relative group rounded-xl overflow-hidden">
      <CardHeader className="p-4 pb-0 space-y-0">
        <div className="flex flex-wrap gap-3 items-center justify-start mb-4">
          {categories.map((category) => {
            return (
              <Badge
                key={category.id}
                className="px-3 py-1 text-sm capitalize cursor-default"
              >
                {category.id}
              </Badge>
            );
          })}
        </div>
        <div className="rounded-lg relative overflow-hidden group w-full aspect-[444/299]">
          <Swiper
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className="w-full h-full"
          >
            {media?.map((item, index) => {
              const isVideo = isVideoItem(item);
              return (
                <SwiperSlide key={index}>
                  {isVideo ? (
                    <VideoThumbnail
                      item={item}
                      fill
                      className="w-full h-full"
                      onClick={() => openOverlay(index)}
                    />
                  ) : (
                    <div
                      className="cursor-pointer w-full h-full relative"
                      onClick={() => openOverlay(index)}
                    >
                      <Image
                        src={item}
                        alt=""
                        fill
                        className="rounded-lg object-cover"
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
      <CardContent className="p-4 pt-4">
        <CardTitle className="mb-2 flex gap-3 lg:gap-4 items-center text-lg">
          <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:-translate-y-1 hover:underline hover:text-sky-300 transition-all duration-500 truncate"
          >
            {title}
          </Link>
          <GitHubLink fullUrl={git} className="flex-shrink-0" />
        </CardTitle>
        <CardDescription className="line-clamp-3 h-[60px] text-sm">{des}</CardDescription>
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
