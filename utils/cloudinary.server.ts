import crypto from "crypto";

// post image to cloudinary
export async function uploadToCloudinary(
  file: File,
): Promise<{ url: string; publicId: string }> {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET as string);

  const response = await fetch(process.env.CLOUDINARY_URL as string, {
    method: "POST",
    body: data,
  });

  const json = await response.json();
  return { url: json.secure_url, publicId: json.public_id };
}


// delete image cloudinary
export async function deleteFromCloudinary(publicId: string): Promise<boolean> {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const apiSecret = process.env.CLOUDINARY_API_SECRET as string;
  const signature = crypto
    .createHash("sha256")
    .update(`public_id=${publicId}&timestamp=${timestamp}${apiSecret}`)
    .digest("hex");

  const data = new URLSearchParams({
    public_id: publicId,
    timestamp: timestamp.toString(),
    api_key: process.env.CLOUDINARY_API_KEY as string,
    signature,
  });

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/destroy`,
    {
      method: "POST",
      body: data,
    },
  );

  const result = await response.json();
  return result.result === "ok";
}
