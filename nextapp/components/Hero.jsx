import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import { MoveRight } from 'lucide-react'
import SocialIcons from './SocialIcons'
import Badge from './Badge'
import { RiBriefcase2Fill } from 'react-icons/ri'
import { FaFigma, FaReact, FaUsers } from 'react-icons/fa6'
import { SiNextdotjs } from "react-icons/si";

const Hero = () => {
    return (
        <section className='max-padd-container bg-hero bg-no-repeat bg-center bg-cover py-20 bg-[#fdf3fb] dark:bg-transparent'>
            <div className='flexCenter gap-24 flex-col xl:flex-row '>
                {/* left */}
                <div className='flex flex-1 flex-col pt-12 xl:pt-32'>
                    <h1 className='h1 !font-extrabold'>From Pixels to Perfection Exploring the Essence of Web Design</h1>
                    <p>Explore my portfolio where creativity and functionality converge, showcasing innovative web development projects crafted with precision and passion for digital excellence.</p>
                    <div className='mt-6 flex gap-4'>
                        <Button className="gap-x-2 shadow-xl">Hire me
                            <MoveRight size={20} />
                        </Button>
                        <Button className="shadow-xl bg-black hover:bg-[#222] text-white">Download CV
                        </Button>
                    </div>
                    <div className='mt-20'>
                        <SocialIcons />
                    </div>
                </div>
                {/* right */}
                <div className='flex flex-1 relative z-10 top-12'>
                    <div className=''>
                        <Image src={'/bg.png'} height={488} width={488} priority alt='' className='drop-shadow-sm' />
                    </div>
                    <div className='hidden xl:flex'>
                        <Badge
                            containerStyles={'absolute top-[60%] left-0'}
                            icon={<FaFigma />}
                        />
                        <Badge
                            containerStyles={'absolute -top-5 right-[45%]'}
                            icon={<FaReact />}
                        />
                        <Badge
                            containerStyles={'absolute bottom-[10%] right-[27%]'}
                            icon={<SiNextdotjs />}
                        />
                        <Badge
                            containerStyles={'absolute top-[10%] -left-12 !h-[55px]'}
                            icon={<FaUsers />}
                            badgeText='Projects Completed'
                            endCountNum={8}
                            endCountText='k'
                        />
                        <Badge
                            containerStyles={'absolute top-[22%] right-0 '}
                            reviewCount={666}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero