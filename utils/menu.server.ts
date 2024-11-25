import { deleteFromCloudinary } from "./cloudinary.server";
import { prisma } from "./db.server";

// :GET  semua data menu dari database
export async function getAllMenu() {
  const menus = await prisma.menu.findMany({
    include: {
      reviews: true,
    },
  });

  return menus.map((menu) => ({
    ...menu,
    averageRating: calculateAverageRating(menu.reviews || []),
  }));
}

// Utility untuk menghitung rata-rata rating
function calculateAverageRating(reviews: Array<{ rating: number }>) {
  if (reviews.length === 0) return 0;
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return parseFloat((totalRating / reviews.length).toFixed(2));
}
// :GET(:id) data menu berdasarkan id
export async function getMenu(id: string) {
  const menu = await prisma.menu.findUnique({
    where: { id },
    include: {
      reviews: true,
    },
  });

  if (!menu) return null;
  const averageRating = calculateAverageRating(menu.reviews || []);
  return { ...menu, averageRating };
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
