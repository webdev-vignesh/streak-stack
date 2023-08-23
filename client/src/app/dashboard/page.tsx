import React from 'react';
import Header from "../components/Header";
import Link from 'next/link';

const Dashboard = () => {
  return (
    <div>
        <Header />
        <div className='body'>

        </div>
        <div className='footer absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <p>Made with ❤️ by <Link href={'https://github.com/webdev-vignesh'}>Vignesh</Link></p>
        </div>
    </div>
  )
}

export default Dashboard;