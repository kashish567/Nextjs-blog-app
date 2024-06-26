import dbConnection from "@/config/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

dbConnection();
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { email, password } = body;
    if (!email && !password)
      return NextResponse.json(
        { message: "Please enter all details" },
        { status: 400 }
      );

    const user = await User.findOne({ email });
    if (!user)
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 400 }
      );

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch)
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    const res = NextResponse.json(
      { message: `Welcome back ${user.username}`, success: true },
      { status: 200 }
    );

    // Set the cookie
    res.cookies.set("id", user._id, { httpOnly: true });

    return res;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
