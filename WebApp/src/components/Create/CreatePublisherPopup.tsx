import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { postPublisher } from "../../apis/Publisher.api";
import { notifyDefault, notifyError } from "../Notification";

interface PublisherForm {
  publisherName: string;
  publisherUrl: string;
}

function CreatePublisherPopup({
  closeModalPublisher
}: {
  closeModalPublisher: Function;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<PublisherForm>({ mode: "onChange" });

  const mutation = useMutation({
    mutationFn: (publisher: PublisherForm) => {
      return postPublisher({
        publisherId: 0,
        publisherName: publisher.publisherName.trim(),
        publisherUrl: publisher.publisherUrl.trim(),
        books: []
      });
    },
    onSuccess: () => {
      notifyDefault("Create new publisher successfully!");
      reset();
      closeModalPublisher();
    },
    onError: () => {
      notifyError("New publisher creation failed... Please try again!");
    }
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="flex min-h-min flex-col justify-center rounded-lg border border-gray-300 bg-gray-100">
      <div className="mx-auto w-full max-w-md">
        <div className="mt-2 text-center text-3xl font-bold text-gray-900">
          New publisher
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
              htmlFor="publisherName"
              className="block text-sm font-bold text-gray-600"
            >
              Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register("publisherName", {
                required: true,
                minLength: 1,
                maxLength: 100
              })}
              style={{ borderColor: errors.publisherName ? "red" : "" }}
              type="text"
              name="publisherName"
              className="mt-1 w-full rounded border border-gray-300 p-2"
            />

            {errors.publisherName && (
              <div className="text-red-600">Please enter a author name</div>
            )}
          </div>

          <div className="mb-2">
            <label
              htmlFor="publisherUrl"
              className="block text-sm font-bold text-gray-600"
            >
              Url <span className="text-red-500">*</span>
            </label>
            <input
              {...register("publisherUrl", {
                required: true,
                maxLength: 2000
              })}
              style={{ borderColor: errors.publisherUrl ? "red" : "" }}
              type="text"
              name="publisherUrl"
              className="mt-1 w-full rounded border border-gray-300 p-2"
            />

            {errors.publisherUrl && (
              <div className="text-red-600">
                The publisher url is required has a maximum of 2000 characters.
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
  );
}

export default CreatePublisherPopup;
