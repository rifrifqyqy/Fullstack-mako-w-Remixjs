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
