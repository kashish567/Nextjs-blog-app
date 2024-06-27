"use client";

import { useState, useEffect } from "react";
import Cards from "@/components/Cards";
import axios, { AxiosResponse } from "axios";
import { ToastContainer } from "react-toastify";

interface Blogs {
  _id: string;
  title: string;
  img: string;
  caption: string;
  user: {
    username: string;
  };
}

export default function Home() {
  const [blogs, setBlogs] = useState<Blogs[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res: AxiosResponse<{ data: Blogs[]; message: string }> =
          await axios.get("/api/blogs/getallblogs");
        if (res.status === 200) {
          setBlogs(res.data.data);
          console.log(res.data.data);
        } else {
          setError(res.data.message);
          console.log(res.data.message);
        }
      } catch (error: any) {
        setError(error.message);
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <ToastContainer position="bottom-right" theme="dark" />
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <Cards
            key={blog._id}
            id={blog._id}
            title={blog.title}
            image={blog.img}
            caption={blog.caption}
            username={blog.user.username} // Pass the username to the Cards component
          />
        ))
      ) : (
        <div>No blogs available</div>
      )}
    </>
  );
}
