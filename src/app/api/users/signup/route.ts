import dbConnection from "@/config/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs"

dbConnection()
export const POST= async(req : NextRequest)=>{
    try {
        const body = await req.json();
        const {username , email, password} = body;
        if(!username && !email && !password)
            return NextResponse.json({message : "Please enter all details"}, {status:400})
        const usernameExists = await User.findOne({username}) 
        if(usernameExists)
            return NextResponse.json({message : "Username already exists"}, {status:400})

        const emailExists = await User.findOne({email})
        if(emailExists)
            return NextResponse.json({message: "Email already exists"}, {status: 400})

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt)
        const user = new User({
            username,
            email,
            password : hashedPassword
        })
        await user.save()

        return NextResponse.json({message: "done"}, {status:200})
    } catch (error:any) {
        return NextResponse.json({message:error.message}, {status:500})
    }
}