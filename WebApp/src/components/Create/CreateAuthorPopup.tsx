import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { postAuthor } from "../../apis/Author.api";
import { notifyDefault, notifyError } from "../Notification";

interface AuthorForm {
  authorName: string;
  authorDescription: string;
  authorUrl: string;
  nation: string;
}

function CreateAuthorPopup({
  closeModalAuthor
}: {
  closeModalAuthor: Function;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<AuthorForm>({ mode: "onChange" });

  const mutation = useMutation({
    mutationFn: (author: AuthorForm) => {
      return postAuthor({
        authorId: 0,
        authorName: author.authorName,
        authorDescription: author.authorDescription,
        authorUrl: author.authorUrl,
        nation: author.nation,
        books: []
      });
    },
    onSuccess: () => {
      notifyDefault("Create new author successfully!");
      reset();
      closeModalAuthor();
    },
    onError: () => {
      notifyError("New author creation failed... Please try again!");
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
            New author
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
                htmlFor="authorName"
                className="block text-sm font-bold text-gray-600"
              >
                Name <span className="text-red-500">*</span>
              </label>
              <input
                {...register("authorName", {
                  required: true,
                  minLength: 1,
                  maxLength: 100
                })}
                style={{ borderColor: errors.authorName ? "red" : "" }}
                type="text"
                name="authorName"
                className="mt-1 w-full rounded border border-gray-300 p-2"
              />

              {errors.authorName && (
                <div className="text-red-600">Please enter a author name</div>
              )}
            </div>

            <div className="mb-2">
              <label
                htmlFor="authorDescription"
                className="block text-sm font-bold text-gray-600"
              >
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("authorDescription", {
                  required: true,
                  minLength: 1
                })}
                style={{ borderColor: errors.authorDescription ? "red" : "" }}
                rows={4}
                name="authorDescription"
                className="mt-1 w-full rounded border border-gray-300 p-2"
              />
              {errors.authorDescription && (
                <div className="text-red-600">
                  Please enter a description of the author
                </div>
              )}
            </div>
            <div className="mb-2">
              <label
                htmlFor="authorUrl"
                className="block text-sm font-bold text-gray-600"
              >
                Url <span className="text-red-500">*</span>
              </label>
              <input
                {...register("authorUrl", {
                  required: true,
                  maxLength: 2000
                })}
                style={{ borderColor: errors.authorUrl ? "red" : "" }}
                type="text"
                name="authorUrl"
                className="mt-1 w-full rounded border border-gray-300 p-2"
              />

              {errors.authorUrl && (
                <div className="text-red-600">
                  The author url is required and has a maximum of 2000
                  characters.
                </div>
              )}
            </div>

            <div className="mb-2">
              <label
                htmlFor="authorUrl"
                className="block text-sm font-bold text-gray-600"
              >
                Nation <span className="text-red-500">*</span>
              </label>
              <input
                {...register("nation", {
                  required: true,
                  maxLength: 100
                })}
                style={{ borderColor: errors.nation ? "red" : "" }}
                type="text"
                name="nation"
                className="mt-1 w-full rounded border border-gray-300 p-2"
              />

              {errors.nation && (
                <div className="text-red-600">
                  The author's nation is required and has a maximum of 100
                  characters.
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

export default CreateAuthorPopup;
