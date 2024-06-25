import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique : true
    },
    email: {
        type: String,
        required: true,
        unique : true
    },
    password: {
        type: String,
        required: true,
    },
    // blogs :[{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "blogs",
    // }]
}, {timestamps: true})

const User = mongoose.models.users || mongoose.model("users", userSchema)
export default User;