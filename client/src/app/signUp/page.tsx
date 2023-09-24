'use client';

import SignInBtn from '@/components/signInBtn'
import Link from 'next/link'
import React, {useState} from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase';
import { useRouter } from 'next/navigation';

const SignUp = () => {

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void; target: any; }) => {
    e.preventDefault();

    // checking if fields are empty
    if (!name || !email || !password) {
      setMessage("All fields are required!");
      return;
    }

    // firebase auth for user sign up
    createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      setMessage('User registered successfully!');
      setInterval(() => {
        router.push('/signIn');
      }, 2000);
    })
    .catch(error => {
      switch (error.code) {
        case 'auth/email-already-in-use':
          setMessage(`Email already in use`);
          break;
        case 'auth/invalid-email':
          setMessage(`Email address is invalid`);
          break;
        case 'auth/operation-not-allowed':
          setMessage(`Error! Try later`);
          break;
        case 'auth/weak-password':
          setMessage('Password is too weak');
          break;
        default:
          setMessage('');
          break;
      }
    })
  }
 

  return (
    <div className='bg-blue-500 flex justify-center items-center h-screen'>
        <div className='absolute top-1/4 md:relative md:top-0 flex flex-col justify-center items-center p-6 bg-white rounded-md shadow-md w-72'>
            <p className='text-2xl font-semibold'>Welcome!</p>
            <form onSubmit={handleSubmit} className='flex flex-col space-y-4 mt-4 '>
                <input 
                  type='text'
                  placeholder='Name'
                  onChange={(e) => {
                    setName(e.target.value);
                    setMessage("");
                  }} 
                  className='p-3 bg-gray-100 placeholder:text-gray-400 rounded-md focus:outline-blue-500 focus:bg-white' 
                />
                <input 
                  type='text' 
                  placeholder='Email'
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setMessage("");
                  }}
                  className='p-3 bg-gray-100 placeholder:text-gray-400 rounded-md focus:outline-blue-500 focus:bg-white' 
                />
                <input 
                  type='password' 
                  placeholder='Password'
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setMessage("");
                  }}
                  className='p-3 bg-gray-100 placeholder:text-gray-400 rounded-md focus:outline-blue-500 focus:bg-white' 
                />
                <button type='submit' className='bg-blue-500 rounded-md text-white p-2'>Sign Up</button>
            </form>
            <div className='h-2 mt-1'>
              {message &&
                <p className={`${message === "User registered successfully!" ? 'text-green-500' : 'text-red-500'} text-xs font-semibold`}>
                    {message}
                </p>
              }
            </div>
            <div className='flex items-center justify-center my-2'>
                <p className='text-gray-500'>OR</p>
            </div>
            <div className='mt-1'>
                <SignInBtn />
            </div>
            <div className='flex mt-3 text-sm font-medium'>
                <p>Already have an account?&nbsp;</p>
                <Link href={'/signIn'} className='underline text-orange-500'>Sign In</Link>
            </div>
        </div>
    </div>
  )
}

export default SignUp
