import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AiFillGithub } from "react-icons/ai";
import { FaRegCircleUser } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const Header = () => {

    const router = useRouter();
    return(
        <div className="header flex justify-between p-4">
            <div className="logo">
                {/* <Image src={} alt="streak-stack logo" /> */}
                <p onClick={() => {router.push("/")}} className="hover: cursor-pointer">Streak⚡Stack</p>
            </div>
            <div className="flex items-center space-x-4">
                <Link href={"/"}>Go Pro</Link>
                <p className="hover: cursor-pointer"><FaRegCircleUser /></p>
            </div>
        </div>
    )
}

export default Header;