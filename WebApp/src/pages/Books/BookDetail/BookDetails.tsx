import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";

import { getBook } from "../../../apis/Book.api";
import { formatter } from "../../../utils/formatter";
import BookComment from "./BookComment";

const ReadMore = ({ children }: { children: string }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <p className="overflow-hidden pt-2 text-justify font-light">
      {text?.length >= 1000 ? (isReadMore ? text?.slice(0, 253) : text) : text}
      {text?.length >= 1000 ? (
        <span
          onClick={toggleReadMore}
          className="cursor-pointer text-lg font-semibold text-purple-800"
        >
          {isReadMore ? "...read more" : " show less"}
        </span>
      ) : (
        ""
      )}
    </p>
  );
};

function BookDetails() {
  let { bookId } = useParams();

  const { data } = useQuery({
    queryKey: ["book", bookId],
    queryFn: () => {
      return getBook(bookId);
    },
    staleTime: 5 * 60 * 1000
  });

  return (
    <>
      <div className="flex w-full items-center justify-center">
        <div className="center relative m-1 flex min-w-min max-w-[50%] flex-col justify-end break-words rounded-t-2xl rounded-b-2xl border border-neutral-200 p-4">
          <div className="flex flex-row">
            <img className="h-auto w-[30%]" src={data?.data.coverImage} />
            <div className="flex-auto p-4 text-xl">
              <div className="mb-2 flex flex-row">
                <div className="flex w-[30%] flex-row break-words pr-8 font-bold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="mt-0.5 h-6 w-6 fill-zinc-700"
                  >
                    <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
                  </svg>
                  <span className="pl-2 font-light text-zinc-700">Title</span>
                </div>
                <div className="break-words font-bold text-purple-500">
                  {data?.data.title}
                </div>
              </div>
              <div className="mb-2 flex flex-row">
                <div className="flex w-[30%] flex-row break-words pr-8 font-bold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-6 w-6 fill-zinc-700"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="pl-2 font-light text-zinc-700">Author</span>
                </div>
                <div className="break-words font-normal text-purple-500">
                  {data?.data.authorName}
                </div>
              </div>
              <div className="mb-2 flex flex-row">
                <div className="flex w-[30%] flex-row break-words pr-8 font-bold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-6 w-6 fill-zinc-700"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.25 2.25a3 3 0 00-3 3v4.318a3 3 0 00.879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 005.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 00-2.122-.879H5.25zM6.375 7.5a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="pl-2 font-light text-zinc-700">
                    Category
                  </span>
                </div>
                <div className="break-words font-normal text-purple-500">
                  {data?.data.categoryName}
                </div>
              </div>
              <div className="mb-2 flex flex-row">
                <div className="flex w-[30%] flex-row break-words pr-8 font-bold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="mt-0.5 h-6 w-6 fill-zinc-700"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.5 2.25a.75.75 0 000 1.5v16.5h-.75a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5h-.75V3.75a.75.75 0 000-1.5h-15zM9 6a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H9zm-.75 3.75A.75.75 0 019 9h1.5a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM9 12a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H9zm3.75-5.25A.75.75 0 0113.5 6H15a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM13.5 9a.75.75 0 000 1.5H15A.75.75 0 0015 9h-1.5zm-.75 3.75a.75.75 0 01.75-.75H15a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM9 19.5v-2.25a.75.75 0 01.75-.75h4.5a.75.75 0 01.75.75v2.25a.75.75 0 01-.75.75h-4.5A.75.75 0 019 19.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="pl-2 font-light text-zinc-700">
                    Publisher
                  </span>
                </div>
                <div className="break-words font-normal italic text-blue-600">
                  <a href={data?.data.publisherUrl} target="_blank">
                    {data?.data.publisherName}
                  </a>
                </div>
              </div>
              <div className="mb-2 flex flex-row">
                <div className="flex w-[30%] flex-row break-words pr-8 font-bold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="mt-0.5 h-6 w-6"
                  >
                    <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004zM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 01-.921.42z" />
                    <path
                      fillRule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.816a3.836 3.836 0 00-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 01-.921-.421l-.879-.66a.75.75 0 00-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 001.5 0v-.81a4.124 4.124 0 001.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 00-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 00.933-1.175l-.415-.33a3.836 3.836 0 00-1.719-.755V6z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <span className="pl-2 font-light text-zinc-700">Price</span>
                </div>
                <div className="break-words font-semibold text-purple-700">
                  {formatter.format(data?.data.price!)}
                </div>
              </div>
              <div className="mb-2 flex flex-row">
                <div className="flex w-[30%] flex-row break-words pr-8 font-bold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="mt-0.5 h-6 w-6"
                  >
                    <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
                  </svg>

                  <span className="pl-2 font-light text-zinc-700">
                    Total page
                  </span>
                </div>
                <div className="break-words font-semibold text-purple-700">
                  {data?.data.totalPage}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col pt-4">
            <div className="flex flex-row break-words border-b-2 border-purple-500 pb-2 font-bold text-purple-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6"
              >
                <path
                  fillRule="evenodd"
                  d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="pl-2 font-semibold uppercase">Description</span>
            </div>
            <ReadMore>{data?.data.description!}</ReadMore>
          </div>
        </div>
      </div>
      <BookComment bookId={bookId} />
    </>
  );
}

export default BookDetails;
