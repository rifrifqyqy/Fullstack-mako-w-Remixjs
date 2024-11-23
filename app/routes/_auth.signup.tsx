import { prisma } from "utils/db.server";
import { json, redirect } from "@remix-run/node";
import { useActionData, Form, useNavigation, Link } from "@remix-run/react";
import bcrypt from "bcryptjs";
import { useState } from "react";
import LoginBanner from "~/components/Layouts/LoginBanner";
import { storage } from "utils/session.server";
import HeaderAuthNav from "~/components/Fragments/HeaderAuthNav";

// type data define
type ActionData = {
  error?: string;
};

//  BACKEND LOGIC
export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const passwordConfirmation = formData.get("passwordConfirmation") as string;

  // Validasi input
  if (!username || !password || !passwordConfirmation) {
    return json({ error: "Semua field harus diisi" }, { status: 400 });
  }
  if (password !== passwordConfirmation) {
    return json({ error: "Password tidak cocok" }, { status: 400 });
  }

  try {
    // Periksa apakah username sudah ada
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return json(
        { error: "Username sudah ada, silakan gunakan username lain." },
        { status: 400 },
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Buat user baru
    await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        role: "user",
      },
    });
    // Simpan pesan sukses dalam sesi
    const session = await storage.getSession();
    session.set("successMessage", "Akun berhasil dibuat! Silakan login.");
    return redirect("/login", {
      headers: {
        "Set-Cookie": await storage.commitSession(session),
      },
    });
  } catch (error: any) {
    console.error(error);
    return json(
      { error: "Terjadi kesalahan saat membuat akun." },
      { status: 500 },
    );
  }
}

