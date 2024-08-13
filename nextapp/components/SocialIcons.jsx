import Link from "next/link"
// import icons
import {RiDribbbleFill, RiGithubFill, RiInstagramFill, RiLinkedinFill, RiTwitterFill, RiYoutubeFill} from 'react-icons/ri'

const SocialIcons = () => {
  return (
    <div className="flex gap-6 lg:gap-6 pr-4">
        <Link href={''} className="text-[#08d9d6] text-2xl hover:-translate-y-1 transition-all duration-500"><RiYoutubeFill /></Link>
        <Link href={''} className="text-[#f08a5d] text-2xl hover:-translate-y-1 transition-all duration-500"><RiInstagramFill /></Link>
        <Link href={''} className="text-[#ff2e63] text-2xl hover:-translate-y-1 transition-all duration-500"><RiTwitterFill /></Link>
        <Link href={''} className="text-[#eaeaea] text-2xl hover:-translate-y-1 transition-all duration-500"><RiLinkedinFill /></Link>
        <Link href={''} className="text-[#f9ed69] text-2xl hover:-translate-y-1 transition-all duration-500"><RiDribbbleFill /></Link>
        <Link href={''} className="text-[#5272f2] text-2xl hover:-translate-y-1 transition-all duration-500"><RiGithubFill /></Link>
    </div>
  )
}

export default SocialIcons