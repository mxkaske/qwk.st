import React, { InputHTMLAttributes } from "react";
import cn from "classnames";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const FileInput = ({ type, accept, className, label, ...props }: Props) => {
  return (
    <>
      <label className="block">
        <span className="sr-only">{label}</span>
        <input
          type="file"
          accept=".jpg, .png, .jpeg"
          // DISCUSS: change colors?
          className={cn(
            "block w-full text-sm text-gray-600 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-indigo-900 dark:file:text-indigo-100 dark:hover:file:bg-indigo-800",
            className
          )}
          {...props}
        />
      </label>
    </>
  );
};

export default FileInput;
