"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const CreateBlog = () => {
  const router = useRouter();
  const [blogData, setBlogData] = useState({ title: "", caption: "", img: "" });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Fetch user ID from cookies
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setError("User not authenticated.");
      return;
    }

    try {
      const response = await axios.post(
        `/api/blogs/createblog/${userId}`,
        blogData
      );
      if (response.status === 201) {
        setSuccess("Blog created successfully!");

        setBlogData({ title: "", caption: "", img: "" });
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
    <div className="flex items-center justify-center ">
      <div className="px-4 py-24 sm:px-6 lg:px-8 h-[580px] w-[600px]">
        <div className="mx-auto pt-3 rounded-xl max-w-lg bg-white">
          <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
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
              <div className="relative">
                <input
                  name="title"
                  value={blogData.title}
                  onChange={(e) =>
                    setBlogData({ ...blogData, title: e.target.value })
                  }
                  type="text"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter title for your blog"
                />
              </div>
            </div>
            <div>
              <label htmlFor="caption" className="sr-only">
                Caption
              </label>
              <div className="relative">
                <textarea
                  name="caption"
                  value={blogData.caption}
                  onChange={(e) =>
                    setBlogData({ ...blogData, caption: e.target.value })
                  }
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter caption for your blog"
                />
              </div>
            </div>
            <div>
              <label htmlFor="img" className="sr-only">
                Image
              </label>
              <div className="relative">
                <input
                  name="img"
                  value={blogData.img}
                  onChange={(e) =>
                    setBlogData({ ...blogData, img: e.target.value })
                  }
                  type="text"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter Image link"
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}

            <button
              type="submit"
              className="block w-full rounded-lg bg-indigo-400 px-5 py-3 text-sm font-medium text-white hover:bg-blue-600"
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
