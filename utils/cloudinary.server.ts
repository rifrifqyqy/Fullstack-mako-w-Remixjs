export async function uploadToCloudinary(file: File): Promise<string> {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET as string);

  const response = await fetch(process.env.CLOUDINARY_URL as string, {
    method: "POST",
    body: data,
  });

  const json = await response.json();
  return json.secure_url;
}
