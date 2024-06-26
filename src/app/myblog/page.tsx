"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cards from "@/components/Cards";

interface Blogs {
  _id: string;
  title: string;
  img: string;
  caption: string;
}

const page = () => {
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
        <div className="mt-20">
          {blogs.map((blog) => (
            <Cards
              key={blog._id}
              id={blog._id}
              title={blog.title}
              image={blog.img}
              caption={blog.caption}
            />
          ))}
        </div>
      ) : (
        <>No blogs available</>
      )}
    </div>
  );
};

export default page;
