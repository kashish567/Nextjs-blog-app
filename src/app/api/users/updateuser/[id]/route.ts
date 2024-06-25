import User from "@/models/userModel";
import dbConnection from "@/config/dbConnect";
import { NextRequest, NextResponse } from "next/server";

dbConnection();

type Params = {
  id: string;
};

export const PUT = async (req: NextRequest, context: { params: Params }) => {
  try {
    const body = await req.json();
    const user = await User.findByIdAndUpdate(context.params.id, body, {
      new: true,
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "User updated successfully", updateduser: user },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
