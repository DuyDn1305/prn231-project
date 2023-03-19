import { useMutation, useQueries } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { getAuthors } from "../../../apis/Author.api";
import { postBook } from "../../../apis/Book.api";
import { getCategories } from "../../../apis/Category.api";
import { getPublishers } from "../../../apis/Publisher.api";
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

    mutation.mutate(formData);
  });

  return (
    <div className="flex min-h-[80vh] flex-col justify-center bg-gray-50">
      <div className="mx-auto w-full max-w-md">
        <div className="text-center text-xl font-medium">Create</div>
        <div className="mt-2 text-center text-3xl font-bold text-gray-900">
          new book
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
            <button className="w-full rounded-md bg-blue-500 py-2 px-4 text-sm text-white hover:bg-blue-700">
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
