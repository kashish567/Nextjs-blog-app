import Blog from "@/models/blogModel";
import dbConnection from "@/config/dbConnect";
import { NextRequest,NextResponse } from "next/server";

dbConnection();

export const POST = async(req: NextRequest)=>{
    try {
        const body = await req.json();
        const {title,caption,image} = body;

        if(!title || !caption || !image){
            return NextResponse.json({message:"Please fill all the fields"}, {status:400})
        }

        const blog = new Blog({
            title,
            caption,
            image
        })
        await blog.save();

        return NextResponse.json({message:"Blog created successfully"}, {status:201})
    } catch (error:any) {
        return NextResponse.json({message:error.message}, {status:500})       
    }
}