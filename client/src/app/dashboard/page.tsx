"use client";

import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Link from "next/link";
import Footer from "../../components/footer";
import AddRecords from "@/components/addRecords";
import { getHabitRecords } from "../api/crud/route";
import HabitCard from "@/components/habitCard";

interface HabitRecord {
  "_id": string,
  "habitName": string;
  "habitDescription": string;
  "frequency": string;
  "goal": number;
  "count": number;
}

const Dashboard = () => {

  // local state variables
  const [records, setRecords] = useState<Array<HabitRecord>>([]);
  const [handleFetch, setHandleFetch] = useState<boolean>(false);
  
  // function to get the habit data records
  const habitRecords =async () => {
    const data = await getHabitRecords();
    setRecords(data);
  }

  let recLength = records.length;
  let pos = recLength < 6 ? "absolute" : "relative";

  useEffect(() => {
    habitRecords();
  }, [handleFetch])

  return (
    <div className="bg-gradient-to-r from-blue-800 to-indigo-900">
        <Header />
        <div className="body p-2">
          <div className="">
            <div className="flex justify-between items-center mb-2">
              <div className="flex space-x-2">
                <div className="ml-2 p-2 border rounded-md bg-white text-black h-1/2">
                  All Habits
                </div>
                <div className="ml-2 p-2 border rounded-md bg-gray-500 text-black h-1/2">
                  Achievements
                </div>
              </div>
              <div>
                <AddRecords handleFetch={handleFetch} setHandleFetch={setHandleFetch} />
              </div>
            </div>
            <div className="text-white">
              <div className="p-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {records?.map((record) => (
                  <HabitCard key={record._id} record={record} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={`text-center ${pos} bottom-0 left-1/2 trasnform -translate-x-1/2 -translate-y-1/2`}>
            <Footer />
        </div>
    </div>
  )
}

export default Dashboard;