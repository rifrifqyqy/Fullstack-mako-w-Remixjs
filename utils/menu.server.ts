import { deleteFromCloudinary } from "./cloudinary.server";
import { prisma } from "./db.server";

// :GET  semua data menu dari database
export async function getAllMenu() {
  return await prisma.menu.findMany();
}
// :GET(:id) data menu berdasarkan id
export async function getMenu(id: string) {
  return await prisma.menu.findUnique({
    where: { id },
  });
}

// :GET(updated: at)  data menu terbaru
export async function getLatestMenu() {
  return await prisma.menu.findFirst({
    orderBy: { id: "desc" },
  });
}
// :DELETE data menu berdasarkan id
export async function deleteMenu(id: string): Promise<void> {
  const menu = await prisma.menu.findUnique({ where: { id } });

  if (!menu) {
    throw new Error("Menu not found");
  }

  // Hapus gambar thumbnail dari Cloudinary jika ada
  if (menu.thumbPublicId) {
    const isDeleted = await deleteFromCloudinary(menu.thumbPublicId);
    if (!isDeleted) {
      throw new Error("Failed to delete image from Cloudinary");
    }
  }

  // Hapus gambar galeri dari Cloudinary jika ada
  for (const publicId of menu.galleryPublicIds) {
    const isGalleryImageDeleted = await deleteFromCloudinary(publicId);
    if (!isGalleryImageDeleted) {
      throw new Error("Failed to delete gallery image from Cloudinary");
    }
  }
  await prisma.menu.delete({ where: { id } });
}
