import User from "@/models/userModel";
import dbConnection from "@/config/dbConnect";
import { NextRequest, NextResponse } from "next/server";

dbConnection();

export const GET = async (req: NextRequest) => {
  try {
    const users = await User.find().select("-password");
    return NextResponse.json(users, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
