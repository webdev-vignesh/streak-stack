"use client";

import React, { useEffect, useState } from "react";
import Footer from "../../components/footer";
import AddRecords from "@/components/addRecords";
import HabitCard from "@/components/habitCard";
import { getHabitRecords } from "../api/crud/route";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface HabitHistoryItem {
  date: Date; 
  status: boolean;
  _id: string;
}

interface HabitRecord {
  _id: string,
  habitName: string;
  habitDescription: string;
  frequency: string;
  goal: number;
  count: number;
  habitHistory: HabitHistoryItem[];
}

const Dashboard = () => {

  // local state variables
  const [records, setRecords] = useState<Array<HabitRecord>>([]);
  const [handleFetch, setHandleFetch] = useState<boolean>(false);

  // nextjs router
  const router = useRouter();
  
  // function to get the habit data records
  const habitRecords =async () => {
    const data = await getHabitRecords();
    setRecords(data);
  }

  // nextAuth session status
  const {status, data: session} = useSession();

  // if user logged out, redirecting to landing page
  if (status === 'unauthenticated') {
    router.push('/');
  }

  let recLength = records?.length;
  let pos = recLength < 6 ? "absolute" : "relative";

  // useEffect to call habitRecords function whenever CRUD operations are performed
  useEffect(() => {
    habitRecords();
  }, [handleFetch])

  return (
    <div>
      <div className="bg-gradient-to-r from-blue-800 to-indigo-900 dark:bg-gradient-to-r dark:from-blue-800 dark:to-indigo-900">
          <div className="body p-2">
            <div className="">
              <div className="flex justify-between items-center mb-2">
                <div className="flex space-x-2">
                  <div className="ml-2 p-2 border rounded-md bg-white text-black h-1/2 hover:cursor-pointer">
                    Dashboard
                  </div>
                  <div className="ml-2 p-2 border rounded-md bg-gray-500 text-black h-1/2 hover:cursor-pointer">
                    All Habits
                  </div>
                  <div className="ml-2 p-2 border rounded-md bg-gray-500 text-black h-1/2 hover:cursor-pointer">
                    Achievements
                  </div>
                </div>
                <div>
                  <button onClick={() => {signOut()}}>Sign Out</button>
                  <AddRecords handleFetch={handleFetch} setHandleFetch={setHandleFetch} />
                </div>
              </div>
              <div className="text-white">
                <div className="p-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {records?.map((record) => (
                    <HabitCard key={record._id} record={record} handleFetch={handleFetch} setHandleFetch={setHandleFetch} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className={`text-center ${pos} bottom-0 left-1/2 trasnform -translate-x-1/2 -translate-y-1/2`}>
            <Footer />
          </div>
      </div>
    </div>
  )
}

export default Dashboard;
