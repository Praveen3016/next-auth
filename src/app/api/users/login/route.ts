import {connect}  from '@/dbConfig/dnConfig' 
import User from '@/models/userModel'
import { NextRequest , NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect();

export async function POST(req :NextRequest ) {
    try {
        
        const {email , password} = await req.json();

        if(!email || !password)
        {
            return NextResponse.json({message : "Enter Details" , status : 400} , { status : 200})
        }

        const user = await User.findOne({email});

        if(!user)
        {
            return NextResponse.json({message : "Invalid email" , status : 400} , { status : 200})
        }

       const comparepass = await bcryptjs.compare(password, user.password)

       if(comparepass != true)
       {
        return NextResponse.json({message : "Invalid Password" , status : 400} , { status : 200})
       }
       const tokendata = {
        id : user._id,
        name : user.username ,
        email : user.emai
       }

       const token = await jwt.sign(tokendata, process.env.SECRET_TOKEN! , {expiresIn : '1d'})

    
      const response =  NextResponse.json({message : "loged in  successfully"} , { status : 200})

      response.cookies.set("token" , token , {
        httpOnly : true
      })

      return response

    } catch (error : any) {
        return NextResponse.json({message : error.message} , { status : 500})
    }
}
