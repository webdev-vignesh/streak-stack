import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useState } from 'react';

const UserDropdown = () => {
  const { status, data: session } = useSession();
  const [showItems, setShowItems] = useState(false); 

  // Function to toggle the visibility of the dropdown items
  const toggleDropdown = () => {
    setShowItems(!showItems);
  };

  return (
    <div>
      <div className="">
        <div className="relative">
          <div className="cursor-pointer" onClick={toggleDropdown}>
            <Image src={session?.user?.image} alt={'user'} width={30} height={30} className="rounded-full" />
          </div>
          {showItems && (
            <ul className="absolute right-2 text-black bg-white p-2 mt-1 space-y-2 rounded-md hover:cursor-default">
              <li className='mb-1 text-center font-bold'>{session?.user?.name}</li>
              <li className='text-sm'>{session?.user?.email}</li>
              <hr />
              <li className='bg-red-500 p-1 text-center text-white w-1/2 m-auto rounded-md'>
                <button onClick={() => { signOut() }}>
                  SignOut
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDropdown;
