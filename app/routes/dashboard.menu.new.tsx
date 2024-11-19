// app/routes/dashboard/menu/new.tsx
import { Form, useActionData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import { prisma } from "utils/db.server";
import LoadingModal from "~/components/Fragments/LoadingModal";
import { uploadToCloudinary } from "utils/cloudinary.server";
import { useState } from "react";
import { requireAdmin } from "utils/session.server";
type ActionData = { error?: string };

export const loader = async ({ request }) => {
  await requireAdmin(request);
  return null;
};

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const kategori = formData.get("kategori") as string;
  const thumb = formData.get("thumb") as File | null;
  const gallery = formData.getAll("gallery") as File[];
  const price = parseFloat(formData.get("price") as string);

  if (!title || !description || !kategori || !thumb || isNaN(price)) {
    return json({ error: "Semua field harus diisi" }, { status: 400 });
  }

  // Upload thumbnail ke Cloudinary
  const thumbUrl = await uploadToCloudinary(thumb);

  // Upload gallery images ke Cloudinary
  const galleryUrls = await Promise.all(
    gallery.map((file) => uploadToCloudinary(file)),
  );

  // Simpan menu baru ke database
  await prisma.menu.create({
    data: {
      title,
      description,
      kategori,
      thumb: thumbUrl,
      gallery: galleryUrls,
      price,
    },
  });
  return redirect("/");
}

export default function NewMenu() {
  const [isLoading, setIsLoading] = useState(false);
  const actionData = useActionData<ActionData>();

  return (
    <>
      {isLoading && <LoadingModal title="Menyimpan Roti..." />}{" "}
      <Form
        method="post"
        encType="multipart/form-data"
        className="mx-auto max-w-xl space-y-6"
        onSubmit={() => setIsLoading(true)}
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Kategori
          </label>
          <select
            name="kategori"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          >
            <option value="bread">Bread</option>
            <option value="danish">Danish</option>
            <option value="toast">Toast</option>
            <option value="slice-cake">Slice Cake</option>
            <option value="dry-cake">Dry Cake</option>
            <option value="cookies">Cookies</option>
            <option value="hampers">Hampers</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Thumbnail
          </label>
          <input
            type="file"
            name="thumb"
            required
            accept="image/*"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Gallery Photos
          </label>
          <div className="space-y-2">
            <input
              type="file"
              name="gallery"
              multiple
              accept="image/*"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            name="price"
            required
            step="0.01"
            min="0"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        {actionData?.error && (
          <p className="text-sm text-red-600">{actionData.error}</p>
        )}

        <button
          type="submit"
          className="w-full rounded-md bg-indigo-600 px-4 py-2 font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Save
        </button>
      </Form>
    </>
  );
}
