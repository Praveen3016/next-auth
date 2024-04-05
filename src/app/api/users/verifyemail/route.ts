import {connect}  from '@/dbConfig/dnConfig' 
import User from '@/models/userModel'
import { NextRequest , NextResponse } from 'next/server';

connect();

export async function POST(req :NextRequest ) {
    try {
        const {token} = await req.json();
        console.log(token)
        const user = await User.findOne({verifyToken : token ,
            verifyTokenExpiry : {$gt : Date.now()}})
        

        if(!user)
        {
            return NextResponse.json({message : "invalid token"} , { status : 400})
        }
        console.log(user)   

        user.isVerified = true
        user.verifyToken = undefined 
        user.verifyTokenExpiry = undefined

        await user.save();

        return NextResponse.json({message : "email varified successfully"} , { status : 200})

    } catch (error : any) {
        return NextResponse.json({message : error.message} , { status : 500})
    }
}
