import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { AlignJustify } from 'lucide-react'
import Logo from './Logo'
import Nav from './Nav'
import SocialIcons from './SocialIcons'

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <AlignJustify className='cursor-pointer' />
      </SheetTrigger>
      <SheetContent>
          <div className='flex flex-col items-center justify-between h-full py-8'>
            <div className='flex flex-col gap-y-28 '>
              <Logo />
              <Nav
                containerStyles={'flex flex-col gap-y-8 capitalize bold-16'}
                linkStyles={'relative'}
                underlineStyles={'absolute left-0 top-full h-[2px] w-6 bg-primary rounded-full'}
              />
            </div>
            <SocialIcons />
          </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav