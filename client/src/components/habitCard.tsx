'use client';

import React, { useEffect, useState } from 'react';
import { deleteHabitRecord, updateHabitRecord } from '@/app/api/crud/route';
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineDelete } from "react-icons/ai";
import { TbMoodEdit } from "react-icons/tb";

interface HabitHistoryItem {
  date: Date; 
  status: boolean;
  _id: string;
}

interface habitCardData {
    key: string,
    record: {
      _id: string,
      frequency: string,
      goal: number,
      habitDescription: string,
      habitName: string,
      count: number,
      habitHistory: any,
    },
    handleFetch: boolean;
    setHandleFetch: React.Dispatch<React.SetStateAction<boolean>>;
}

const HabitCard: React.FC<habitCardData> = ({ record, handleFetch, setHandleFetch}) => {

  const [hover, setHover] = useState<boolean>(false);
  const [cardStatus, setCardStatus] = useState<boolean>(false);
  const [lastUpdatedDate, setLastUpdatedDate] = useState(null);
  const [bgColor, setBgColor] = useState<string>('bg-yellow-500');

  const handleMouseEnter = () =>{
    setHover(true);
  }

  const hanldeMouseLeave = () =>{
    setHover(false);
  }

  const handleCheck = async () => {
    const status = true;
    const response = await updateHabitRecord(record._id, status);
    if(response){
      setCardStatus(true);
      setBgColor('bg-green-500');
      setHandleFetch(!handleFetch);
    }
  }

  const handleClose = async () => {
    const status = false;
    const response = await updateHabitRecord(record._id, status);
    console.log(response);
    if(response){
      setBgColor('bg-red-500');
      setCardStatus(true);
      setHandleFetch(!handleFetch);
    }
  }

  const handleUpdate = () => {
    setCardStatus(false);
    setBgColor('bg-yellow-500');
  }

  // function to delete a habit record
  const handleDelete = async (id: string) => {
    const response = await deleteHabitRecord(id);
    if(response){
      setHandleFetch(!handleFetch);
      console.log(response);
    }
  }

  // useEffect to set the card color based on last history date status
  useEffect(() => {
    if(
      record?.habitHistory[record?.habitHistory?.length - 1]?.date.split("T")[0]
      ===
      new Date().toISOString().split("T")[0]
    ) {
      if(record?.habitHistory[record?.habitHistory?.length - 1].status === true){
        setBgColor('bg-green-500');
      } else if(record?.habitHistory[record?.habitHistory?.length - 1].status === false) {
        setBgColor("bg-red-500");
      }
    }
  }, []);

  return (
    <div className={`border border-yellow-400 ${bgColor} dark:${bgColor} shadow-md shadow-rose-500 hover:cursor-pointer hover:${bgColor} p-3 rounded-md space-y-3 mb-4`} onMouseEnter={handleMouseEnter} onMouseLeave={hanldeMouseLeave} >
        <p className='font-bold text-lg'>{record?.habitName}</p>
        <div className='flex justify-between items-center'>
          <p className='text-md '>{record?.habitDescription}</p>
          {
            hover 
            ? 
              cardStatus 
              ?
              (<div className='flex space-x-4'>
                {/* button to update the habit status */}
                <button onClick={handleUpdate} className='text-3xl hover:text-yellow-500'>
                  <TbMoodEdit />
                </button>
                {/* button to delete the habit  */}
                <button onClick={() => {handleDelete(record._id)}} className='text-3xl hover:text-red-500 hover:fill-red-500'>
                  <AiOutlineDelete />
                </button>
              </div>)
              :            
              (<div className='flex space-x-4'>
                  {/* button to mark the habit status as completed */}
                  <button onClick={handleCheck} className='text-3xl hover:text-green-500 '>
                    <AiOutlineCheckCircle />
                  </button>
                  {/* button to mark the habit status as failed */}
                  <button onClick={handleClose} className='text-3xl hover:text-red-500'>
                    <AiOutlineCloseCircle />
                  </button>
                </div>)
            : <div className='flex space-x-4'>
                <div className='text-3xl text-transparent '>
                  <AiOutlineCheckCircle />
                </div>
                <div className='text-3xl text-transparent'>
                  <AiOutlineCloseCircle />
                </div>
              </div>
          }
        </div>
        <div className='flex justify-between'>
            <p className='text-sm font-light '>Frequency: {record?.frequency}</p>
            <p className=''>{record.count} / {record?.goal} {record?.frequency === "Daily" ? "days" : (record?.frequency === "Weekly" ? "weeks" : "months")}</p>
        </div>
        
    </div>
  )
}

export default HabitCard
