import toasts from "@/lib/toasts";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { ChangeEvent, useRef, useState } from "react";
import Button from "../ui/Button";
import FileInput from "../ui/FileInput";

const UploadForm = () => {
  const ref = useRef<HTMLFormElement>();
  const { data: session } = useSession();
  const [selectedFile, setSelectedFile] = useState<File>();
  const [thumbnailURL, setThumbnailURL] = useState<string>();

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setThumbnailURL(window.URL.createObjectURL(file));
      setSelectedFile(file);
    }
  };

  return (
    <form
      ref={ref}
      onSubmit={async (e) => {
        e.preventDefault();
        if (selectedFile) {
          const data = new FormData();
          data.append("file", selectedFile);
          toasts.promise(
            fetch(`api/image-upload`, {
              method: "POST",
              body: data,
            })
          );
          ref.current?.reset();
        }
      }}
      className="flex items-center space-x-6"
    >
      <div className="shrink-0">
        <div className="relative w-16 h-16 overflow-hidden bg-gray-500 rounded-full">
          {(session?.user?.image || thumbnailURL) && (
            <Image
              className="object-cover"
              src={thumbnailURL || session?.user.image}
              alt="Current profile photo"
              layout="fill"
              objectFit="cover"
            />
          )}
        </div>
      </div>
      <FileInput name="file" label="Choose Image" onChange={handleChange} />
      <Button type="submit" disabled={!selectedFile}>
        Submit
      </Button>
    </form>
  );
};

export default UploadForm;
