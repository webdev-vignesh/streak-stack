import Link from "next/link";
import React from "react";

const Footer = () => {
    return(
        <div className="text-center absolute bottom- inset-x-0 md:relative md:bottom-0 md:mt-4 md:mb-4">
            <p className="text-sm">Made with ❤️ by <Link className="hover:underline text-red-500" href={"https://www.webdev-vignesh.tech"} target="_blank">Vignesh</Link></p>
        </div>
    )
}

export default Footer;
