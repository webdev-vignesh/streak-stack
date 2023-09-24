'use client';

import Link from 'next/link'
import { razPayment, verifyPayment } from '../api/payment/route';
import DialogModal from '@/components/dialog';
import { useState } from 'react';

const Pricing = () => {

    const [status, setStatus] = useState(false);

    const handleSuccess = () => {
        console.log('called me')
        setStatus(true);
    }

    // razorpay payment modal
    const handleOpenRazorPay = (data: any) => {
        const options = {
            key: process.env.KEY_ID || 'rzp_test_07LEzJFNewiSmF',
            amount: Number(data.amount) * 100,
            currency: data.currency,
            name: "Streak Stack",
            order_id: data.id,
            handler: async function (response: any) {
                try {
                    const result = await verifyPayment(response);
                    console.log(result);
                    if (result.code === 200) {
                        console.log("payment success");
                        handleSuccess();
                    }
                } catch (error) {
                    console.log(error)
                }

            }
        }
        const rzp = new window.Razorpay(options);
        rzp.open();
    }

    // function to handle payment with third party api
    const handlePayment = async () => {
        const amt: number = 199;
        const response = await razPayment(amt);

        if (response) {
            if (response?.data?.data?.error) {
                console.log(response?.data?.data?.error)
            } else {
                handleOpenRazorPay(response?.data)
            }
        } else {
            console.log("Something went wrong");
        }

    }

  return (
    <div className='bg-blue-500 h-screen flex flex-col justify-center items-center space-y-8'>
        <h1 className='text-3xl text-white font-bold'>Pricing</h1>
        <div className='flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 space-x-4'>
            <div className='text-xl bg-white p-6 rounded-md shadow-md w-60 transform transition-transform hover:scale-110 duration-300 ease-in-out cursor-pointer'>
                <p className='font-bold mb-4'><span className='underline'>Free</span> 🥳</p>
                <p className='font-semibold text-3xl'>₹0</p>
                <p className='font-normal mb-4'>/ forever</p>
                <p className='text-gray-400 text-lg'>&#8226; 7 Free Habits</p>
                <p className='text-gray-400 text-lg'>&#8226; Ads Included</p>
                <p className='text-gray-400 text-lg mb-4'>&#8226; Email Support</p>
                <Link href={'/signUp'} className='block bg-blue-500 text-white text-lg text-center p-2 mt-2 rounded-md'>
                    Try Now!
                </Link>
            </div>
            <div className='relative text-xl bg-green-500 text-white p-6 rounded-md shadow-md w-60 transform transition-transform hover:scale-110 duration-300 ease-in-out cursor-pointer'>
            <p className='font-bold mb-4'><span className='underline'>Premium</span> 👑</p>
                <p className='font-semibold text-3xl'>₹<del>399</del> 199</p>
                <p className='font-normal mb-4'>/ month</p>
                <p className=' text-lg'>&#8226; Unlimited Habits</p>
                <p className=' text-lg'>&#8226; No Ads</p>
                <p className=' text-lg mb-4'>&#8226; 24/7 Support</p>
                <button onClick={handlePayment} className='w-full bg-white text-black text-lg text-center p-2 mt-2 rounded-md'>
                    Try Now!
                </button>
                <div className='bg-red-500 rounded-md p-2 absolute -top-4 -right-12'>
                    <p>Best Offer!</p>
                </div>
                {
                    status
                    &&
                    <DialogModal />
                }
            </div>
        </div>
    </div>
  )
}

export default Pricing
