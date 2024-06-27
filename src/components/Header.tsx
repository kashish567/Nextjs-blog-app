"use client";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react"; // Import useEffect and useState hooks
import { FaBloggerB } from "react-icons/fa";

const Header = () => {
  const [userId, setUserId] = useState(true);

  const router = useRouter();
  const logoutHandler = async () => {
    try {
      localStorage.removeItem("userId");
      const response = await axios.get("/api/users/logout");
      router.push("/login");
      setUserId(false);
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  // useEffect(() => {
  //   const storedUserId = localStorage.getItem("userId");
  //   if (!storedUserId) {
  //     router.push("/login"); // Redirect to login page if user is not authenticated
  //   } else {
  //     // setUserId(storedUserId); // Set userId if present
  //   }
  // }, []);

  console.log(userId);

  return (
    <div>
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-6 p-3">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-[#52307e] inline-flex items-center">
            <FaBloggerB className="mr-2 text-[#52307e] " size={30} /> BLOGZEE
          </span>

          {userId ? (
            <>
              <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <button
                  type="button"
                  onClick={logoutHandler}
                  className="text-black bg-gray-200 border border-black md:hover:bg-[#B388EB] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Logout
                </button>
                <button
                  data-collapse-toggle="navbar-sticky"
                  type="button"
                  className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  aria-controls="navbar-sticky"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 17 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1h15M1 7h15M1 13h15"
                    />
                  </svg>
                </button>
              </div>
              <div
                className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                id="navbar-sticky"
              >
                <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                  <li>
                    <Link
                      href="/"
                      className="block py-2 px-3 text-black text-lg font-bold bg-black rounded md:bg-transparent  md:hover:text-[#52307e] md:text-black md:p-0 md:dark:text-black"
                      aria-current="page"
                    >
                      Home
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/myblog"
                      className="block py-2 px-3 text-lg font-bold text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#52307e] md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      My Blogs
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/createblog"
                      className="block py-2 px-3 text-gray-900 text-lg font-bold rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#52307e] md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      Create Blog
                    </Link>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
