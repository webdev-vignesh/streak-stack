'use client';

import React, { useState } from 'react';
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineDelete } from "react-icons/ai";
import { TbMoodEdit } from "react-icons/tb";

interface habitCardData {
    key: string,
    record: {
        _id: string,
        frequency: string,
        goal: number,
        habitDescription: string,
        habitName: string,
        count: number,
    },
}

const HabitCard: React.FC<habitCardData> = ({ record}) => {

  const [hover, setHover] = useState<boolean>(false);
  const [cardStatus, setCardStatus] = useState<boolean>(false);
  const [bgColor, setBgColor] = useState<string>('sky');

  const handleMouseEnter = () =>{
    setHover(true);
  }

  const hanldeMouseLeave = () =>{
    setHover(false);
  }

  const handleCheck = () => {
    setCardStatus(true);
    setBgColor('green');
  }

  const handleClose = () => {
    setCardStatus(true);
    setBgColor('red');
  }

  const handleUpdate = () => {
    setCardStatus(false);
    setBgColor('sky');
  }

  return (
    <div className={`border border-yellow-400 bg-${bgColor}-500 shadow-md shadow-rose-500 hover:cursor-pointer hover:bg-${bgColor}-800 p-3 rounded-md space-y-3 mb-4 h-32`} onMouseEnter={handleMouseEnter} onMouseLeave={hanldeMouseLeave} >
        <p className='font-bold text-lg'>{record?.habitName}</p>
        <div className='flex justify-between items-center'>
          <p className='text-md '>{record?.habitDescription}</p>
          {
            hover 
            ? 
              cardStatus 
              ?
              (<div className='flex space-x-4'>
                <button onClick={handleUpdate} className='text-3xl hover:text-yellow-500'>
                  <TbMoodEdit />
                </button>
                <button  className='text-3xl hover:text-red-500 hover:fill-red-500'>
                  <AiOutlineDelete />
                </button>
              </div>)
              :            
              (<div className='flex space-x-4'>
                  <button onClick={handleCheck} className='text-3xl hover:text-green-500 '>
                    <AiOutlineCheckCircle />
                  </button>
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