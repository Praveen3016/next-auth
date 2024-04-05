import {connect}  from '@/dbConfig/dnConfig' 
import User from '@/models/userModel'
import  bcryptjs from 'bcryptjs'
import { NextRequest , NextResponse } from 'next/server';
import { sendEmail } from '@/helper/mailer';

connect();

    export async function POST(req :NextRequest ) {

        try {
            const reqbody = await req.json();
            const {username , email , password} =  reqbody
            
            const user = await User.findOne({email : email})
        
            if(user)    
            {
                return NextResponse.json({error : "user already exist " }, {status : 400})
            }
            
            const salt = await bcryptjs.genSalt(10);
            const hashedpassword =  bcryptjs.hash(password, salt)
        
           const newuser = await new User({
                username, 
                email ,
                password : (await hashedpassword).toString()
            })
            const saveduser = await newuser.save();
            console.log(saveduser)
        
            //send email
           await sendEmail({email , emailType : "VERIFY" , userId : saveduser._id});

            return NextResponse.json({message : "user created",
        saveduser}, {status : 201}) 
        } catch (error) {
            return NextResponse.json({message : "error in user create" , error}, {status : 400}) 
        }

    }
