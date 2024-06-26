import Link from "next/link";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

interface Cards {
  id: string;
  title: string;
  image: string;
  caption: string;
  username: string; // Add username to the props
}

const Cards: React.FC<Cards> = ({ id, title, caption, image, username }) => {
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
    <div className="mt-20 mx-6 mb-4">
      <article className="flex bg-white transition hover:shadow-xl">
        <div className="hidden sm:block sm:basis-56">
          <Image
          height={100}
          width={100}
            alt=""
            src={image}
            className="aspect-square h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col justify-between">
          <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
            <a href="#">
              <h1 className="font-bold text-2xl uppercase text-black">
                {username}
              </h1>
              <hr className=" border border-slate-600 " />
              <h3 className="font-bold mt-2 uppercase text-gray-900">
                {title}
              </h3>
            </a>

            <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
              {caption}
            </p>
          </div>

          {pathName === "/myblog" && (
            <div className="sm:flex sm:items-end sm:justify-end">
              <button
                onClick={handleDelete}
                className="block bg-red-500 mx-4 mb-6 px-5  py-3 text-center text-xs font-bold uppercase text-white transition hover:bg-yellow-400"
              >
                Delete Blog
              </button>
              <Link
                href={`/updateblog/${id}`}
                className="block bg-yellow-300 px-5 py-3 mr-6 mb-6 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-400"
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

