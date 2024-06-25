import User from "@/models/userModel";
import dbConnection from "@/config/dbConnect";
import { NextRequest, NextResponse } from "next/server";

dbConnection();

type Params ={
    id: string;
}

export const GET = async (req: NextRequest, context: {params: Params}) => {
    try {
        const user = await User.findById(context.params.id).select("-password");
        if(!user){
            return NextResponse.json({message : 'User not found'}, {status:404})
        }
        return NextResponse.json(user, {status:200})
    }catch(error:any){
        return NextResponse.json({message : error.message}, {status:500})
    }
}