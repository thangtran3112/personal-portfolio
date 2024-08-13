'use client'

import React, { useEffect, useState } from 'react'
import ThemeToggler from './ThemeToggler'
import Nav from './Nav'
import MobileNav from './MobileNav'
import Link from 'next/link'
import Logo from './Logo'

const Header = () => {
  const [header, setHeader] = useState(false);

  useEffect(() => {
    const scrollYPos = window.addEventListener('scroll', () => {
      window.scrollY > 50 ? setHeader(true) : setHeader(false);
    });

    // remove event
    return () => window.removeEventListener('scroll', scrollYPos);
  });

  return (
    <header className={`${header ? 'shadow-md !py-3 dark:!bg-secondary' : ''} sticky top-0 py-4 z-30 transition-all max-padd-container flexBetween bg-[#fdf3fb] dark:bg-transparent`}>
      {/* logo */}
      <Logo />
      {/* nav & btns */}
      <div
        className='flexCenter gap-x-8'>
        <Nav
          containerStyles={'hidden xl:flex gap-x-12 capitalize bold-16'}
          linkStyles={'relative'}
          underlineStyles={'absolute left-0 top-full h-[2px] w-full bg-primary rounded-full'}
        />
        <ThemeToggler />
        <div className='xl:hidden'>
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

export default Header