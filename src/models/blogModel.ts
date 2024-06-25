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
})

const Blog = mongoose.models.blogs || mongoose.model("blogs", blogSchema)
export default Blog;