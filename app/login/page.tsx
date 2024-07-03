"use client"
import { useState } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../globals.css'
import { login } from '../action/login_action';
import { auth } from '@/utils/firebaseConfig';
import { redirect } from 'next/navigation';
import Swal from 'sweetalert2'

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const Swal = require('sweetalert2')
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    console.log(auth.currentUser)
    // if (auth.currentUser) {
    //     console.log("User is already authenticated, redirecting to home page");
    //     window.location.href = '/';
    //     return;
    //   }
    return (
        <div className="h-full flex items-center justify-center w-full">

            <div className="w-10/12 md:w-7/12 xl:w-9/12 m-auto block xl:flex ">
                <div className='w-full p-3 rounded-2xl xl:rounded-none xl:rounded-s-2xl' style={{ backgroundColor: "#404C5E" }}>
                    {/* logo */}
                    <div className="ms-3 mt-3 flex items-center">
                        <img src="mystroke.png" alt="MyStroke Logo" className="h-10 w-10 mr-4 rounded-full" />
                        <span className="text-white text-lg">MyStroke</span>
                    </div>

                    {/* login */}
                    <div className="flex justify-center items-center mt-3 p-3">
                        <form action={login}>
                            <div className=" text-white p-8 rounded-lg shadow-lg" style={{backgroundColor: "#2E3F52"}}>
                                <h1 className="text-lg xl:text-2xl font-bold mb-4">Hey, Welcome!</h1>
                                <p className=" mb-6  xl:rounded-e-2xl hidden xl:block">Please enter your Doctor’s ID and password to enter the website.</p>
                                <div className="mb-4">
                                    <label className="block text-gray-500 text-sm" htmlFor="doctorId">
                                        Email doctor
                                    </label>
                                    <input
                                        name='emailDoctor'                                        
                                        className=" border-none focus:border-none active:border-none bg-transparent active:outline-none w-full py-2 text-white focus:outline-none"
                                        id="doctorId"
                                        type="email"
                                        placeholder="Doctor’s ID"
                                        autoComplete='off'
                                        style={{borderBottom: "1px solid #647B9B"}}
                                    />
                                </div>

                                <div className="mb-4 relative">
                                    <label className="block  text-gray-500 text-sm " htmlFor="password">
                                        Password
                                    </label>
                                    <input
                                        name='passwordDoc'
                                        className=" border-none focus:border-none active:border-none bg-transparent active:outline-none w-full py-2 pr-10 text-white focus:outline-none"
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Password"
                                        style={{borderBottom: "1px solid #647B9B"}}
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                        <button type="button" onClick={togglePasswordVisibility} className="focus:outline-none">
                                        <i className={`mt-8 fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-gray-500`}></i>
                                        </button>
                                    </div>
                                    </div>
                                <div className="mb-4">
                                    <a href="#" className="text-blue-400 hover:text-blue-500 text-sm float-right">
                                        Forget Password?
                                    </a>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full mt-5 mb-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            >
                                Log in
                            </button>
                        </form>                        
                    </div>
                </div>

                {/* fordoctor */}
                <div className='w-full p-5 rounded-none xl:rounded-e-2xl hidden xl:block' style={{ backgroundColor: "#2E3F52" }}>
                    <p className="float-end text-gray-500 text-lg ">For Doctor</p> 

                    {/* imgae */}
                    <div className='w-full h-full flex items-center justify-center'>
                        <img src="Women working on laptop.png" alt="MyStroke Logo" className="w-full" />
                    </div>
                </div>

                    
            </div>

        </div>
    )
}

