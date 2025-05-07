import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
export const UserContext = createContext({})

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [Email, setEmailcontext] = useState(null)
    const [avatar, setAvatar] = useState(null)
    const [id, setid] = useState(null)
    const GETUSERNAME = async () => {
        try {
            const { data } = await axios.get('https://ffa6ebc5-2ff4-41cb-8279-c36bb9466103-00-1lfnueh0q3ij9.picard.replit.dev:3000/verify',
                {
                    withCredentials: true,
                });
            setAvatar(data?.avatar || null);
            setUser(data?.username || null);
            setid(data?._id || null);
            setEmailcontext(data?.email || null);
        } catch (err) {
            // toast(err.response?.data?.error);
            // if (err.response?.data?.error === 'Token expired') {
            //     toast('Session expired. Please log in again.');
            // } else if (err.response?.data?.error === 'Invalid token') {
            //     toast('Invalid session. Please log in again.');
            // } else {
            // toast('Verification failed.');
            // }
            setUser(null);
            setAvatar(null);
            setid(null);
            setEmailcontext(null);
            // optionally: navigate('/login');
        }



    }
    useEffect(() => {
        GETUSERNAME()
    }, [])
    return (
        <UserContext.Provider value={{ user, id, setUser, Email, setid, setEmailcontext, setAvatar, avatar }}>
            {children}
        </UserContext.Provider>
    )
}