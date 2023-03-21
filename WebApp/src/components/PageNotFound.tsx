import notFoundImage from "../assets/error_page.jpg";

function PageNotFound() {
  return (
    <div className="flex h-[80vh] flex-col items-center justify-center text-5xl">
      Page Not Found
      <img src={notFoundImage} className="mt-4 max-h-80" />
    </div>
  );
}

export default PageNotFound;
