import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getStudent } from "../../../apis/Book.api";
import { useEffect } from "react";
function BookDetail() {
    let { bookId } = useParams();

    const {data} = useQuery({
        queryKey: ['Book'],
        queryFn: () => {
            return getStudent(bookId);
        },
        staleTime: 1000
    })
    useEffect(() => { 
    }, [bookId]);

    

    return (  
        <>
        <div key={bookId} className="relative flex flex-col justify-end min-w-min break-words border border-neutral-400 rounded-t-2xl rounded-b-2xl m-1 max-w-[18rem] center">
            <img className="rounded-t-2xl rounded-b-2xl w-full h-96" src={data?.data.coverImage}/>
            <div className="flex-auto p-4">
                <div className="font-bold break-words w-64">{data?.data.title}</div>
                <p className="font-light italic max-h-[70px] overflow-hidden">{data?.data.description}</p>
                <div className="font-bold break-words pt-4 w-64">{data?.data.price}</div>
                {/* <button type="button" className="bg-neutral-400 hover:bg-neutral-700 text-white font-bold mt-3 py-2 px-4 rounded-full"
                onClick={routeChange}
                >
                Buy now
                </button> */}
            </div>
        </div>
        </>
    );
}

export default BookDetail;