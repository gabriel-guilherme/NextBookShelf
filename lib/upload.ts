import cloudinary from "./cloudinary";

export async function uploadBookCover(file: File) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise<{
    url: string;
    publicId: string;
  }>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "books/covers",
        resource_type: "image",
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Falha no upload"));
          return;
        }

        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      },
    );

    uploadStream.end(buffer);
  });
}
