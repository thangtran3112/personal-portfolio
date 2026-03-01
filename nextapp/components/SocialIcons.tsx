import { SOCIALS_LINKS } from "@/constants/data";
import Link from "next/link";
import { cn } from "@/lib/utils";
// import icons
import {
  RiFacebookBoxFill,
  RiGithubFill,
  RiInstagramFill,
  RiLinkedinFill,
  RiTwitterFill,
} from "react-icons/ri";

export const GitHubLink = ({ fullUrl, className }: { fullUrl: string, className?: string }) => {
  return (
    <Link
      href={fullUrl}
      target="_blank" rel="noopener noreferrer"
      className={cn("text-[#a026e7] text-2xl hover:-translate-y-1 transition-all duration-500", className)}
    >
      <RiGithubFill />
    </Link>
  );
};

const SocialIcons = () => {
  return (
    <div className="flex gap-6 lg:gap-6 pr-4">
      <Link
        href={SOCIALS_LINKS.Instagram}
        target="_blank" rel="noopener noreferrer"
        className="text-[#e5642d] text-2xl hover:-translate-y-1 transition-all duration-500"
      >
        <RiInstagramFill />
      </Link>
      <Link
        href={SOCIALS_LINKS.Twitter}
        target="_blank" rel="noopener noreferrer"
        className="text-[#ff2e63] text-2xl hover:-translate-y-1 transition-all duration-500"
      >
        <RiTwitterFill />
      </Link>
      <Link
        href={SOCIALS_LINKS.Linkedin}
        target="_blank" rel="noopener noreferrer"
        className="text-[#08d9d6] text-2xl hover:-translate-y-1 transition-all duration-500"
      >
        <RiLinkedinFill />
      </Link>
      <GitHubLink fullUrl={SOCIALS_LINKS.Github} />
      <Link
        href={SOCIALS_LINKS.Facebook}
        target="_blank" rel="noopener noreferrer"
        className="text-[#5272f2] text-2xl hover:-translate-y-1 transition-all duration-500"
      >
        <RiFacebookBoxFill />
      </Link>
    </div>
  );
};

export default SocialIcons;
