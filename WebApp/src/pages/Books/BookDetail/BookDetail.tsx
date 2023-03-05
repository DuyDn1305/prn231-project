import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBook } from "../../../apis/Book.api";
import BookComment from "./BookComment";

function BookDetail() {
    let { bookId } = useParams();

    const {data} = useQuery({
        queryKey: ['Book'],
        queryFn: () => {
            return getBook(bookId);
        },
        staleTime: 5*60*1000
    })

    return (  
        <>
        <div className="flex justify-center items-center w-full">
            <div className="relative flex flex-col justify-end min-w-min break-words border border-neutral-200 rounded-t-2xl rounded-b-2xl m-1 max-w-[50%] center p-4">
                <div className="flex flex-row">
                    <img className="w-[30%] h-auto" src="https://upload.wikimedia.org/wikipedia/commons/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg"/>
                    <div className="flex-auto p-4 text-xl">
                        <div className="flex flex-row mb-2">
                            <div className="font-bold break-words pr-16 flex flex-row w-[30%]">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 fill-zinc-700">
                                    <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
                                </svg>
                                <span className="pl-2 text-zinc-700 font-light">
                                    Title
                                </span>
                            </div>
                            <div className="font-bold break-words text-purple-500">To Kill a Mockingbird</div>
                        </div>
                        <div className="flex flex-row mb-2">
                            <div className="font-bold break-words pr-16 flex flex-row w-[30%]">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 fill-zinc-700">
                                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                                </svg>
                                <span className="pl-2 text-zinc-700 font-light">
                                    Author
                                </span>
                            </div>
                            <div className="font-normal break-words text-purple-500">Harper Lee</div>
                        </div>
                        <div className="flex flex-row mb-2">
                            <div className="font-bold break-words pr-16 flex flex-row w-[30%]">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 fill-zinc-700">
                                    <path fillRule="evenodd" d="M5.25 2.25a3 3 0 00-3 3v4.318a3 3 0 00.879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 005.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 00-2.122-.879H5.25zM6.375 7.5a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" clipRule="evenodd" />
                                </svg>
                                <span className="pl-2 text-zinc-700 font-light">
                                    Category
                                </span>
                            </div>
                            <div className="font-normal break-words text-purple-500">Novels</div>
                        </div>
                        <div className="flex flex-row mb-2">
                            <div className="font-bold break-words pr-16 flex flex-row w-[30%]">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 fill-zinc-700">
                                    <path fillRule="evenodd" d="M4.5 2.25a.75.75 0 000 1.5v16.5h-.75a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5h-.75V3.75a.75.75 0 000-1.5h-15zM9 6a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H9zm-.75 3.75A.75.75 0 019 9h1.5a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM9 12a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H9zm3.75-5.25A.75.75 0 0113.5 6H15a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM13.5 9a.75.75 0 000 1.5H15A.75.75 0 0015 9h-1.5zm-.75 3.75a.75.75 0 01.75-.75H15a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM9 19.5v-2.25a.75.75 0 01.75-.75h4.5a.75.75 0 01.75.75v2.25a.75.75 0 01-.75.75h-4.5A.75.75 0 019 19.5z" clipRule="evenodd" />
                                </svg>
                                <span className="pl-2 text-zinc-700 font-light">
                                    Publisher
                                </span>
                            </div>
                            <div className="font-normal break-words text-purple-500">
                                <a href="https://en.wikipedia.org/wiki/J._B._Lippincott_%26_Co." target="_blank">J. B. Lippincott & Co.</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col pt-4">
                    <div className="font-bold break-words pb-2 flex flex-row text-purple-500 border-b-2 border-purple-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z" clipRule="evenodd" />
                        </svg>
                        <span className="pl-2 font-semibold uppercase">
                            Description
                        </span>
                    </div>
                    <p className="font-light overflow-hidden pt-2">
                        To Kill a Mockingbird is a novel by Harper Lee that takes place in the small town of Maycomb, Alabama during the 1930s. The story is told through the eyes of a young girl named Scout Finch, who lives with her older brother Jem and their widowed father, Atticus. The novel follows Scout and Jem as they navigate their way through the racial and social injustices of their town, including their father's decision to defend a black man named Tom Robinson who has been accused of raping a white woman.
                    </p>
                </div>
            </div>
        </div>
        <BookComment bookId={bookId}/>
        </>
    );
}

export default BookDetail;