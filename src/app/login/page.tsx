"use client";
import Link from "next/link";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";





export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
       
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    async  function onLogin(event :any){
        event.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            alert(response.data.message);
            router.push("/profile");
        } catch (error:any) {
            console.log("Login failed", error.message);
            alert(error);
        } finally{
        setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else{
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <>
    {/* <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{loading ? "Processing" : "Login"}</h1>
        <hr />
        
        <label htmlFor="email">email</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="email"
            />
        <label htmlFor="password">password</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="password"
            />
            <button
            onClick={onLogin}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Login here</button>
            <Link href="/signup">Visit Signup page</Link>
        </div> */}

        
        <div className="bg-black text-white flex min-h-screen flex-col items-center pt-16 sm:justify-center sm:pt-0">
  
        <div className="text-foreground font-semibold text-2xl tracking-tighter mx-auto flex items-center gap-2">
            Next | Authantication
        </div>
   
    <div className="relative mt-12 w-full max-w-lg sm:mt-10">
        <div className="relative -mb-px h-px w-full bg-gradient-to-r from-transparent via-sky-300 to-transparent"></div>
        <div
            className="mx-5 border dark:border-b-white/50 dark:border-t-white/50 border-b-white/20 sm:border-t-white/20 shadow-[20px_0_20px_20px] shadow-slate-500/10 dark:shadow-white/20 rounded-lg border-white/20 border-l-white/20 border-r-white/20 sm:shadow-sm lg:rounded-xl lg:shadow-none">
            <div className="flex flex-col p-6">
                <h3 className="text-xl font-semibold leading-6 tracking-tighter">{loading ? "Processing" : "Login"}</h3>
                <p className="mt-1.5 text-sm font-medium text-white/50">Welcome back, enter your credentials to continue.
                </p>
            </div>
            <div className="p-6 pt-0">
                <form>
                    <div>
                        <div>
                            <div
                                className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                                <div className="flex justify-between">
                                    <label
                                        className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">Email</label>
                                    <div className="absolute right-3 translate-y-2 text-green-200">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                            fill="currentColor" className="w-6 h-6">
                                            <path fillRule="evenodd"
                                                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                                                clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                                <input type="text" name="username" placeholder="Email"
                                    autoComplete="off"
                                    value={user.email}
                                    onChange={(e) => setUser({...user, email: e.target.value})}
                                    className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:font-medium placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground" />
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div>
                            <div
                                className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                                <div className="flex justify-between">
                                    <label
                                        className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">Password</label>
                                </div>
                                <div className="flex items-center">
                                    <input type="password" name="password"
                                     value={user.password}
                                     onChange={(e) => setUser({...user, password: e.target.value})}
                                        className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" name="remember"
                                className="outline-none focus:outline focus:outline-sky-300" />
                            <span className="text-xs">Remember me</span>
                        </label>
                        <a className="text-sm font-medium text-foreground underline" href="#">Forgot
                            password?</a>
                    </div>
                    <div className="mt-4 flex items-center justify-end gap-x-2">
                        <Link className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:ring hover:ring-white h-10 px-4 py-2 duration-200"
                            href="/signup">Register</Link>
                        <button
                            className="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2"
                            onClick={(e)=> onLogin(e)}
                            >Log in</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

        </>
    )

}