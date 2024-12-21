// helpers/reviewsHelper.ts
import { createReview } from "utils/reviews.server"; // Jika createReview sudah ada di server utils// Ganti sesuai dengan file User jika perlu

export async function createReviewHelper(userId: string, menuId: string, rating: number, comment: string) {
  if (!userId || !menuId || !rating || !comment) {
    throw new Error("Semua field harus diisi");
  }

  try {
    await createReview({ userId, menuId, rating, comment });
  } catch (error) {
    throw new Error("Failed to create review: " + error.message);
  }
}
