import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { Rating } from "react-simple-star-rating";

import { postRating } from "../../../apis/Book.api";
import { notifyDefault, notifyError } from "../../../components/Notification";
import { CommentOfBook } from "./BookComment";

function UserComment({ bookId, refetchBook }: CommentOfBook) {
  const [rating, setRating] = useState(0);
  const [isEmptyComment, setIsEmptyComment] = useState(false);
  const [isRatingStar, setIsRatingStar] = useState(false);

  let commentContent = useRef("");
  let clearCommentContent = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => {
      return postRating({
        rateId: 0,
        bookId: parseInt(typeof bookId === "string" ? bookId : "0"),
        book: null,
        userId: parseInt(localStorage["userId"]),
        user: null,
        ratingStar: rating,
        ratingComment: commentContent.current
      });
    },
    onSuccess: () => {
      queryClient.refetchQueries(["book", bookId, "comment"]);
      clearCommentContent.current!.value = "";
      notifyDefault("Rating successfully!");
      refetchBook();
    },
    onError: () => {
      notifyError("You already voted for this book!");
    }
  });

  const handleSubmitComment = (e: React.ChangeEvent<EventTarget>) => {
    e.preventDefault();

    // check if the comment is empty
    if (commentContent.current.trim() === "") {
      setIsEmptyComment(true);
      return false;
    }

    // check if the rating is zero
    if (rating === 0) {
      setIsRatingStar(true);
      return false;
    }
    try {
      mutation.mutate();
    } catch (e) {}
    setIsEmptyComment(false);
    setIsRatingStar(false);
  };

  // Catch Rating value
  const handleRating = (rate: number) => {
    setRating(rate);
  };

  return (
    <div className="border-b-2 border-purple-500 pb-4 pt-4 font-bold text-purple-500">
      <div className="mb-2 flex flex-row">
        <Rating onClick={handleRating} size={25} transition />
        {isRatingStar ? (
          <span className="mt-1 ml-4 flex items-center text-sm font-medium tracking-wide text-red-500">
            Please choose star rating!
          </span>
        ) : null}
      </div>
      <form
        className="flex flex-row items-center"
        onSubmit={handleSubmitComment}
      >
        <div className="w-full">
          <input
            type="text"
            ref={clearCommentContent}
            placeholder="Please discuss, please do not spam link"
            onChange={(e) => (commentContent.current = e.target.value)}
            maxLength={200}
            required
            className="block h-20 w-full rounded-md border border-purple-200 bg-white px-4 py-2 text-sm text-purple-700 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-300 focus:ring-opacity-40"
          />
          {isEmptyComment ? (
            <span className="mt-1 ml-1 flex items-center text-sm font-medium tracking-wide text-red-500">
              Please enter your rating comment!
            </span>
          ) : null}
        </div>

        <button className="ml-2 h-min w-[10%] transform cursor-pointer rounded-md bg-purple-700 px-4 py-2 text-center tracking-wide text-white transition-colors duration-200 hover:bg-purple-600 focus:bg-purple-600 focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
          {"  "}Send
        </button>
      </form>
    </div>
  );
}

export default UserComment;
