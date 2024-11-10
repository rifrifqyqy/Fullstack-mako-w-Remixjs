import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { prisma } from "./db.server";
// Inisialisasi storage untuk sesi
const sessionSecret = process.env.SESSION_SECRET || "defaultsecret";
export const storage = createCookieSessionStorage({
  cookie: {
    name: "RJ_session",
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    httpOnly: true,
  },
});

// Buat sesi login
export async function createSession(userId: string, redirectTo: string) {
  const session = await storage.getSession();
  session.set("userId", userId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}

// Dapatkan user dari sesi
export async function getUserSession(request: Request) {
  const session = await storage.getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");
  return userId;
}

// Middleware untuk mengharuskan admin
export async function requireAdmin(request: Request) {
  const userId = await getUserSession(request);
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (user?.role !== "admin") {
    throw redirect("/login");
  }
}

// Fungsi untuk logout
export async function logout(request: Request) {
  const session = await storage.getSession(request.headers.get("Cookie"));
  // Menghapus userId dari sesi
  session.unset("userId");

  // Mengembalikan cookie dengan sesi yang sudah dihapus
  return redirect("/", {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}