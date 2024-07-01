"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Use useRouter from 'next/router'
import { NextPage } from "next";

interface BlogData {
  title: string;
  caption: string;
  img: File | null; // Make img property nullable
}

const CreateBlog: NextPage = () => {
  const router = useRouter();
  const [blogData, setBlogData] = useState<BlogData>({
    title: "",
    caption: "",
    img: null, // Initialize img as null
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Fetch user ID from cookies or local storage
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setError("User not authenticated.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", blogData.title);
      formData.append("caption", blogData.caption);
      if (blogData.img) {
        formData.append("img", blogData.img); // Append the file if it exists
      }

      const response = await axios.post(
        `/api/blogs/createblog/${userId}`,
        formData
      );
      if (response.status === 201) {
        setSuccess("Blog created successfully!");

        setBlogData({ title: "", caption: "", img: null });
        router.push("/");
      } else {
        setError(response.data.message || "Something went wrong.");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || err.message || "An error occurred."
      );
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto pt-3 rounded-xl max-w-lg bg-purple-500">
          <h1 className="text-center text-2xl my-3 font-bold text-white sm:text-3xl">
            Create your Blog
          </h1>

          <form
            onSubmit={handleSubmit}
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
          >
            <div>
              <label htmlFor="title" className="sr-only">
                Title
              </label>
              <div className="flex">
                <input
                  name="title"
                  value={blogData.title}
                  onChange={(e) =>
                    setBlogData({ ...blogData, title: e.target.value })
                  }
                  type="text"
                  className="w-full rounded-lg p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter title for your blog"
                />
              </div>
            </div>
            <div>
              <label htmlFor="caption" className="sr-only">
                Caption
              </label>
              <div className="flex">
                <textarea
                  name="caption"
                  value={blogData.caption}
                  onChange={(e) =>
                    setBlogData({ ...blogData, caption: e.target.value })
                  }
                  className="w-full rounded-lg p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter caption for your blog"
                />
              </div>
            </div>
            <div>
              <label htmlFor="img" className="sr-only">
                Image
              </label>
              <div className="flex">
                <input
                  name="img"
                  onChange={(e) =>
                    setBlogData({
                      ...blogData,
                      img: e.target.files?.[0] || null,
                    })
                  }
                  type="file"
                  className="w-full rounded-lg hover:bg-neutral-50 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter Image link"
                />
              </div>
            </div>

            {error && <p className="text-red-700 font-bold text-sm">{error}</p>}
            {success && (
              <p className="text-green-700 font-bold text-sm">{success}</p>
            )}

            <button
              type="submit"
              className="block w-full rounded-lg text-black bg-gray-200 px-5 py-3 text-sm font-medium hover:bg-gray-400"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
