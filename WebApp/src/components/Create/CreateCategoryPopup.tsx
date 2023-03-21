import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { postCategory } from "../../apis/Category.api";
import { notifyDefault, notifyError } from "../Notification";

interface CategoryForm {
  categoryName: string;
}

function CreateCategoryPopup({ closeModalCate }: { closeModalCate: Function }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CategoryForm>({ mode: "onChange" });

  const mutation = useMutation({
    mutationFn: (category: CategoryForm) => {
      return postCategory({
        categoryId: 0,
        categoryName: category.categoryName.trim(),
        books: []
      });
    },
    onSuccess: () => {
      notifyDefault("Create new category successfully!");
      reset();
      closeModalCate();
    },
    onError: () => {
      notifyError("New category creation failed... Please try again!");
    }
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="w-full">
      <div className="flex min-h-min flex-col justify-center rounded-lg border border-gray-300 bg-gray-100">
        <div className="mx-auto w-full max-w-md">
          <div className="mt-2 text-center text-3xl font-bold text-gray-900">
            New category
          </div>
        </div>
        <div className="mx-auto mt-4 w-full max-w-md rounded-md border border-gray-300 bg-gray-100 p-8">
          <form
            action=""
            className="block text-sm font-bold text-gray-600"
            onSubmit={onSubmit}
          >
            <div className="mb-2">
              <label
                htmlFor="categoryName"
                className="block text-sm font-bold text-gray-600"
              >
                Category name <span className="text-red-500">*</span>
              </label>
              <input
                {...register("categoryName", {
                  required: true,
                  minLength: 1,
                  maxLength: 100
                })}
                style={{ borderColor: errors.categoryName ? "red" : "" }}
                type="text"
                name="categoryName"
                className="mt-1 w-full rounded border border-gray-300 p-2"
              />

              {errors.categoryName && (
                <div className="text-red-600">
                  Please enter a category name and has maximum of 100 characters
                </div>
              )}
            </div>

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
    </div>
  );
}

export default CreateCategoryPopup;
