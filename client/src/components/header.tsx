'use client';

import React from "react";
import Link from "next/link";
import { AiFillGithub } from "react-icons/ai";
import { FaRegCircleUser } from "react-icons/fa6";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import UserDropdown from "./userDropdown";

const Header = () => {

    const router = useRouter();
    const pathName = usePathname();

    const { status, data: session} = useSession();

    return(
        <div className="header flex justify-between p-4 bg-gradient-to-r from-blue-800 to-indigo-900 dark:bg-gradient-to-r dark:from-blue-800 dark:to-indigo-900">
            <div className="logo">
                {/* <Image src={} alt="streak-stack logo" /> */}
                <p onClick={() => {router.push("/")}} className="hover: cursor-pointer">Streak⚡Stack</p>
            </div>
            <div className="flex items-center space-x-4">
                <Link href={"/"}>
                    { 
                        (pathName === "/" || pathName === "/signIn" )  
                            ? "Pricing" 
                            : "Go Pro"
                    }
                </Link>
                <div className="hover: cursor-pointer">
                    {
                        (pathName === "/"|| pathName === "/signIn" ) 
                        ? 
                            <Link href={'https://github.com/webdev-vignesh/streak-stack'} target="_blank">
                                <AiFillGithub />
                            </Link> 
                        : <><UserDropdown /></>
                    }
                </div>
                <p></p>
            </div>
        </div>
    )
}

export default Header;
