import { useNavigate } from "react-router-dom";

import { Book } from "../../types/Models.type";
import { formatter } from "../../utils/formatter";

function BookCard({ book }: { book: Book }) {
  let navigate = useNavigate();

  const goToBookDetail = () => {
    let path = `book/${book.bookId}`;
    navigate(path);
  };

  return (
    <div
      key={book.bookId}
      className="center relative m-1 flex min-w-min max-w-[18rem] flex-col justify-end break-words rounded-t-2xl rounded-b-2xl border border-neutral-400"
    >
      <img className="h-96 w-full rounded-t-2xl" src={book.coverImage} />
      <div className="flex flex-auto flex-col justify-between p-4">
        <div className="w-64 break-words font-bold">{book.title}</div>
        <p className="max-h-[70px] overflow-hidden font-light italic">
          {book.description}
        </p>
        <div>
          {book.rateAvarage >= 4.5 ? (
            <div className="w-64 break-words pt-4 font-bold text-red-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5 fill-red-500"
              >
                <path
                  fillRule="evenodd"
                  d="M13.5 4.938a7 7 0 11-9.006 1.737c.202-.257.59-.218.793.039.278.352.594.672.943.954.332.269.786-.049.773-.476a5.977 5.977 0 01.572-2.759 6.026 6.026 0 012.486-2.665c.247-.14.55-.016.677.238A6.967 6.967 0 0013.5 4.938zM14 12a4 4 0 01-4 4c-1.913 0-3.52-1.398-3.91-3.182-.093-.429.44-.643.814-.413a4.043 4.043 0 001.601.564c.303.038.531-.24.51-.544a5.975 5.975 0 011.315-4.192.447.447 0 01.431-.16A4.001 4.001 0 0114 12z"
                  clipRule="evenodd"
                />
              </svg>
              Hot
            </div>
          ) : null}

          {book.rateAvarage >= 4 && book.rateAvarage < 4.5 ? (
            <div className="w-64 break-words pt-4 font-bold text-red-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="mb-1 h-6 w-6 stroke-red-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                />
              </svg>
              Good
            </div>
          ) : null}

          <div className="w-64 break-words pt-4 font-normal">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="mb-1 h-5 w-5 fill-yellow-300"
            >
              <path
                fillRule="evenodd"
                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                clipRule="evenodd"
              />
            </svg>

            {book.rateAvarage > 0 ? +book.rateAvarage.toFixed(2) + "/5" : "-/5"}
          </div>
          <div className="w-64 break-words pt-1 font-bold">
            {formatter.format(book.price)}
          </div>
          <button
            type="button"
            className="btn group relative mt-3 inline-flex items-center justify-start overflow-hidden rounded-md bg-purple-100 py-2 px-4 transition-all hover:bg-white"
            onClick={goToBookDetail}
          >
            <span className="-z-1 absolute top-0 left-0 h-0 w-0 rounded bg-gradient-to-r from-purple-400 to-blue-500 transition-all duration-500 ease-out group-hover:h-full group-hover:w-full"></span>
            <span className="z-10 w-full text-black transition-colors duration-300 ease-in-out group-hover:text-white">
              See details
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