export default function Signup() {
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  navigation.formData;
  navigation.formMethod;
  navigation.formAction;
  const isSubmitting = navigation.state === "submitting";
  const loadingSubmitting = navigation.state === "loading";

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <main className="grid max-h-dvh grid-cols-2">
      <section className="flex flex-col">
        <HeaderAuthNav />
        <Form
          method="post"
          className="m-auto w-full max-w-lg rounded-lg bg-white p-8"
        >
          <article className="flex flex-col items-center gap-4">
            <h1 className="text-5xl font-semibold text-gray-800">
              create account!
            </h1>
            <p className="text-center text-zinc-600">
              Daftar Sekarang dan Temukan Nikmatnya Roti Artisan Kami!
            </p>
          </article>

          <div className="mt-24 flex flex-col gap-6">
            <div
              className={`${inputStyle} relative flex items-center justify-between focus-within:ring-2 focus-within:ring-primary-100`}
            >
              <input
                type="text"
                name="username"
                id="username"
                required
                placeholder="Username"
                className="default-input h-full w-full appearance-none rounded-full px-6 py-4 outline-none focus:outline-none"
              />
            </div>
            <div
              className={`${inputStyle} relative flex items-center justify-between focus-within:ring-2 focus-within:ring-primary-100`}
            >
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                required
                placeholder="Password"
                className="default-input h-full w-full appearance-none rounded-full px-6 py-4 outline-none focus:outline-none"
              />
              <button
                className="absolute right-0 mr-4"
                onClick={togglePasswordVisibility}
                type="button"
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="text-gray-500"
                  >
                    <g fill="currentColor">
                      <path d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0" />
                      <path d="M21.894 11.553C19.736 7.236 15.904 5 12 5s-7.736 2.236-9.894 6.553a1 1 0 0 0 0 .894C4.264 16.764 8.096 19 12 19s7.736-2.236 9.894-6.553a1 1 0 0 0 0-.894M12 17c-2.969 0-6.002-1.62-7.87-5C5.998 8.62 9.03 7 12 7s6.002 1.62 7.87 5c-1.868 3.38-4.901 5-7.87 5" />
                    </g>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="text-gray-500"
                  >
                    <path
                      fill="currentColor"
                      d="M4.707 3.293a1 1 0 0 0-1.414 1.414l2.424 2.424c-1.43 1.076-2.678 2.554-3.611 4.422a1 1 0 0 0 0 .894C4.264 16.764 8.096 19 12 19c1.555 0 3.1-.355 4.53-1.055l2.763 2.762a1 1 0 0 0 1.414-1.414zm10.307 13.135c-.98.383-2 .572-3.014.572c-2.969 0-6.002-1.62-7.87-5c.817-1.479 1.858-2.62 3.018-3.437l2.144 2.144a3 3 0 0 0 4.001 4.001zm3.538-2.532c.483-.556.926-1.187 1.318-1.896c-1.868-3.38-4.9-5-7.87-5q-.168 0-.336.007L9.879 5.223A10.2 10.2 0 0 1 12 5c3.903 0 7.736 2.236 9.894 6.553a1 1 0 0 1 0 .894a13 13 0 0 1-1.925 2.865z"
                    />
                  </svg>
                )}
              </button>
            </div>
            {/* password confirmation */}
            <div
              className={`${inputStyle} relative flex items-center justify-between focus-within:ring-2 focus-within:ring-primary-100`}
            >
              <input
                type={showPassword ? "text" : "password"}
                name="passwordConfirmation"
                id="password"
                required
                placeholder="Password"
                className="default-input h-full w-full appearance-none rounded-full px-6 py-4 outline-none focus:outline-none"
              />
              <button
                className="absolute right-0 mr-4"
                onClick={togglePasswordVisibility}
                type="button"
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="text-gray-500"
                  >
                    <g fill="currentColor">
                      <path d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0" />
                      <path d="M21.894 11.553C19.736 7.236 15.904 5 12 5s-7.736 2.236-9.894 6.553a1 1 0 0 0 0 .894C4.264 16.764 8.096 19 12 19s7.736-2.236 9.894-6.553a1 1 0 0 0 0-.894M12 17c-2.969 0-6.002-1.62-7.87-5C5.998 8.62 9.03 7 12 7s6.002 1.62 7.87 5c-1.868 3.38-4.901 5-7.87 5" />
                    </g>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="text-gray-500"
                  >
                    <path
                      fill="currentColor"
                      d="M4.707 3.293a1 1 0 0 0-1.414 1.414l2.424 2.424c-1.43 1.076-2.678 2.554-3.611 4.422a1 1 0 0 0 0 .894C4.264 16.764 8.096 19 12 19c1.555 0 3.1-.355 4.53-1.055l2.763 2.762a1 1 0 0 0 1.414-1.414zm10.307 13.135c-.98.383-2 .572-3.014.572c-2.969 0-6.002-1.62-7.87-5c.817-1.479 1.858-2.62 3.018-3.437l2.144 2.144a3 3 0 0 0 4.001 4.001zm3.538-2.532c.483-.556.926-1.187 1.318-1.896c-1.868-3.38-4.9-5-7.87-5q-.168 0-.336.007L9.879 5.223A10.2 10.2 0 0 1 12 5c3.903 0 7.736 2.236 9.894 6.553a1 1 0 0 1 0 .894a13 13 0 0 1-1.925 2.865z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {actionData?.error && (
            <p className="mt-2 text-sm font-medium text-red-600">
              {actionData.error}
            </p>
          )}
          <button
            type="submit"
            className={`mt-12 w-full rounded-full bg-primary-100 px-4 py-2 text-base font-semibold uppercase text-white transition duration-200 hover:bg-primary-200 active:scale-90 ${
              isSubmitting ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sign in..." : "Create Account"}
          </button>
          <footer className="mt-[15%] flex items-center justify-center gap-1">
            Have an account?
            <Link
              to="/login"
              className="text-zinc-600 underline hover:text-primary-100"
            >
              Login
            </Link>
          </footer>
        </Form>
      </section>

      {/* image banner */}
      <section className="flex h-screen p-4">
        <LoginBanner />
      </section>
    </main>
  );
}
const inputStyle =
  "w-full appearance-none rounded-full border border-gray-300 text-gray-800 shadow-sm outline-none focus:border-transparent focus:ring-[2px] focus:ring-primary-100";
