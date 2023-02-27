import BookCard from "./BookCard";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getStudents } from "../../apis/Book.api";

function Book() {
    const queryClient = useQueryClient();

    const booksQuery = useQuery({
        queryKey: ['Books'],
        queryFn: () => {
          const controller = new AbortController()
          setTimeout(() => {
            controller.abort()
          }, 5000)
          return getStudents(controller.signal);
        },
        keepPreviousData: true,
        retry: 0
      })

    return ( 
        <div className="text-center">
            {booksQuery.isLoading && (
                <div role='status' className='mt-6 animate-pulse'>
                <div className='mb-4 h-4  rounded bg-gray-200 dark:bg-gray-700' />
                <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
                <div className='mb-2.5 h-10 rounded bg-gray-200 dark:bg-gray-700' />
                <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
                <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
                <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
                <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
                <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
                <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
                <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
                <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
                <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
                <div className='h-10  rounded bg-gray-200 dark:bg-gray-700' />
                <span className='sr-only'>Loading...</span>
                </div>
            )}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6 gap-4 pb-2">
                {booksQuery.data?.data.map((colBook, index) =>(
                    <BookCard description={colBook.description} title={colBook.title} coverImage={colBook.coverImage} bookId={colBook.bookId} price={colBook.price}/>
                ))}
            </div>
        </div>
    );
}

export default Book;