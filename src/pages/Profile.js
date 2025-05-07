import axios from 'axios';
import React, { useContext } from 'react'
import { UserContext } from '../components/context/UserContext';

const Profile = () => {
    const { user, Email, avatar } = useContext(UserContext); // Assuming you have a UserContext to get user data
    const handleLogout = async () => {
        try {
            await axios.get('https://ffa6ebc5-2ff4-41cb-8279-c36bb9466103-00-1lfnueh0q3ij9.picard.replit.dev:3000/logout', { withCredentials: true });
            localStorage.removeItem('user'); // Clear user data from local storage
            window.location.href = 'https://mohammed-elsayed-elmorsy.github.io/social-sirb'; // Redirect to login page after logout
        } catch (error) {
            console.error('Logout error', error);
        }
    };
    return (
        <div>
            <div className=' container mx-auto px-4 md:px-16 lg:px-20 mt-[100px]'>
                <h1>Profile</h1>
                <p>This is the profile page.</p>
                <p>Welcome <span className=' font-bold text-blue-600 capitalize text-lg'>{user}</span>!</p>
                <p>Email: <span className=' font-bold underline text-lg'>{Email}</span></p>
                <img className=' w-20 h-20 rounded-full my-4' src={`https://ffa6ebc5-2ff4-41cb-8279-c36bb9466103-00-1lfnueh0q3ij9.picard.replit.dev:3000/${avatar}`} alt='avatar' />
                <p>Here you can view and edit your profile information.</p>
                <p>More features coming soon!</p>
                <button className=' bg-red-600 px-2 py-1 text-white hover:bg-red-700' onClick={handleLogout}>logout</button>
            </div>
        </div>
    )
}

export default Profile