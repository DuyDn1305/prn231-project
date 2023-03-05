import { Outlet, Route, Routes } from "react-router-dom";
import NavigationBar from "../components/Layout/NavigationBar";
import BookList from "../pages/Books";
import BookDetail from "../pages/Books/BookDetail";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

function MainRoutes() {
    return (
        <>
            <NavigationBar></NavigationBar>
            <div className="p-8">
                <Outlet/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/book" element={<BookList/>}/>
                    <Route path="/book/:bookId" element={<BookDetail/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                </Routes>
            </div>
        </>
    );
}

export default MainRoutes;