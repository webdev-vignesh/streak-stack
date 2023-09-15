'use client';

import React from "react";
import Link from "next/link";
import { AiFillGithub } from "react-icons/ai";
import { FaRegCircleUser } from "react-icons/fa6";
import { usePathname, useRouter } from "next/navigation";

const Header = () => {

    const router = useRouter();
    const pathName = usePathname();

    return(
        <div className="header flex justify-between p-4 bg-gradient-to-r from-blue-800 to-indigo-900 dark:bg-gradient-to-r dark:from-blue-800 dark:to-indigo-900">
            <div className="logo">
                {/* <Image src={} alt="streak-stack logo" /> */}
                <p onClick={() => {router.push("/")}} className="hover: cursor-pointer">Streak⚡Stack</p>
            </div>
            <div className="flex items-center space-x-4">
                <Link href={"/"}>{ pathName === "/" ? "Pricing" : "Go Pro"}</Link>
                <p className="hover: cursor-pointer">{pathName === "/" ? <AiFillGithub /> : <FaRegCircleUser />}</p>
                <p></p>
            </div>
        </div>
    )
}

export default Header;
