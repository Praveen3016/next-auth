"use client";
import axios from "axios";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";


export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState("nothing")
    const [isDark, setisdark] = useState(false)

    const isDarkMode = () => {
		isDark == true ? setisdark(false) : setisdark(true) ;
	};

    const logout = async () => {
        try {
            await axios.post('/api/users/logout')
            toast.success('Logout successful')
            router.push('/login')
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }
useEffect(()=> {
    const getUserDetails = async () => {
        const res = await axios.post('/api/users/me')
        console.log(res.data);
        setData(res.data.username)
    }
    getUserDetails();
})
    

    return (
        <>
         <div className="flex flex-col items-center justify-center min-h-screen py-2">
           {/* <h1 className="fs-6">Profile</h1>
            <hr />
            <p>Profile page</p>
            <h2 className="p-1 rounded bg-green-500">{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}
            </Link>}</h2>
        <hr />
        <button
        onClick={logout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >Logout</button> */}

        {/* <button
        onClick={getUserDetails}
        className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >GetUser Details</button> */}


            <h1 className="text-6xl mb-8">Next | Authantication</h1>
            <Link href='https://github.com/Praveen3016' className="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2">praveen - Github</Link>
            
            </div>

            {/* bfssfsd */}

            <header className={isDark ? 'dark' : ''}>
    <nav className="fixed inset-x-0 top-0 z-10 w-full px-4 py-1 bg-white shadow-md border-slate-500 dark:bg-[#0c1015] transition duration-700 ease-out">
        <div className="flex justify-between p-4">
            <div className="text-[2rem] leading-[3rem] tracking-tight font-bold text-black dark:text-white">
            Next | Auth
            </div>
            <div className="flex items-center space-x-4 text-lg font-semibold tracking-tight">
                <p className="px-6 py-2 text-black transition duration-700 ease-out bg-white border border-black rounded-lg hover:bg-black hover:border hover:text-white dark:border-white dark:bg-inherit dark:text-white dark:hover:bg-white dark:hover:text-black">
               Welcome {data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}
            </Link>}
                </p>
                <button   onClick={logout} className="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2">
                    Logout
                </button>
            </div>
        </div>
    </nav>

    
</header>

            </>
    )
}