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
    console.log(context.params.id);
    const blogs = await Blog.findById(id).populate("user");
    console.log(blogs);
    return NextResponse.json({ data: blogs }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
