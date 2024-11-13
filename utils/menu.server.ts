import { prisma } from "./db.server";

// fungsi mengambil semua data menu dari database
export async function getAllMenu() {
  return await prisma.menu.findMany();
}
// fungsi mengambil data menu berdasarkan id
export async function getMenu(id: string) {
  return await prisma.menu.findUnique({
    where: { id },
  });
}

// fungsi mengambil data menu terbaru
export async function getLatestMenu() {
  return await prisma.menu.findFirst({
    orderBy: { id: "desc" },
  });
}
