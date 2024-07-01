import { v2 as cloudinary } from "cloudinary";
import Blog from "@/models/blogModel";
import dbConnection from "@/config/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import mongoose from "mongoose";
import streamifier from "streamifier";

dbConnection();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type Params = {
  id: string;
};

export const POST = async (req: NextRequest, context: { params: Params }) => {
  try {
    const body = await req.formData();
    const id = new mongoose.Types.ObjectId(context.params.id);

    let title = body.get("title") as string;
    const caption = body.get("caption") as string;
    const img = body.get("img") as File;

    if (!title || !caption || !img) {
      return NextResponse.json(
        { message: "Please fill all fields" },
        { status: 400 }
      );
    }

    // Sanitize title to remove leading/trailing whitespaces
    title = title.trim();

    // Convert file to buffer
    const buffer = await img.arrayBuffer();

    // Function to upload buffer to Cloudinary
    const uploadToCloudinary = (): Promise<any> => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: "image", public_id: `${title}` },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );

        streamifier.createReadStream(Buffer.from(buffer)).pipe(uploadStream);
      });
    };

    const uploadResult = await uploadToCloudinary();

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const blog = new Blog({
      title,
      caption,
      img: uploadResult.secure_url,
      user: user._id,
    });
    await blog.save();

    user.blogs.push(blog._id);
    await user.save();

    return NextResponse.json(
      { message: "Blog created successfully", data: blog },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating blog:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
