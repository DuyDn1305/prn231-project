import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

import {
  getBooksByName,
  getBooksOfUser,
  getBooksOfUserByName
} from "../../apis/Book.api";
import { Book } from "../../types/Models.type";
import BookCard from "../Books/BookCard";

function UserBooks() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState<Book[] | undefined>();
  const [pageCount, setPageCount] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [isSearch, setIsSearch] = useState(false);

  let searchKey = useRef("");

  const { refetch, isLoading } = useQuery({
    queryKey: ["books", "paginate", "user"],
    queryFn: () => {
      return getBooksOfUser(
        localStorage["username"],
        itemsPerPage,
        currentPage === 1 ? 1 + "" : (currentPage - 1) * itemsPerPage + 1 + ""
      );
    },
    onSuccess: (data) => {
      setCurrentItems(data?.data.books);
      setTotalItems(data?.data.pageInfo.count);
      setPageCount(Math.ceil(data?.data.pageInfo.count / itemsPerPage));
    },
    refetchOnWindowFocus: false,
    retry: 0
  });

  const searchBook = useQuery({
    queryKey: ["books", "search", "user", "bookName"],
    queryFn: () => {
      const controller = new AbortController();
      setTimeout(() => {
        controller.abort();
      }, 5000);
      return getBooksOfUserByName(
        localStorage["username"],
        itemsPerPage,
        currentPage === 1 ? 1 + "" : (currentPage - 1) * itemsPerPage + 1 + "",
        searchKey.current
      );
    },
    onSuccess: (data) => {
      setCurrentItems(data?.data.books);
      setTotalItems(data?.data.pageInfo.count);
      setPageCount(Math.ceil(data?.data.pageInfo.count / itemsPerPage));
    },
    refetchOnWindowFocus: false,
    retry: 0,
    enabled: false
  });

  const handleSearchingBook = () => {
    if (searchKey.current === "") return;
    setIsSearch(true);
    searchBook.refetch();
  };

  useEffect(() => {
    if (isSearch) {
      searchBook.refetch();
    } else {
      refetch();
    }
  }, [currentPage, itemsPerPage]);

  return (
    <>
      <div className="mb-5 flex justify-center text-center">
        <div className="hover:opt-drop-shadow focus-within:opt-drop-shadow flex min-h-[50px] w-[100px] items-center justify-center gap-2 rounded-full p-3 outline outline-1 outline-cyan-500 transition-all duration-300 focus-within:w-[400px] focus-within:outline-2 hover:outline-cyan-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="text"
            className="w-full focus:outline-none"
            placeholder="Search..."
            onKeyUp={(e) => {
              if (e.key === "Enter") handleSearchingBook();
            }}
            onChange={(e) => {
              searchKey.current = e.target.value;
              if (e.target.value === "") {
                setIsSearch(false);
                refetch();
              }
            }}
          />
        </div>
      </div>

      <div className="flex justify-center text-center">
        {isLoading && (
          <div role="status" className="mt-6 animate-pulse">
            <div className="mb-4 h-4  rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mb-2.5 h-10 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-10  rounded bg-gray-200 dark:bg-gray-700" />
            <span className="sr-only">Loading...</span>
          </div>
        )}
        <div className="grid gap-4 pb-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {currentItems?.map((colBook, index: number) => (
            <BookCard key={index} book={colBook} />
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-sm text-gray-700 dark:text-gray-400">
          <span className="font-semibold text-gray-900 dark:text-white">
            {currentPage === 1 ? 1 : (currentPage - 1) * itemsPerPage + 1}
          </span>{" "}
          to{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {currentPage !== pageCount
              ? (currentPage - 1) * itemsPerPage + currentItems?.length! + ""
              : totalItems}
          </span>{" "}
          Books{" - "} Page:{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {currentPage}/{pageCount}
          </span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(parseInt(e.target.value));
              setCurrentPage(1);
              if (isSearch) {
                console.log("re searching...");
                searchBook.refetch();
              } else {
                refetch();
              }
            }}
            className="ml-2 rounded-sm border-2 border-gray-700 p-1"
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="32">32</option>
            <option value="64">64</option>
          </select>
        </span>
        <div className="xs:mt-0 mt-2 inline-flex">
          {currentPage === 1 ? (
            <button className="inline-flex cursor-default items-center rounded-l bg-gray-300 px-4 py-2 text-sm font-medium text-white">
              <svg
                aria-hidden="true"
                className="mr-2 h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Prev
            </button>
          ) : (
            <button
              className="inline-flex items-center rounded-l bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={(e) => setCurrentPage(currentPage - 1)}
            >
              <svg
                aria-hidden="true"
                className="mr-2 h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Prev
            </button>
          )}
          {currentPage < pageCount ? (
            <button
              className="inline-flex items-center rounded-r border-0 border-l border-gray-700 bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={(e) => setCurrentPage(currentPage + 1)}
            >
              Next
              <svg
                aria-hidden="true"
                className="ml-2 h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          ) : (
            <button className="inline-flex cursor-default items-center rounded-l bg-gray-300 px-4 py-2 text-sm font-medium text-white">
              Next
              <svg
                aria-hidden="true"
                className="ml-2 h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default UserBooks;
