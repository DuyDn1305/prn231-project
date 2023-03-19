import { useNavigate } from "react-router-dom";

import { formatter } from "../../utils/formatter";

interface Book {
  bookId: number;
  title: string;
  description: string;
  coverImage: string;
  price: number;
}

function BookCard({ bookId, title, description, coverImage, price }: Book) {
  let navigate = useNavigate();

  const goToBookDetail = () => {
    let path = `book/${bookId}`;
    navigate(path);
  };

  return (
    <div
      key={bookId}
      className="center relative m-1 flex min-w-min max-w-[18rem] flex-col justify-end break-words rounded-t-2xl rounded-b-2xl border border-neutral-400"
    >
      <img
        className="h-96 w-full rounded-t-2xl rounded-b-2xl"
        src={coverImage}
      />
      <div className="flex flex-auto flex-col justify-between p-4">
        <div className="w-64 break-words font-bold">{title}</div>
        <p className="max-h-[70px] overflow-hidden font-light italic">
          {description}
        </p>
        <div>
          <div className="w-64 break-words pt-4 font-bold">
            {formatter.format(price)}
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
