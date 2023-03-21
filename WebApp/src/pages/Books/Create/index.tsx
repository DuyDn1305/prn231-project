import { useMutation, useQueries } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Popup from "reactjs-popup";

import { getAuthors } from "../../../apis/Author.api";
import { postBook } from "../../../apis/Book.api";
import { getCategories } from "../../../apis/Category.api";
import { getPublishers } from "../../../apis/Publisher.api";
import CreateAuthorPopup from "../../../components/Create/CreateAuthorPopup";
import CreateCategoryPopup from "../../../components/Create/CreateCategoryPopup";
import CreatePublisherPopup from "../../../components/Create/CreatePublisherPopup";
import { notifyDefault, notifyError } from "../../../components/Notification";

interface BookForm {
  title: string;
  description: string;
  imageList: File;
  price: number;
  categoryId: number;
  authorId: number;
  publicationDate: string;
  totalPage: number;
  publisherId: number;
}

const overlayStyle = { background: "rgba(0,0,0,0.5)" };

function CreateBook() {
  const [selectedImage, setSelectedImage] = useState<File>();
  const [imageUrl, setImageUrl] = useState("");

  const [authorsQuery, publishersQuery, categoriesQuery] = useQueries({
    queries: [
      {
        queryKey: ["authors", "all"],
        queryFn: () => {
          return getAuthors();
        },
        retry: false,
        refetchOnWindowFocus: false
      },
      {
        queryKey: ["publishers", "all"],
        queryFn: () => {
          return getPublishers();
        },
        retry: false,
        refetchOnWindowFocus: false
      },
      {
        queryKey: ["categories", "all"],
        queryFn: () => {
          return getCategories();
        },
        retry: false,
        refetchOnWindowFocus: false
      }
    ]
  });

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<BookForm>({ mode: "onChange" });

  const mutation = useMutation({
    mutationFn: (book: FormData) => {
      return postBook(book);
    },
    onSuccess: () => {
      setSelectedImage(undefined);
      notifyDefault("Create new book successfully!");
      reset();
    },
    onError: () => {
      notifyError("New book creation failed... Please try again!");
    }
  });

  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();
    formData.append("title", data.title.trim());
    formData.append("description", data.description.trim());
    formData.append("coverImage", selectedImage!);
    formData.append("price", data.price + "");
    formData.append("categoryId", data.categoryId + "");
    formData.append("authorId", data.authorId + "");
    formData.append("publicationDate", data.publicationDate);
    formData.append("totalPage", data.totalPage + "");
    formData.append("publisherId", data.publisherId + "");
    formData.append("username", localStorage["username"] + "");

    mutation.mutate(formData);
  });

  // popup category
  const [openCate, setOpenCate] = useState(false);
  const [openAuthor, setOpenAuthor] = useState(false);
  const [openPublisher, setOpenPublisher] = useState(false);
  const closeModalCate = () => {
    setOpenCate(false);
    categoriesQuery.refetch();
  };
  const closeModalAuthor = () => {
    setOpenAuthor(false);
    authorsQuery.refetch();
  };
  const closeModalPublisher = () => {
    setOpenPublisher(false);
    publishersQuery.refetch();
  };

  return (
    <div className="flex min-h-[80vh] flex-col justify-center bg-gray-50">
      <div className="mx-auto w-full max-w-md">
        <div className="text-center text-xl font-medium">Create</div>
        <div className="mt-2 text-center text-3xl font-bold text-gray-900">
          New Book
        </div>
      </div>
      <div className="flex w-full flex-row items-center justify-center">
        <div className="flex w-[30%] flex-row items-center justify-center">
          <div className="mx-auto mt-6 min-w-min max-w-md text-center">
            <div className="group relative h-6 w-max">
              <button onClick={() => setOpenCate((o) => !o)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6 hover:block"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.25 2.25a3 3 0 00-3 3v4.318a3 3 0 00.879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 005.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 00-2.122-.879H5.25zM6.375 7.5a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <span className="pointer-events-none absolute top-5 left-5 w-max rounded-md bg-slate-300 p-1 font-semibold opacity-0 transition-opacity group-hover:opacity-100">
                Add new category
              </span>
            </div>
            <Popup
              {...{ overlayStyle }}
              modal
              open={openCate}
              closeOnDocumentClick
              onClose={closeModalCate}
            >
              <a className="close" onClick={closeModalCate}>
                &times;
              </a>
              <CreateCategoryPopup closeModalCate={closeModalCate} />
            </Popup>
          </div>

          <div className="mx-auto mt-6 min-w-min max-w-md text-center">
            <div className="group relative h-6 w-max">
              <button onClick={() => setOpenAuthor((o) => !o)}>
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
                    d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                  />
                </svg>
              </button>
              <span className="pointer-events-none absolute top-5 left-5 w-max rounded-md bg-slate-300 p-1 font-semibold opacity-0 transition-opacity group-hover:opacity-100">
                Add new author
              </span>
            </div>
            <Popup
              {...{ overlayStyle }}
              modal
              open={openAuthor}
              closeOnDocumentClick
              onClose={closeModalAuthor}
            >
              <a className="close" onClick={closeModalAuthor}>
                &times;
              </a>
              <CreateAuthorPopup closeModalAuthor={closeModalAuthor} />
            </Popup>
          </div>

          <div className="mx-auto mt-6 min-w-min max-w-md text-center">
            <div className="group relative h-6 w-max">
              <button onClick={() => setOpenPublisher((o) => !o)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 2.25a.75.75 0 000 1.5v16.5h-.75a.75.75 0 000 1.5H15v-18a.75.75 0 000-1.5H3zM6.75 19.5v-2.25a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v2.25a.75.75 0 01-.75.75h-3a.75.75 0 01-.75-.75zM6 6.75A.75.75 0 016.75 6h.75a.75.75 0 010 1.5h-.75A.75.75 0 016 6.75zM6.75 9a.75.75 0 000 1.5h.75a.75.75 0 000-1.5h-.75zM6 12.75a.75.75 0 01.75-.75h.75a.75.75 0 010 1.5h-.75a.75.75 0 01-.75-.75zM10.5 6a.75.75 0 000 1.5h.75a.75.75 0 000-1.5h-.75zm-.75 3.75A.75.75 0 0110.5 9h.75a.75.75 0 010 1.5h-.75a.75.75 0 01-.75-.75zM10.5 12a.75.75 0 000 1.5h.75a.75.75 0 000-1.5h-.75zM16.5 6.75v15h5.25a.75.75 0 000-1.5H21v-12a.75.75 0 000-1.5h-4.5zm1.5 4.5a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008zm.75 2.25a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75v-.008a.75.75 0 00-.75-.75h-.008zM18 17.25a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <span className="pointer-events-none absolute top-5 left-5 w-max rounded-md bg-slate-300 p-1 font-semibold opacity-0 transition-opacity group-hover:opacity-100">
                Add new publisher
              </span>
            </div>
            <Popup
              {...{ overlayStyle }}
              modal
              open={openPublisher}
              closeOnDocumentClick
              onClose={closeModalPublisher}
            >
              <a className="close" onClick={closeModalPublisher}>
                &times;
              </a>
              <CreatePublisherPopup closeModalPublisher={closeModalPublisher} />
            </Popup>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-4 w-full max-w-md rounded-md border border-gray-300 bg-white p-8">
        <form
          action=""
          className="block text-sm font-bold text-gray-600"
          onSubmit={onSubmit}
        >
          <div className="mb-2">
            <label
              htmlFor="title"
              className="block text-sm font-bold text-gray-600"
            >
              Title <span className="text-red-500">*</span>
            </label>
            <input
              {...register("title", {
                required: true,
                minLength: 1,
                maxLength: 100
              })}
              style={{ borderColor: errors.title ? "red" : "" }}
              type="text"
              name="title"
              className="mt-1 w-full rounded border border-gray-300 p-2"
            />

            {errors.title && (
              <div className="text-red-600">
                Please enter a title of the book
              </div>
            )}
          </div>

          <div className="mb-2">
            <label
              htmlFor="description"
              className="block text-sm font-bold text-gray-600"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register("description", {
                required: true,
                minLength: 1
              })}
              style={{ borderColor: errors.description ? "red" : "" }}
              rows={4}
              name="description"
              className="mt-1 w-full rounded border border-gray-300 p-2"
            />
            {errors.description && (
              <div className="text-red-600">
                Please enter a description of the book
              </div>
            )}
          </div>
          <div className="mb-2">
            <label
              htmlFor="price"
              className="block text-sm font-bold text-gray-600"
            >
              Price <span className="text-red-500">*</span>
            </label>
            <input
              {...register("price", {
                required: true,
                min: 1,
                max: Number.MAX_SAFE_INTEGER
              })}
              style={{ borderColor: errors.price ? "red" : "" }}
              type="number"
              name="price"
              className="mt-1 w-full rounded border border-gray-300 p-2"
            />

            {errors.price && (
              <div className="text-red-600">
                The price of the book must be more than 1
              </div>
            )}
          </div>
          <div className="mb-2">
            <label
              htmlFor="publicationDate"
              className="block text-sm font-bold text-gray-600"
            >
              Publication date <span className="text-red-500">*</span>
            </label>
            <input
              {...register("publicationDate", {
                required: true,
                max: new Date().toDateString()
              })}
              style={{ borderColor: errors.publicationDate ? "red" : "" }}
              type="date"
              name="publicationDate"
              className="mt-1 w-full rounded border border-gray-300 p-2"
            />
            {errors.publicationDate && (
              <div className="text-red-600">
                Selected publication date is not greater than current date{" "}
              </div>
            )}
          </div>
          <div className="mb-2">
            <label
              htmlFor="totalPage"
              className="block text-sm font-bold text-gray-600"
            >
              Total page <span className="text-red-500">*</span>
            </label>
            <input
              {...register("totalPage", {
                required: true,
                min: 1,
                max: Number.MAX_SAFE_INTEGER
              })}
              style={{ borderColor: errors.totalPage ? "red" : "" }}
              type="number"
              name="totalPage"
              className="mt-1 w-full rounded border border-gray-300 p-2"
            />
            {errors.totalPage && (
              <div className="text-red-600">
                The total number of pages of the book is greater than 1
              </div>
            )}
          </div>

          <div className="mb-2">
            <label
              htmlFor="authorId"
              className="block text-sm font-bold text-gray-600"
            >
              Author <span className="text-red-500">*</span>
            </label>
            <select
              {...register("authorId", {
                required: true,
                validate: (input) => input.toString() !== "DEFAULT"
              })}
              name="authorId"
              className="mt-1 w-full rounded border border-gray-300 p-2"
              defaultValue={"DEFAULT"}
            >
              <option value="DEFAULT" disabled>
                Choose a author ...
              </option>
              {authorsQuery.data?.data.map((author, index) => {
                return (
                  <option key={index} value={author.authorId}>
                    {author.authorName}
                  </option>
                );
              })}
            </select>

            {errors.authorId && (
              <div className="text-red-600">Selected author of a book</div>
            )}
          </div>
          <div className="mb-2">
            <label
              htmlFor="categoryId"
              className="block text-sm font-bold text-gray-600"
            >
              Category <span className="text-red-500">*</span>
            </label>
            <select
              {...register("categoryId", {
                required: true,
                validate: (input) => input.toString() !== "DEFAULT"
              })}
              name="categoryId"
              className="mt-1 w-full rounded border border-gray-300 p-2"
              defaultValue={"DEFAULT"}
            >
              <option value="DEFAULT" disabled>
                Choose a category ...
              </option>
              {categoriesQuery.data?.data.map((category, index) => {
                return (
                  <option key={index} value={category.categoryId}>
                    {category.categoryName}
                  </option>
                );
              })}
            </select>

            {errors.categoryId && (
              <div className="text-red-600">Selected category of a book</div>
            )}
          </div>

          <div className="mb-2">
            <label
              htmlFor="publisherId"
              className="block text-sm font-bold text-gray-600"
            >
              Publisher <span className="text-red-500">*</span>
            </label>
            <select
              {...register("publisherId", {
                required: true,
                validate: (input) => input.toString() !== "DEFAULT"
              })}
              name="publisherId"
              className="mt-1 w-full rounded border border-gray-300 p-2"
              defaultValue={"DEFAULT"}
            >
              <option value="DEFAULT" disabled>
                Choose a publisher ...
              </option>
              {publishersQuery.data?.data.map((publisher, index) => {
                return (
                  <option key={index} value={publisher.publisherId}>
                    {publisher.publisherName}
                  </option>
                );
              })}
            </select>
            {errors.publisherId && (
              <div className="text-red-600">Selected publisher of a book</div>
            )}
          </div>

          <div className="mb-2">
            <label
              htmlFor="imageList"
              className="block text-sm font-bold text-gray-600"
            >
              Image <span className="text-red-500">*</span>
            </label>
            <input
              {...register("imageList", {
                required: true
              })}
              style={{ borderColor: errors.imageList ? "red" : "" }}
              type="file"
              accept="image/*"
              name="imageList"
              className="mt-1 w-full rounded border border-gray-300 p-2"
              onChange={(e) => setSelectedImage(e.target.files![0])}
            />
          </div>
          {imageUrl && selectedImage && (
            <div className="mb-2">
              <label
                htmlFor="previewImage"
                className="block text-sm font-bold text-gray-600"
              >
                Preview Image
              </label>
              <img src={imageUrl} alt={selectedImage.name} className="h-52" />
            </div>
          )}

          <div className="mb-2 mt-4">
            <button
              className="w-full rounded-md bg-blue-500 py-2 px-4 text-sm text-white hover:bg-blue-700"
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? (
                <svg
                  className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
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
              )}
              {"  "}
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateBook;
