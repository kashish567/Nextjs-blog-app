"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cards from "@/components/Cards";

interface Blogs {
  _id: string;
  title: string;
  img: string;
  caption: string;
  user: {
    username: string;
  };
}

const MyBlog = () => {
  const [blogs, setBlogs] = useState<Blogs[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const userId = localStorage.getItem("userId");
      try {
        const res = await axios.get(`/api/blogs/getblog/${userId}`);
        if (res.status === 200) {
          setBlogs(res.data.data);
          console.log(res.data.data);
        } else {
          console.log(res.data.message);
        }
      } catch (error: any) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div>
      {blogs.length > 0 ? (
        <div className="mt-20 h-auto">
          {blogs.map((blog) => (
            <Cards
              username={blog.user.username}
              key={blog._id}
              id={blog._id}
              title={blog.title}
              image={blog.img}
              caption={blog.caption}
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen mt-24 text-4xl text-black">
          No blogs available
        </div>
      )}
    </div>
  );
};

export default MyBlog;
