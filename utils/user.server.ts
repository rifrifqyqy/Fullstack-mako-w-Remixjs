import { prisma } from "./db.server";

// :GET data user
export async function getAllUser() {
  const users = await prisma.user.findMany();
  return users;
}

// :GET data user paginated
export async function getPaginatedUser(page: number, limit: number) {
  const totalItems = await prisma.user.count({
    where: {
      role: {
        not: "admin",
      },
    },
  });
  const userPaginated = await prisma.user.findMany({
    where: {
      role: {
        not: "admin",
      },
    },
    skip: (page - 1) * limit,
    take: limit,
  });

  return { userPaginated, totalItems };
}

// :GET data admin paginated
export async function getPaginatedAdmin(page: number, limit: number) {
  const totalItems = await prisma.user.count({
    where: {
      role: "admin",
    },
  });
  const adminPaginated = await prisma.user.findMany({
    where: {
      role: "admin",
    },
    skip: (page - 1) * limit,
    take: limit,
  });

  return { adminPaginated, totalItems };
}
