import Image from "next/image";
import { Plus } from "lucide-react";

type InputCoverProps = {
  src?: string;
  alt?: string;
};

export default function InputCover({
  src,
  alt = "Capa do livro",
}: InputCoverProps) {
  return (
    <div
      className={`relative flex h-full w-full cursor-pointer items-center justify-center overflow-hidden rounded-md ${
        src
          ? ""
          : "border-10 border-dashed border-white bg-gray-400 text-white opacity-10 hover:opacity-20"
      }`}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 256px, 40vw"
          className="object-cover"
        />
      ) : (
        <Plus size={36} />
      )}
    </div>
  );
}
