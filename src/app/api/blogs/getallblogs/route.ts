import Blog from "@/models/blogModel";
import dbConnection from "@/config/dbConnect";
import { NextRequest, NextResponse } from "next/server";

dbConnection();
export const GET=async(req : NextRequest)=>{
    try{
        const blogs = await Blog.find();
        return NextResponse.json({message:"All Blogs",data:blogs},{status:200});
    }catch(error:any){
        return NextResponse.json({message:error.message},{status:500});
    }
}