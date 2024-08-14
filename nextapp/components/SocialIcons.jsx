import { SOCIALS_LINKS } from "@/constants/data";
import Link from "next/link";
// import icons
import {
  RiFacebookBoxFill,
  RiGithubFill,
  RiInstagramFill,
  RiLinkedinFill,
  RiTwitterFill,
} from "react-icons/ri";

const SocialIcons = () => {
  return (
    <div className="flex gap-6 lg:gap-6 pr-4">
      <Link
        href={SOCIALS_LINKS.Instagram}
        className="text-[#e5642d] text-2xl hover:-translate-y-1 transition-all duration-500"
      >
        <RiInstagramFill />
      </Link>
      <Link
        href={SOCIALS_LINKS.Twitter}
        className="text-[#ff2e63] text-2xl hover:-translate-y-1 transition-all duration-500"
      >
        <RiTwitterFill />
      </Link>
      <Link
        href={SOCIALS_LINKS.Linkedin}
        className="text-[#08d9d6] text-2xl hover:-translate-y-1 transition-all duration-500"
      >
        <RiLinkedinFill />
      </Link>
      <Link
        href={SOCIALS_LINKS.Github}
        className="text-[#a026e7] text-2xl hover:-translate-y-1 transition-all duration-500"
      >
        <RiGithubFill />
      </Link>
      <Link
        href={SOCIALS_LINKS.Facebook}
        className="text-[#5272f2] text-2xl hover:-translate-y-1 transition-all duration-500"
      >
        <RiFacebookBoxFill />
      </Link>
    </div>
  );
};

export default SocialIcons;
