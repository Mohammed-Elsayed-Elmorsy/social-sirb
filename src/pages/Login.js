
import axios from 'axios'
import { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { UserContext } from '../components/context/UserContext'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import toast from 'react-hot-toast'
import LoadingSpinner from '../components/LoadingSpinner '
const Login = () => {
    const { setUser, setAvatar, setid, setEmailcontext } = useContext(UserContext)
    const [email, setEmail] = useState('')
    const [showPass, setShowPass] = useState(false)
    const [loading, setLoading] = useState(false)
    const [pass, setPass] = useState('')
    const [ready, setReady] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const { data } = await axios.post('https://ffa6ebc5-2ff4-41cb-8279-c36bb9466103-00-1lfnueh0q3ij9.picard.replit.dev:3000/login',
                { email, pass },
                { withCredentials: true }
            )
            console.log(data);

            if (data === 'account not here') {
                setLoading(false)
                toast('account not here')
                return
            }
            if (data === 'invalid Password') {
                setLoading(false)
                toast('invalid Password')
                return
            }
            setUser(data.username)
            setEmailcontext(data.email)
            setid(data._id)
            setAvatar(data.avatar)
            setLoading(false)
            toast('Login Success')
            setReady(true)

        } catch (err) {
            setLoading(false)
            toast(err.message)
        }
    }
    if (ready) {
        return <Navigate to={'/'} />
    }
    if (loading) {
        return <LoadingSpinner />
    }

    return (
        <form onSubmit={handleLogin}
            className='mt-[100px] flex  flex-col gap-4 md:max-w-lg md:mx-auto mx-5 mt-12 p-5
             bg-white '>
            <h1 className='text-2xl font-bold'>Log in</h1>
            <input
                type="email"
                placeholder='Enter Email'
                required
                autoComplete="new-password"
                onChange={(e) => setEmail(e.target.value)} />
            <div style={{ position: 'relative' }}>
                {showPass ? (
                    <FaEyeSlash onClick={() => setShowPass(false)}
                        style={{ position: 'absolute', right: '10px', top: '28%', fontSize: '18px', cursor: 'pointer' }} />
                ) : (
                    <FaEye onClick={() => setShowPass(true)}
                        style={{ position: 'absolute', right: '10px', top: '28%', fontSize: '18px', cursor: 'pointer' }} />
                )}
                <input
                    type={showPass ? "text" : 'password'}
                    placeholder='Enter Password'
                    value={pass}
                    required
                    onChange={(e) => setPass(e.target.value)}
                />

            </div>
            <input
                className=' cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4'
                type="submit"
                value={'Submit'} />
            <p>Don't Have an Account ??  <Link className=' text-blue-500 hover:text-blue-600 underline font-bold' to={'/register'}> Sign Up</Link></p>
        </form>
    )
}

export default Login
