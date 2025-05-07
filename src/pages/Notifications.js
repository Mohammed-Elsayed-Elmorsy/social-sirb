import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../components/context/UserContext';
import axios from 'axios';
import { formatFacebookTime } from '../utils/Base64';

const Notifications = () => {
    const { id } = useContext(UserContext)
    const [notifications, setNotifications] = useState(null)
    const [loading, setLoading] = useState(false)
    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get('https://ffa6ebc5-2ff4-41cb-8279-c36bb9466103-00-1lfnueh0q3ij9.picard.replit.dev:3000/notifications', {
                withCredentials: true,
            });
            setNotifications(data);
            setLoading(false);

        } catch (err) {
            console.error('Failed to load notifications');
        }
    };
    useEffect(() => {
        if (id) {
            fetchNotifications();
        }

    }, [id]);

    return (
        <div className='mt-[70px] w-full max-w-lg mx-auto mt-12 p-6'>
            <h1 className='text-3xl font-bold mb-6'>Notifications</h1>
            {notifications?.length === 0 && (
                <div className='text-center text-gray-600'>
                    You have no notifications
                </div>
            )}
            {loading && (
                <div className='spinner'>

                </div>
            )}

            {notifications?.map((notification, index) => (
                <div key={index} className='relative flex items-center mb-4 shadow-md rounded-md p-4 bg-white'>
                    {/* <div className='absolute top-0 text-black right-0 w-5 h-5 rounded-l-md'>
                        <FaEllipsisV className='text-white text-center text-lg' />
                    </div> */}
                    <img
                        src={`https://ffa6ebc5-2ff4-41cb-8279-c36bb9466103-00-1lfnueh0q3ij9.picard.replit.dev:3000/${notification.from.avatar}`}
                        alt='Avatar'
                        className='w-10 h-10 rounded-full mr-4'
                    />
                    <div className='flex-1'>
                        <p className='text-sm text-gray-700'>
                            <span className='font-bold text-gray-900'>
                                {notification.from.username}
                            </span> commented on your post</p>
                        <span className='text-gray-600 text-xs'>
                            {formatFacebookTime(notification.createdAt)}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Notifications