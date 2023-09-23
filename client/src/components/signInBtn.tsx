'use client';

import GoogleLogo from "@/../public/google-logo.png";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const SignInBtn = () => {

    const { status } = useSession();
    const router: any = useRouter();
    const pathName = usePathname();

    return(
        <div className="flex justify-center items-center ">
            { status === "authenticated"
                ?
                    router.push('/dashboard')
                :
                    <button 
                className="rounded-lg flex items-center shadow-md bg-white dark:bg-white"
                onClick={() => {signIn("google")}}
                >
                        <Image src={GoogleLogo} alt="Google" className=" mx-2" height={30} width={30} />
                        <span className="bg-blue-500 text-white px-4 py-2 rounded-e-lg">
                            Sign <span>{pathName === "/signUp" ? "Up" : "In"}</span> with Google
                        </span>
                    </button>
                }
        </div>
    )
}

export default SignInBtn;
