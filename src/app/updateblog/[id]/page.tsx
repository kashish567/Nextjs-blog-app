"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Params {
  id: number;
}

interface UpdateBlogProps {
  params: Params;
}

interface BlogData {
  title: string;
  caption: string;
  imgUrl: string; // Store image URL
  img: File | null; // Make img property nullable
}

const UpdateBlog: React.FC<UpdateBlogProps> = ({ params }) => {
  const [blogData, setBlogData] = useState<BlogData>({
    title: "",
    caption: "",
    imgUrl: "", // Initialize imgUrl
    img: null, // Initialize img as null
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`/api/blogs/getblog/${params.id}`);
        if (res.status === 200) {
          const { title, caption, img } = res.data.data;
          setBlogData({ title, caption, imgUrl: img, img: null });
        } else {
          console.log(res.data.message);
        }
      } catch (error: any) {
        console.error("Error fetching blog:", error);
      }
    };
    fetchBlog();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", blogData.title);
      formData.append("caption", blogData.caption);
      if (blogData.img) {
        formData.append("img", blogData.img); // Append the file if it exists
      } else {
        formData.append("imgUrl", blogData.imgUrl); // Append the existing image URL if no new image is provided
      }

      const response = await axios.put(
        `/api/blogs/updateblog/${params.id}`,
        formData
      );
      if (response.status === 201) {
        setSuccess("Blog updated successfully!");

        setBlogData({ title: "", caption: "", imgUrl: "", img: null });
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
    <>
      <div className="flex items-center justify-center">
        <div className="px-4 py-24 sm:px-6 lg:px-8 h-[567px] w-[600px]">
          <div className="mx-auto pt-4 bg-[#3c4b9b] rounded-xl max-w-lg">
            <h1 className="text-center text-2xl font-bold text-white sm:text-3xl">
              Update your Blog
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
                <div>
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

              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-green-500 text-sm">{success}</p>}

              <button
                type="submit"
                className="block w-full rounded-lg text-black bg-gray-200 px-5 py-3 text-sm font-medium  hover:bg-gray-400"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateBlog;
