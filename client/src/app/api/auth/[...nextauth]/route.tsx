import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider  from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../../firebase";

interface CustomCredentials {
    email: string;
    password: string;
}

const hanlder = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "" ,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
        CredentialsProvider({
            name: "credentials",
            credentials : {

            },
            async authorize (credentials: CustomCredentials) {
                return await signInWithEmailAndPassword(auth, (credentials as any).email || '', (credentials as any).password || ''  )
                .then(userCredential => {
                    if (userCredential.user) {
                        return userCredential.user;
                    }
                    return null;
                })
                .catch(error => (console.log(error)))
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/signIn",
    }
});

export { hanlder as GET, hanlder as POST };
