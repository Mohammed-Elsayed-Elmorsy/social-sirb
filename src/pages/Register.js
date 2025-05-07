import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';
import { imageToBase64 } from '../utils/Base64';
import LoadingSpinner from '../components/LoadingSpinner ';
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,6}$/;
const USER_REGEX = /^[A-z][A-z0-9-_ ]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
    const [showPass, setShowPass] = useState(false);
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);
    const [loading, setloading] = useState(false);
    const [nameValid, setNameValid] = useState(false);
    const [validPass, setValidPass] = useState(false);
    const [validEmail, setValidEmail] = useState(false);

    useEffect(() => {
        setNameValid(USER_REGEX.test(username));
    }, [username]);

    useEffect(() => {
        setValidPass(PWD_REGEX.test(pass));
    }, [pass]);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    const navigate = useNavigate();
    const register = async (e) => {
        e.preventDefault();
        if (!validPass) {
            toast('Enter Valid Pass');
        } else if (!nameValid) {
            toast('Not valid name');
        } else if (!avatarFile) {
            toast('Please upload an avatar');
        } else {
            try {
                const formData = new FormData();
                formData.append('username', username);
                formData.append('email', email);
                formData.append('pass', pass);
                formData.append('avatar', avatarFile); //
                setloading(true);
                const { data } = await axios.post('https://ffa6ebc5-2ff4-41cb-8279-c36bb9466103-00-1lfnueh0q3ij9.picard.replit.dev:3000/register', formData, {
                    withCredentials: true, // Ensure cookies are sent with the request
                    headers: {
                        'Content-Type': 'multipart/form-data', // Properly set Content-Type
                    }
                });
                setloading(false);

                if (data === 'Email already Registered') {
                    return toast('Email already Registered')
                } else if (data === 'Registration successful') {
                    setloading(false);
                    toast('Registration successful');
                    // alert('Registration successful');
                    navigate('/login')
                }
            } catch (error) {
                setloading(false);
                toast(error.message);

            }
        }
    };
    if (loading) {
        return <LoadingSpinner />
    }
    const handleUploadImage = async (file) => {
        setAvatarFile(file)
        const image = await imageToBase64(file)
        setAvatar(image)
    }

    return (
        <form onSubmit={register}
            className='flex mt-[100px] flex-col gap-4 md:max-w-lg md:mx-auto mx-5 mt-6 p-5 bg-white shadow'>
            <h1 className='text-2xl font-bold'>Register</h1>
            <label htmlFor='upload'
                className=' mb-1 w-[80px] h-[80px] cursor-pointer hover:drop-shadow transition-all 
                        text-center flex flex-col items-center justify-center shadow shadow-slate-300 bg-slate-100 p-1 ' >
                {avatar ? <img className=' w-full h-full' src={avatar} /> : <>

                    <span className=' text-[14px]'>Upload avatar</span>
                </>}
                <input
                    onChange={(e) => handleUploadImage(e.target.files[0])}
                    type="file" id='upload' hidden className=' w-full h-full' />
            </label>
            <div>
                <input
                    type="text"
                    placeholder='Enter Name'
                    value={username}
                    required
                    autoComplete="new-password"
                    onChange={(e) => setUserName(e.target.value)}
                />

            </div>
            <p className={!nameValid && username !== '' ? 'show-error' : 'hide-error'}>
                Invalid Name.
                the total length to 4–24 characters.

                Keep it starting with a letter
            </p>
            <div>
                <input
                    type="email"
                    placeholder='Enter Email'
                    value={email}
                    required
                    autoComplete="new-password"
                    onChange={(e) => setEmail(e.target.value)}
                />

            </div>
            <p className={!validEmail && email !== '' ? 'show-error ' : 'hide-error'}>
                Invalid Email. Should be like user@something.com.
            </p>
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
            <p className={!validPass && pass !== '' ? 'show-error ' : 'hide-error'}>
                Invalid Password. Must contain uppercase, lowercase, special character, and be at least 8 characters long.
            </p>
            <input type="submit" value={'Submit'}
                className=' cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 ' />
            <p className=' text-center text-gray-600'>Have an Account?
                <Link className=' text-blue-500 hover:text-blue-600 font-bold underline ml-2' to={'/login'}>Sign in</Link></p>
        </form>
    );
}

export default Register;
