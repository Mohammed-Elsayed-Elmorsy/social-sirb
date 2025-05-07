import React from 'react'
import { Link } from 'react-router-dom'

const WelcomePage = () => {
    return (
        <div className='flex capitalize max-w-lg mx-auto text-center justify-center flex-col gap-3 h-[70vh] mt-[100px]'>
            <h1 className='text-2xl font-bold'>
                🕊️
                Let your thoughts take flight.

                <div style={{ fontFamily: 'Cairo', fontSize: '18px' }} className='text-'>
                    🕊️ أهلاً بك في سِرْب
                    حيث تُحلّق الكلمات كما تطير الطيور في السماء
                </div>
                <div className=' text-gray-500'>
                    join our
                    <span className='text-blue-600'> sirb.</span>
                </div>
            </h1>

            <p className='text-gray-500 underline'>
                Get Started to post, like, and comment with others.
            </p>
            <ul className='flex items-center justify-center gap-4'>
                <li>
                    <Link to={'/login'}
                        style={{ cursor: 'pointer' }}
                        className='px-2 py-[6px] bg-white rounded border border-gray-300'>
                        Login
                    </Link>
                </li>
                <li>
                    <Link to={'/register'}
                        style={{ cursor: 'pointer' }}
                        className='px-2 py-[6px] rounded bg-blue-500 text-white '>
                        Get Started
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default WelcomePage