import { prisma } from "./db.server";
import type { Review } from "@prisma/client";

// Fungsi umum untuk query review
async function getReviewByCriteria(criteria: Partial<Review>) {
  return prisma.review.findMany({ where: criteria });
}

// Create atau Update review
export async function saveReview(
  menuId: string,
  userId: string,
  rating: number,
  comment: string,
  reviewId?: string,
) {
  if (reviewId) {
    return prisma.review.update({
      where: { id: reviewId },
      data: { rating, comment },
    });
  } else {
    return prisma.review.create({
      data: { menuId, userId, rating, comment },
    });
  }
}

// Get reviews for a menu with usernames
export async function getReviewsWithUsernames(menuId: string) {
  const reviews = await prisma.review.findMany({
    where: { menuId },
    orderBy: { createdAt: "desc" },
  });

  // Ambil semua userId dari reviews
  const userIds = Array.from(new Set(reviews.map((review) => review.userId)));

  // Query username untuk semua userId
  const users = await prisma.user.findMany({
    where: { id: { in: userIds } },
    select: { id: true, username: true },
  });

  // Buat map userId -> username
  const userMap = users.reduce(
    (map, user) => {
      map[user.id] = user.username;
      return map;
    },
    {} as Record<string, string>,
  );

  // merge username ke reviews
  return reviews.map((review) => ({
    ...review,
    username: userMap[review.userId] || "Unknown User",
  }));
}

// Get user's review for a menu
export async function getUserReviewForMenu(
  userId: string,
  menuId: string,
): Promise<Review | null> {
  const reviews = await getReviewByCriteria({ userId, menuId });
  return reviews.length > 0 ? reviews[0] : null;
}

// Check if user has reviewed menu
export async function hasReviewedMenu(
  userId: string,
  menuId: string,
): Promise<boolean> {
  const reviews = await getReviewByCriteria({ userId, menuId });
  console.log("Reviews:", reviews);
  return reviews.length > 0;
}

// Delete review by criteria
export async function deleteReviewByCriteria(criteria: Partial<Review>) {
  return prisma.review.deleteMany({ where: criteria });
}

// Delete specific review
export async function deleteReview(reviewId: string): Promise<void> {
  await deleteReviewByCriteria({ id: reviewId });
}
