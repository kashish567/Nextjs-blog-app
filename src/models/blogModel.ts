import mongoose from "mongoose";
 
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        required: true,
    },
    image :{
        type : String,
    },
    // user:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "users",
    // }
},{timestamps:true})

const Blog = mongoose.models.blogs || mongoose.model("blogs", blogSchema)
export default Blog;