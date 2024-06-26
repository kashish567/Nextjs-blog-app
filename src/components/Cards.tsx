import Link from "next/link";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";

interface Cards {
  id: string;
  title: string;
  image: string;
  caption: string;
}

const Cards: React.FC<Cards> = ({ id, title, caption, image }) => {
  const router = useRouter();
  const pathName = usePathname();
  console.log(pathName);

  const handleDelete = () => {
    axios
      .delete(`/api/blogs/deleteblog/${id}`)
      .then((res) => {
        console.log(res.data.message);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  return (
    <div className="mt-20">
      <article className="flex bg-white transition hover:shadow-xl">
        <div className="hidden sm:block sm:basis-56">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1609557927087-f9cf8e88de18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
            className="aspect-square h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col justify-between">
          <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
            <a href="#">
              <h3 className="font-bold uppercase text-gray-900">{title}</h3>
            </a>

            <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
              {caption}
            </p>
          </div>

          {pathName === "/myblog" && (
            <div className="sm:flex sm:items-end sm:justify-end">
              <button
                onClick={handleDelete}
                className="block bg-red-500 mx-4 px-5 py-3 text-center text-xs font-bold uppercase text-white transition hover:bg-yellow-400"
              >
                Delete Blog
              </button>
              <Link
                href={`/updateblog/${id}`}
                className="block bg-yellow-300 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-400"
              >
                Update Blog
              </Link>
            </div>
          )}
        </div>
      </article>
    </div>
  );
};

export default Cards;
