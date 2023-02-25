import React from "react";
import {Routes, Route} from "react-router-dom";

const Home = React.lazy(() => import('../pages/Home'));
const Book = React.lazy(() => import('../pages/Books'));

const Loading = () => <p>Loading .....................................................</p>;

function Main() {
    return ( 
        <React.Suspense fallback={<Loading />}>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/book" element={<Book/>}/>
            </Routes>
        </React.Suspense>
     );
}

export default Main;