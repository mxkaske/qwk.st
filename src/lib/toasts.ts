import toast from "react-hot-toast";
import { DefaultToastOptions } from "react-hot-toast/dist/core/types";

const toastOptions: DefaultToastOptions = {
  className:
    "text-gray-900 dark:text-white bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700",
};

const toastMessages = {
  promise: {
    default: {
      loading: "Loading...",
      success: "Success",
      error: "Error",
    },
  },
  success: {
    default: "Success",
  },
};

const promise = (
  promise: Promise<unknown>,
  message: keyof typeof toastMessages.promise = "default"
) => toast.promise(promise, toastMessages.promise[message], toastOptions);

const success = (message: keyof typeof toastMessages.success = "default") =>
  toast.success(toastMessages.success[message], toastOptions);

const toasts = {
  promise,
  success,
};

export default toasts;
