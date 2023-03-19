import { useQuery } from "@tanstack/react-query";

import { getBookRatings } from "../../../apis/Book.api";
import UserComment from "./UserRating";

export interface CommentOfBook {
  bookId: string | undefined;
}

function BookComment({ bookId }: CommentOfBook) {
  const { data } = useQuery({
    queryKey: ["book", bookId, "comment"],
    queryFn: () => {
      return getBookRatings(bookId);
    },
    staleTime: 1000,
    refetchOnWindowFocus: false
  });

  return (
    <div className="flex w-full items-center justify-center">
      <div className="center relative m-1 flex w-[50%] min-w-min max-w-[50%] flex-col justify-end rounded-t-2xl rounded-b-2xl border border-neutral-200 p-4">
        <div className="flex flex-col">
          <div className="flex flex-row border-b-2 border-purple-500 pb-2 font-bold text-purple-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
            <span className="pl-2 font-semibold uppercase">Comment</span>
          </div>

          {/* User input comment */}
          <UserComment bookId={bookId} />

          {/* Book comment */}
          {data?.data.map((rating, index) => (
            <div
              key={index}
              className="mb-2 mt-2 flex flex-col border-b-[1px] pb-2"
            >
              <div className="flex flex-row">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6 stroke-2 text-purple-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                  />
                </svg>
                <span className="pl-2 font-medium">
                  {rating.user?.userName || "duynkce150247@fpt.edu.vn"}
                </span>
                <span className="pl-2 font-medium">
                  - Rate:{" "}
                  <b className="text-red-600">{rating.ratingStar || 5}</b>
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6 fill-yellow-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="mt-2 flex flex-row font-normal">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="pl-2">
                  {rating.ratingComment || "Good book! Nice to read!"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BookComment;
