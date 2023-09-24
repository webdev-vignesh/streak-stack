'use client';

import React from "react";
import Link from "next/link";
import { AiFillGithub } from "react-icons/ai";
import { FaRegCircleUser } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import UserDropdown from "./userDropdown";
import { useRouter } from 'next/router';
import Dashboard from "@/app/dashboard/page";

const Header = () => {

    const pathName = usePathname();

    const { status, data: session} = useSession();

    return(
        <div className="header flex justify-between items-center  p-3 bg-white  text-blue-600 ">
            <div className="logo">
                {/* <Image src={} alt="streak-stack logo" /> */}
                <Link href={'/'} className="hover: cursor-pointer font-bold text-lg md:text-2xl">⚡Streak Stack</Link>
            </div>
            <div className="flex items-center space-x-2 md:space-x-6 text-sm md:text-lg font-medium">
                <Link href={"/pricing"} className="hover:underline">
                    Pricing
                </Link>
                {
                    (pathName !== "/dashboard" && status !== 'authenticated')
                    ?
                    <>
                        <Link href={"/signIn"} className="hover:underline">
                            {
                                (pathName === "/dashboard")
                                ?   <FaRegCircleUser/>
                                :   'Sign In'
                            }
                        </Link>
                        <div className="hover: cursor-pointer">
                            {
                                (pathName === "/"|| pathName === "/signIn" || pathName === "/signUp"  || pathName === "/pricing" ) 
                                    &&
                                <Link href={'/signUp'} className="bg-blue-500 text-white p-2 rounded-3xl " >
                                    Try for Free
                                </Link> 
                            }
                        </div>
                    </>
                    :
                    <>
                        {
                        (pathName !== '/dashboard')
                        &&   
                        <Link href={'/dashboard'} className=" hover:underline">
                            Dashboard
                        </Link>
                        }
                        <div className="hover:cursor-pointer">
                            <FaRegCircleUser/>
                        </div>
                    </>
                }
                <p></p>
            </div>
        </div>
    )
}

export default Header;
