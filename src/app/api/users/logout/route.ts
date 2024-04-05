import {connect}  from '@/dbConfig/dnConfig' 
import User from '@/models/userModel'
import { NextRequest , NextResponse } from 'next/server';
import jwt from 'jsonwebtoken'

connect();

export async function POST(req :NextRequest ) {
    try {
        
        const response =  NextResponse.json({message : "loged out  successfully"} , { status : 200})

        response.cookies.set("token" , "" , {
          httpOnly : true
        })
      return response

    } catch (error : any) {
        return NextResponse.json({message : error.message} , { status : 500})
    }
}
