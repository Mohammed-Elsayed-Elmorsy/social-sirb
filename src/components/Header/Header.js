import { useContext, useEffect, useState } from 'react'
import img from '../../assets/birds.png'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { GoBell } from 'react-icons/go'
import axios from 'axios'
const Header = () => {
    const { user, avatar, id } = useContext(UserContext)
    const [notifications, setNotifications] = useState([])
    const fetchNotifications = async () => {
        try {
            const { data } = await axios.get('https://ffa6ebc5-2ff4-41cb-8279-c36bb9466103-00-1lfnueh0q3ij9.picard.replit.dev:3000/notifications', {
                withCredentials: true,
            });
            setNotifications(data);
        } catch (err) {
            console.error('Failed to load notifications');
        }
    };
    const markNotificationsAsRead = async () => {
        try {
            await axios.post('https://ffa6ebc5-2ff4-41cb-8279-c36bb9466103-00-1lfnueh0q3ij9.picard.replit.dev:3000/notifications/mark-read', {}, {
                withCredentials: true,
            });
            fetchNotifications();
            // Optionally refetch notifications here
        } catch (err) {
            console.error('Error marking notifications as read');
        }
    };

    useEffect(() => {
        if (id) {
            fetchNotifications();
        }

    }, [id]);
    return (
        <header className=' fixed z-50 top-0 left-0 w-full bg-white flex items-center shadow h-[80px]'>
            <div className=' container md:px-16 px-4 lg:px-20 mx-auto flex justify-between items-center'>
                <Link to={'/'} className=' flex items-center '>
                    <h2 className=' text-gray-700  flex items-center select-none text-[20px]  font-bold'>
                        Sirb
                    </h2>
                    <img src={img} className=' rotate-x-180 -ml-2 relative z-10 w-[50px] h-[50px] opacity-70 
                    rounded-full' alt="" />
                    <h2 className=' text-gray-700 -ml-3 logo  flex items-center select-none text-[20px]  font-bold'>
                        سِرب
                    </h2>
                </Link>
                {user ? (
                    <ul className='flex items-stretch justify-between gap-4'>
                        <Link to={'/notifications'} onClick={markNotificationsAsRead}

                            className='relative  w-[45px] 
                            flex items-center justify-center text-gray-700 gap-2  hover:shadow transition duration-300 py-1   px-2'>
                            <GoBell className=' text-xl' />
                            {notifications.filter(n => !n.read).length > 0 &&
                                <span className=' absolute top-[2px] right-[2px] bg-red-500 text-white text-xs rounded-full 
                                w-4 h-4 flex items-center justify-center'>
                                    {notifications.filter(n => !n.read).length > 0 &&
                                        <>
                                            {notifications.filter(n => !n.read).length}
                                        </>
                                    }
                                </span>
                            }
                        </Link>
                        <Link to={'/profile'}
                            className=' flex items-center gap-2 
                            border rounded hover:shadow transition duration-300 py-1   px-[8px]'>

                            <img
                                src={`https://ffa6ebc5-2ff4-41cb-8279-c36bb9466103-00-1lfnueh0q3ij9.picard.replit.dev:3000/${avatar}`}
                                className="w-8 h-8 rounded-full" alt="" />
                            <span>{user || localStorage.getItem('user')}
                            </span>
                        </Link>
                    </ul>
                ) : (
                    <ul className='flex items-center justify-between gap-4'>
                        <li>
                            <Link to={'/login'}
                                style={{ cursor: 'pointer' }}
                                className='px-2 py-[6px] rounded border'>
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
                )
                }
            </div>

        </header>
    )
}

export default Header
