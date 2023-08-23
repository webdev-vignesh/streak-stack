import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AiFillGithub } from "react-icons/ai";
import { FaRegCircleUser } from "react-icons/fa6";

const Header = () => {
    return(
        <div className='header flex justify-between p-2'>
            <div className='logo'>
                {/* <Image src={} alt='streak-stack logo' /> */}
                <p>Streak Stack ⚡</p>
            </div>
            <div className='flex items-center space-x-4'>
                <Link href={'https://github.com/webdev-vignesh/streak-stack'}><AiFillGithub /></Link>
                <Link href={'/'}>Go Pro</Link>
                <p><FaRegCircleUser /></p>
            </div>
        </div>
    )
}

export default Header;