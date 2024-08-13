import Link from 'next/link'
import React from 'react'

const Logo = () => {
    return (
        <Link
            href={'/'}
            className='bold-32 !font-extrabold'
        >
            P.<span className='text-primary'>folio</span>
        </Link>
    )
}

export default Logo