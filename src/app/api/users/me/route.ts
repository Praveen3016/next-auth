import {connect}  from '@/dbConfig/dnConfig' 
import User from '@/models/userModel'
import { NextRequest , NextResponse } from 'next/server';
import { getTokenValue } from '@/helper/gettoken';

connect();

export async function POST(req :NextRequest ) {
    try {
    const id = await getTokenValue(req);
    console.log(id) 
    const user = await User.findOne({_id : id}).select("-password   ")
  console.log(user)
    return NextResponse.json(user)
    } catch (error : any) {
        return NextResponse.json({message : error.message} , { status : 500})
    }
}
