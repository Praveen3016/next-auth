import {connect}  from '@/dbConfig/dnConfig' 
import { NextRequest , NextResponse } from 'next/server';
import jwt from 'jsonwebtoken'

connect();

export async function getTokenValue(req :NextRequest ) {
try {
    const token =   req.cookies.get("token")?.value || ""

    const decodedToken:any  =  jwt.verify(token , process.env.SECRET_TOKEN!)
    console.log(decodedToken)
    return decodedToken.id
} catch (error : any) {
    throw new Error(error.message)
}

   
}