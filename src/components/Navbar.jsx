import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import {UserAuth} from '../context/AuthContext'

function Navbar() {

    const [nav, setNav] = useState(false)
    const {user, logout} = UserAuth()
    const navigate = useNavigate()

    const handleNav = () => {
        setNav(!nav)
    }

    const handleSignOut = async () => {
        try {
          await logout();
          navigate('/');
        } catch (e) {
          console.log(e.message);
        }
    }


    return (
        <div className='rounded-div flex  items-center justify-between h-20 font-bold'> 

            {/* logo text  */}
            <Link to='/'>
                <h1 className='text-2xl'>Crypto</h1>
            </Link>

            <div className='hidden md:block'>
                <ThemeToggle />
            </div>

            {/* dark or light mod trigger  */}
            {user.email ? (
               <div>
                   <Link className='p-4' to='/account'>Account</Link>
                   <button onClick={handleSignOut}>Sign Out</button>
               </div> 
            ) : (
                <div className='hidden md:block'>
                    <Link to='/signin' className='p-4 hover:text-accent'>SignIn</Link>
                    <Link to='/signup' className='bg-button text-btnText px-5 py-2 ml-2 rounded-2xl shadow-lg  hover:shadow-2xl'>SignUp</Link>
                </div>
            )}


            {/* menu icon  */}
            <div onClick={handleNav} className='block md:hidden cursor-pointer z-10 ' >
                {
                    nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25}/>  
                }
            </div>




            {/* mobil menu  */}
             <div className={nav ? 'md:hidden fixed left-0 top-20 flex flex-col items-center justify-between w-full h-[90%] bg-primary ease-in duration-300 z-10' : 'fixed left-[-100%] top-20 h-[90%] flex flex-col items-center justify-between ease-in duration-300'}>
                 <ul className='w-full p-4 '>
                     <li className='border-b py-6'>
                         <Link to='/'>Home</Link>
                     </li>
                     <li className='border-b py-6'>
                         <Link to='/account'>Account</Link>
                     </li>
                     <li className=' py-6'>
                         <ThemeToggle />
                     </li>
                 </ul>

                 <div className='flex flex-col w-full p-4'>
                     <Link to='/signin'>
                         <button className='w-full my-2 p-3 bg-primary text-primary border border-secondary rounded-2xl shadow-xl '>SignIn</button>
                     </Link>
                     <Link to='/signup'>
                         <button className='w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl'>SignUp</button>
                     </Link>
                 </div>
             </div>
        </div>
    )
}

export default Navbar