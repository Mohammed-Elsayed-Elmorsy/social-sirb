
import Header from './components/Header/Header'
import { HashRouter as BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from "./pages/Login"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Register from './pages/Register'
import { useContext } from 'react'
import { UserContext } from './components/context/UserContext'
import { Toaster } from 'react-hot-toast';
import Notifications from './pages/Notifications'
const App = () => {
  const { user } = useContext(UserContext)
  return (

    <BrowserRouter>
      <Toaster />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        {/* protected routes */}
        <Route path='/notifications' element={user ? <Notifications /> : <Home />} />
        <Route path='/profile' element={user ? <Profile /> : <Home />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
