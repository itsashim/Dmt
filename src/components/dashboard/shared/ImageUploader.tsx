import { useState, ChangeEvent, useRef, FC, useEffect } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { Button } from "../..";
import { FaTrash } from "react-icons/fa6";
import { message } from "antd";

interface ImageUploadProps {
  imageFiles?: File[];
  className?: string;
  onImagesSelected?: (data: { files: File[]; base64Images?: string[] }) => void;
}

interface Image {
  file: File;
  url: string;
  base64?: string;
}

const ImageUploader: FC<ImageUploadProps> = ({
  className,
  imageFiles,
  onImagesSelected,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    if (imageFiles && imageFiles?.length > 0) {
      convertFileToImage(imageFiles as File[]);
    }
  }, []);

  useEffect(() => {
    if (onImagesSelected) {
      onImagesSelected({
        files: images.map((img) => img.file),
        base64Images: images
          .map((img) => img.base64)
          .filter(Boolean) as string[],
      });
    }
  }, [images]);

  const convertFileToImage = async (files: File[]) => {
    const newImages: Image[] = [];

    for (const file of files) {
      if (!(file instanceof File)) {
        message.error(`Invalid Image file object`);
        continue;
      }

      const isDuplicate = images.some(
        ({ file: imgFile }) => imgFile.name === file.name
      );
      if (isDuplicate) {
        message.error(`${file.name} is already uploaded`);
        continue;
      }

      try {
        const base64 = await fileToBase64(file);
        newImages.push({
          file,
          url: URL.createObjectURL(file),
          base64,
        });
      } catch (error) {
        console.error("Error converting file to base64:", error);
        message.error(`Error converting ${file.name} to base64`);
      }
    }

    const updatedImages = [...images, ...newImages];
    setImages(updatedImages);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    convertFileToImage(files);
  };

  const handleDelete = (url: string) => {
    const updatedImages = images.filter((image) => image.url !== url);
    setImages(updatedImages);
  };

  const fileToBase64 = (file: File): Promise<string | undefined> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  return (
    <div
      className={`flex flex-col justify-center items-center w-full ${className}`}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        onChange={handleFileChange}
        className={`hidden w-full text-sm text-gray-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-blue-50 file:text-blue-700
        hover:file:bg-blue-100`}
      />
      <div
        className={`flex flex-col gap-2 justify-center items-center py-8 border-2 border-dashed border-fade-white hover:border-primary smooth bg-[#fafafa] cursor-pointer rounded shadow w-full`}
        onClick={() => inputRef.current?.click()}
      >
        <AiOutlineCloudUpload className={`text-4xl text-primary`} />
        <h4 className={`text-dark-gray text-md`}>
          Click to add your photos here
        </h4>
        <Button title="Upload Photos" variant="outline" />
      </div>
      <div
        className={`mt-4 flex gap-2 justify-start items-center flex-wrap w-full`}
      >
        {images.map((image) => (
          <div key={image.url} className={`relative shadow`}>
            <img
              src={image.url}
              alt="Preview"
              className={`w-20 h-20 object-cover object-center cursor-pointer rounded`}
            />
            <button
              onClick={() => handleDelete(image.url)}
              className={`absolute top-4 right-4 bg-white shadow-xl shadow-black rounded w-6 h-6 flex items-center justify-center transform translate-x-1/2 -translate-y-1/2`}
            >
              <FaTrash className={`text-sm text-danger`} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
