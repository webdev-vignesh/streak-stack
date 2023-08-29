import React from 'react'

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
  return (
    <div className='border border-yellow-400 bg-sky-600 shadow-md shadow-rose-500 hover:cursor-pointer hover:bg-blue-800 p-3 rounded-md space-y-2 mb-4'>
        <p className='font-bold text-lg'>{record?.habitName}</p>
        <p className='text-md '>{record?.habitDescription}</p>
        <div className='flex justify-between'>
            <p className='text-sm font-light '>Frequency: {record?.frequency}</p>
            <p className=''>{record.count} / {record?.goal} {record?.frequency === "Daily" ? "days" : (record?.frequency === "Weekly" ? "weeks" : "months")}</p>
        </div>
    </div>
  )
}

export default HabitCard