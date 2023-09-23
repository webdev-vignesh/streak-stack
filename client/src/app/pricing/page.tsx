import Link from 'next/link'
import React from 'react'

const Pricing = () => {
  return (
    <div className='bg-blue-500 h-screen flex flex-col justify-center items-center space-y-8'>
        <h1 className='text-3xl text-white font-bold'>Pricing</h1>
        <div className='flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 space-x-4'>
            <div className='text-xl bg-white p-6 rounded-md shadow-md w-60 transform transition-transform hover:scale-110 duration-300 ease-in-out cursor-pointer'>
                <p className='font-bold mb-4'><span className='underline'>Free</span> 🥳</p>
                <p className='font-semibold text-3xl'>₹0</p>
                <p className='font-normal mb-4'>/ forever</p>
                <p className='text-gray-400 text-lg mb-4'>7 Free Habits</p>
                <Link href={'/signUp'} className='block bg-blue-500 text-white text-lg text-center p-2 mt-2 rounded-md'>
                    Try Now!
                </Link>
            </div>
            <div className='relative text-xl bg-green-500 text-white p-6 rounded-md shadow-md w-60 transform transition-transform hover:scale-110 duration-300 ease-in-out cursor-pointer'>
            <p className='font-bold mb-4'><span className='underline'>Premium</span> 👑</p>
                <p className='font-semibold text-3xl'>₹199</p>
                <p className='font-normal mb-4'>/ month</p>
                <p className=' text-lg mb-4'>Unlimited Habits</p>
                <Link href={'/signUp'} className='block bg-white text-black text-lg text-center p-2 mt-2 rounded-md'>
                    Try Now!
                </Link>
                <div className='bg-red-500 rounded-md p-2 absolute -top-4 -right-12'>
                    <p>Best Offer!</p>
                </div>
            </div>
            

        </div>
    </div>
  )
}

export default Pricing
