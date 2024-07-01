import { v2 as cloudinary } from "cloudinary";
import Blog from "@/models/blogModel";
import dbConnection from "@/config/dbConnect";
import { NextRequest, NextResponse } from "next/server";
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

export const PUT = async (req: NextRequest, context: { params: Params }) => {
  try {
    const body = await req.formData();
    const id = context.params.id;

    let title = body.get("title") as string | null;
    let caption = body.get("caption") as string | null;
    const img = body.get("img") as File | null;

    // Fetch the current blog details
    const currentBlog = await Blog.findById(id);
    if (!currentBlog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    // Assign default values if null
    if (title === null) {
      title = currentBlog.title; // Use existing title
    }

    if (caption === null) {
      caption = currentBlog.caption; // Use existing caption
    }

    const updateFields: { [key: string]: any } = {};

    if (title !== null) {
      updateFields.title = title;
    }

    if (caption !== null) {
      updateFields.caption = caption;
    }

    if (img) {
      const buffer = await img.arrayBuffer();

      // Function to upload buffer to Cloudinary
      const uploadToCloudinary = (): Promise<any> => {
        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: "image", public_id: `${title || "image"}` },
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

      try {
        const uploadResult = await uploadToCloudinary();
        updateFields.img = uploadResult.secure_url;
      } catch (uploadError) {
        console.error("Error uploading to Cloudinary:", uploadError);
        return NextResponse.json(
          { message: "Error saving image file" },
          { status: 500 }
        );
      }
    } else {
      // Use existing image if no new image is provided
      updateFields.img = currentBlog.img;
    }

    if (Object.keys(updateFields).length === 0) {
      return NextResponse.json(
        { message: "No fields to update" },
        { status: 400 }
      );
    }

    const blog = await Blog.findByIdAndUpdate(id, updateFields, { new: true });
    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Blog updated successfully", data: blog },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating blog:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
