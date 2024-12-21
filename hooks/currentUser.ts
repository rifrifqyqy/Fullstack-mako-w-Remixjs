import { prisma } from "utils/db.server";
import { getUserSession } from "utils/session.server";

export async function getCurrentUser(request: Request) {
  const userId = await getUserSession(request);

  if (!userId) return null;

  const currentUser = await prisma.user.findUnique({
    where: { id: userId },
    select: { username: true, id: true, role: true },
  });

  return currentUser;
}
