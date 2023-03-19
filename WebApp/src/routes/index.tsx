import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import NavigationBar from "../components/Layout/NavigationBar";
import PageNotFound from "../components/PageNotFound";
import CreateAuthor from "../pages/Authors/Create";
import BookList from "../pages/Books";
import BookDetail from "../pages/Books/BookDetail";
import CreateBook from "../pages/Books/Create";
import CreateCategory from "../pages/Category/Create";
import Login from "../pages/Login";
import CreatePublisher from "../pages/Publisher/Create";
import SignUp from "../pages/SignUp";

function MainRoutes() {
  return (
    <>
      <NavigationBar></NavigationBar>
      <div className="p-8">
        <Outlet />
        <Routes>
          {/* Book routes */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <BookList />
              </PrivateRoute>
            }
          />
          <Route
            path="/book/create"
            element={
              <PrivateRoute>
                <CreateBook />
              </PrivateRoute>
            }
          />
          <Route
            path="/book/:bookId"
            element={
              <PrivateRoute>
                <BookDetail />
              </PrivateRoute>
            }
          />
          {/* End book routes */}

          {/* Author routes */}
          <Route
            path="/author/create"
            element={
              <PrivateRoute>
                <CreateAuthor />
              </PrivateRoute>
            }
          />
          {/* End author routes */}

          {/* Category routes */}
          <Route
            path="/category/create"
            element={
              <PrivateRoute>
                <CreateCategory />
              </PrivateRoute>
            }
          />
          {/* End category routes */}

          {/* Publisher routes */}
          <Route
            path="/publisher/create"
            element={
              <PrivateRoute>
                <CreatePublisher />
              </PrivateRoute>
            }
          />
          {/* End publisher routes */}

          {/* Login, sign up routes */}
          <Route
            path="/login"
            element={
              <PrivateRoute2 path="/login">
                <Login />
              </PrivateRoute2>
            }
          />
          <Route
            path="/signup"
            element={
              <PrivateRoute2 path="/signup">
                <SignUp />
              </PrivateRoute2>
            }
          />
          {/* End login, sign up routes */}

          {/* Catching error route */}
          <Route path="*" element={<PageNotFound />} />
          {/* End catching error route */}
        </Routes>
      </div>
    </>
  );
}

interface Props {
  children: JSX.Element[] | JSX.Element;
}
interface Props2 {
  children: JSX.Element[] | JSX.Element;
  path: string;
}

function PrivateRoute({ children }: Props) {
  return typeof localStorage["token"] !== "undefined" ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" />
  );
}

function PrivateRoute2({ children, path }: Props2) {
  return (path === "/login" || path == "/signup") &&
    typeof localStorage["token"] !== "undefined" ? (
    <Navigate to="/book" />
  ) : (
    <>{children}</>
  );
}

export default MainRoutes;
