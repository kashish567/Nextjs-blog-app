import dbConnection from "@/config/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs"

dbConnection()
export const POST=(req : NextRequest)=>{
    
}