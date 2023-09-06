"use client"

import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { postHabitRecord } from "@/app/api/crud/route";

interface ChildProps {
  handleFetch: boolean;
  setHandleFetch: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddRecordsModal: React.FC<ChildProps> = ({ handleFetch, setHandleFetch }) => {

  // state variables
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [habitName, setHabitName] = useState<string>("");
  const [habitDescription, setHabitDescription] = useState<string>("");
  const [frequency, setFrequency] = useState<string>("Daily");
  const [goal, setGoal] = useState<any>('');
  const [count, setCount] = useState<number>(0);
  const [createdAt, setCreatedAt] = useState<Date>(new Date());
  const [updatedAt, setUpdatedAt] = useState<Date>(new Date());

  // function to close modal
  function closeModal() {
    setIsOpen(false)
  }

  // function to open modal
  function openModal() {
    setIsOpen(true)
  }

  // function to handle modal form submit 
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = await postHabitRecord(habitName, habitDescription, frequency, Number(goal), count);
    if(data){
      setHabitName("");
      setHabitDescription("");
      setFrequency("Daily");
      setGoal('');
      setCount(0);
      setCreatedAt(new Date());
      setUpdatedAt(new Date());
      closeModal();
      setHandleFetch(!handleFetch);
    }
  };

  return (
    <>
      {/* Button to open modal */}
      <div className="p-4 flex justify-end">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-green-500 dark:bg-green-500 shadow-md px-4 py-2 text-sm font-medium text-white"
        >
          + Create new habit
        </button>
      </div>

      {/* Modal element */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          open={isOpen}
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="min-h-screen px-4 text-center">
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>

              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Add Habit ⚡
                </Dialog.Title>

                {/* form to get details for adding new habit */}
                <form onSubmit={handleSubmit} className="mt-6 space-y-6">

                  <div className="grid grid-cols-2 gap-4">
                    {/* Habit name element */}
                    <div>
                      <label htmlFor="habitName" className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        name="habitName"
                        id="habitName"
                        placeholder="Enter habit name"
                        value={habitName}
                        onChange={(e) => {
                          setHabitName(e.target.value);
                        }}
                        className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-gray-700"
                      />
                    </div>

                    {/* Habit description element */}
                    <div>
                      <label htmlFor="habitDescription" className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <input
                        type="text"
                        name="habitDescription"
                        id="habitDescription"
                        placeholder="Enter description..."
                        value={habitDescription}
                        onChange={(e) => {
                          setHabitDescription(e.target.value);
                        }}
                        className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-gray-700"
                      />
                    </div>
                  </div>

                  {/* Frequency element */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="frequency" className="block text-sm font-medium text-gray-700">
                        Frequency
                      </label>
                      <select id="frequency" name="frequency" defaultValue={"Daily"} onChange={(e) => {
                        setFrequency(e.target.value);
                      }} className="text-gray-700 text-sm p-2">
                        <option value={"Daily"}>Daily</option>
                        <option value={"Weekly"}>Weekly</option>
                        <option value={"Monthly"}>Monthly</option>
                      </select>
                    </div>

                    {/* Goal element */}
                    <div>
                      <label htmlFor="goal" className="block text-sm font-medium text-gray-700">
                        Goal
                      </label>
                      <input
                        type="number"
                        name="goal"
                        id="goal"
                        placeholder="no. of days"
                        value={Number(goal)}
                        onChange={(e) => {
                          const newValue = Number(e.target.value);
                          setGoal(newValue);
                        }}
                        className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-gray-700"
                      />
                    </div>
                  </div>

                  {/* Buttons element */}
                  <div className="mt-4 flex justify-center space-x-4">
                    <button
                      type="button"
                      onClick={() => {
                        setHabitName("");
                        setHabitDescription("");
                        setFrequency("Daily");
                        setGoal('');
                        setCount(0);
                        setCreatedAt(new Date());
                        setUpdatedAt(new Date());
                        closeModal();
                      }}
                      className=" py-2 px-4 border shadow-sm text-sm font-medium rounded-md text-black border-gray-300 bg-white hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className=" py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Add Record
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
};

export default AddRecordsModal;
