"use client";

import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Link from "next/link";
import Footer from "../../components/footer";
import AddRecords from "@/components/addRecords";
import { getHabitRecords } from "../api/crud/route";

interface HabitRecord {
  "_id": string,
  "habitName": string;
  "habitDescription": string;
  "frequency": string;
  "goal": number;
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

  useEffect(() => {
    habitRecords();
  }, [handleFetch])

  return (
    <div className="bg-gradient-to-r from-blue-800 to-indigo-900">
        <Header />
        <div className="body p-2">
          <div className="">
            <div className="p-2 inline-flex border">Habits</div>
            <div className="text-white">
              <AddRecords handleFetch={handleFetch} setHandleFetch={setHandleFetch} />
              {records.map((record) => <p key={record._id}>Habit Name: {record.habitName}</p>)}
            </div>
          </div>
        </div>
        <div className="text-center absolute bottom-0 left-1/2 trasnform -translate-x-1/2 -translate-y-1/2">
            <Footer />
        </div>
    </div>
  )
}

export default Dashboard;