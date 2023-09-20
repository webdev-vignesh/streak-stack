'use client';

import GoogleLogo from "@/./../public/google-logo.png";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignInBtn = () => {

    const { status } = useSession();
    const router: any = useRouter();

    return(
        <div className="flex justify-center items-center ">
            { status === "authenticated"
                ?
                    router.push('/dashboard')
                :
                    <button 
                className="rounded-lg flex items-center shadow-xl bg-white"
                onClick={() => {signIn("google")}}
                >
                        <Image src={GoogleLogo} alt="Google" className=" m-2" height={30} width={30} />
                        <span className="bg-green-500 text-white px-4 py-3 rounded-e-lg">
                            Sign In with Google
                        </span>
                    </button>
                }
        </div>
    )
}

export default SignInBtn;
