import User from "@/models/userModel";
import dbConnection from "@/config/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import Blog from "@/models/blogModel";
import mongoose from "mongoose";

dbConnection();

type Params = {
  id: string;
};

export const POST = async (req: NextRequest, context: { params: Params }) => {
    try {
        const body = await req.json();
        const id = new mongoose.Types.ObjectId(context.params.id);

        const { title, caption, img } = body;
        if (!title || !caption || !img) {
            return NextResponse.json(
                { message: "Please fill all fields" },
                { status: 400 }
            );
        }

        const user = await User.findById(id);
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const blog = new Blog({ title, caption, img, user: user._id });
        console.log(blog.user)
        await blog.save();


        user.blogs.push(blog._id);
        await user.save();

        return NextResponse.json(
            { message: "Blog created successfully", data: blog },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
};