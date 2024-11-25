import { prisma } from "utils/db.server"; // Pastikan path ke Prisma sesuai
import { getUserSession } from "utils/session.server";
// Pastikan path ke session sesuai

export async function getCurrentUser(request: Request) {
  const userId = await getUserSession(request);

  if (!userId) return null;

  const currentUser = await prisma.user.findUnique({
    where: { id: userId },
    select: { username: true, id: true },
  });

  return currentUser;
}
