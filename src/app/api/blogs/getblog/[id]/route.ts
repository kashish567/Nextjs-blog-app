import Blog from "@/models/blogModel";
import dbConnection from "@/config/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

dbConnection();

type Params = {
    id: string;
  };

export const GET = async (req: NextRequest, context: { params: Params }) => {
    try {
        const id = new mongoose.Types.ObjectId(context.params.id);
        const blogs = await Blog.find({user:id}).populate("user");
        return NextResponse.json({ message: "All Blogs", data: blogs }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}