import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { BiSolidLike } from "react-icons/bi";
import { FaEye } from "react-icons/fa6";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { Badge } from "./ui/badge";
import { GitHubLink } from "./SocialIcons";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { Category } from "@/constants/data";

const PorfolioTooltips = () => {
  return (
    <>
      {/* Add ReactTooltip components */}
      <ReactTooltip id={Category.Backend.id} place="top" effect="solid" />
      <ReactTooltip id={Category.Frontend.id} place="top" effect="solid" />
      <ReactTooltip id={Category.AWS.id} place="top" effect="solid" />
      <ReactTooltip id={Category.ML.id} place="top" effect="solid" />
      <ReactTooltip id={Category.GenAI.id} place="top" effect="solid" />
      <ReactTooltip id={Category.ANN.id} place="top" effect="solid" />
      <ReactTooltip id={Category.NLP.id} place="top" effect="solid" />
    </>
  );
};

const PfolioCard = ({ url, title, categories, des, git, link }) => {
  return (
    <Card className="relative group rounded-xl overflow-hidden">
      <PorfolioTooltips />
      <CardHeader>
        <div className="flex flex-row gap-3 justify-start">
          {categories.map((category) => {
            return (
              <Badge
                key={category.id}
                className="mb-3 capitalize"
                data-tooltip-id={category.id} // Set the id for the tooltip
                data-tooltip-content={category.content}
              >
                {category.id}
              </Badge>
            );
          })}
        </div>
        <div className="rounded-lg !inline-flex relative overflow-hidden">
          <Image
            src={url}
            alt=""
            height={299}
            width={444}
            className="rounded-lg"
          />
          {/* overlay */}
          <div className="absolute top-0 left-0 inset-0 bg-[#fdf3fb] dark:bg-background opacity-0 group-hover:opacity-100 transition-all duration-200 rounded-lg overflow-hidden"></div>
          {/* icons */}
          <div className="flexCenter gap-x-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
            <Link
              href={"/portfolio"}
              className="flexCenter gap-x-2 rounded-md px-1 ring-1 ring-primary text-primary"
            >
              <MdOutlineZoomOutMap />
            </Link>
            <Link
              href={"/"}
              className="flexCenter gap-x-2 rounded-md px-1 ring-1 ring-primary text-primary"
            >
              <BiSolidLike />
              <p>112</p>
            </Link>
            <Link
              href={"/"}
              className="flexCenter gap-x-2 rounded-md px-1 ring-1 ring-primary text-primary"
            >
              <FaEye />
              <p>222</p>
            </Link>
          </div>
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
    </Card>
  );
};

export default PfolioCard;
