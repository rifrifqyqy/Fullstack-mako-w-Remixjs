import { prisma } from "utils/db.server";
import { json } from "@remix-run/node";
import {
  useActionData,
  Form,
  useNavigation,
  useLoaderData,
  Link,
} from "@remix-run/react";
import bcrypt from "bcryptjs";
import { createSession, storage } from "utils/session.server";
import { useEffect, useState } from "react";
import LoginBanner from "~/components/Layouts/LoginBanner";
import HeaderAuthNav from "~/components/Fragments/HeaderAuthNav";

// TYPE DEFINE
type ActionData = {
  error?: string;
  request?: string;
  state: boolean;
  success?: boolean;
};

// BACKEND LOGIC
export async function action({ request }) {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");

  try {
    console.log("Processing login for user:", username);

    // Cari user berdasarkan username
    const user = await prisma.user.findUnique({ where: { username } });
    console.log("User found:", user);

    if (!user) {
      console.error("User not found");
      return json({ error: "Username atau password salah" }, { status: 400 });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", passwordMatch);

    if (!passwordMatch) {
      console.error("Password tidak cocok");
      return json({ error: "Username atau password salah" }, { status: 400 });
    }

    // Update lastLogin
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });
    return createSession(user.id, "/");
  } catch (error) {
    console.error("Error during login:", error);
    return json({ error: "Terjadi kesalahan pada server." }, { status: 500 });
  }
}
export async function loader({ request }) {
  const session = await storage.getSession(request.headers.get("Cookie"));
  const successMessage = session.get("successMessage") || null;
  session.unset("successMessage");

  return json(
    { successMessage },
    {
      headers: {
        "Set-Cookie": await storage.commitSession(session),
      },
    },
  );
}

//  FRONTEND LOGIC
export default function Login() {
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState(false);
  navigation.formData;
  navigation.formMethod;
  navigation.formAction;
  const isSubmitting = navigation.state === "submitting";
  const { successMessage } = useLoaderData<{ successMessage: string }>();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  // toast useeffect untuk memunculkan success message
  useEffect(() => {
    if (successMessage) {
      setToast(true);
    }
    setTimeout(() => {
      setToast(false);
    }, 3000);
  }, [successMessage]);

  const toggleToast = () => {
    setToast((prev) => !prev);
  };
  return (
    <main className="relative max-h-dvh md:grid md:grid-cols-2">
      {toast && successMessage && (
        <div className="fixed right-0 top-0 z-50 m-4 flex h-fit w-fit items-start gap-4 rounded-xl bg-white px-4 py-3 shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 48 48"
            className="mt-1 text-green-600"
          >
            <defs>
              <mask id="ipSCheckOne0">
                <g fill="none" strokeLinejoin="round" strokeWidth="4">
                  <path
                    fill="#fff"
                    stroke="#fff"
                    d="M24 44a19.94 19.94 0 0 0 14.142-5.858A19.94 19.94 0 0 0 44 24a19.94 19.94 0 0 0-5.858-14.142A19.94 19.94 0 0 0 24 4A19.94 19.94 0 0 0 9.858 9.858A19.94 19.94 0 0 0 4 24a19.94 19.94 0 0 0 5.858 14.142A19.94 19.94 0 0 0 24 44Z"
                  />
                  <path
                    stroke="#000"
                    strokeLinecap="round"
                    d="m16 24l6 6l12-12"
                  />
                </g>
              </mask>
            </defs>
            <path
              fill="currentColor"
              d="M0 0h48v48H0z"
              mask="url(#ipSCheckOne0)"
            />
          </svg>
          <div className="relative flex gap-3">
            <article className="flex flex-col gap-1">
              <p className="text-base font-medium text-primary-100">
                Login Berhasil
              </p>
              <p className="text-sm text-zinc-600">
                Silahkan Masukkan akun anda!
              </p>
            </article>

            <button
              onClick={toggleToast}
              className="mb-auto rounded-full p-1 text-sm hover:bg-slate-300 active:scale-90"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M18.36 19.78L12 13.41l-6.36 6.37l-1.42-1.42L10.59 12L4.22 5.64l1.42-1.42L12 10.59l6.36-6.36l1.41 1.41L13.41 12l6.36 6.36z"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
      {/* end toast */}

      {/* main component */}
      <section className="flex flex-col">
        <HeaderAuthNav />
        <Form
          method="post"
          className="m-auto w-full max-w-lg rounded-lg bg-white p-8"
        >
          <article className="flex flex-col items-center gap-4">
            <img src="/images/mako.svg" alt="" className="h-12" />
            <h1 className="text-[2em] font-semibold text-gray-800 md:text-5xl">
              welcome back!
            </h1>
            <p className="text-center text-[1em] text-zinc-600">
              Selamat datang kembali! Masuk untuk menikmati berbagai menu
              menarik dari Mako Bakery.
            </p>
          </article>

          <div className="mt-12 flex flex-col gap-6 md:mt-24">
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
          </div>
          {actionData?.error && (
            <p className="mt-2 text-sm font-medium text-red-600">
              {actionData.error}
            </p>
          )}
          <div className="flex flex-col gap-4">
            <button
              type="submit"
              className={`mt-12 w-full rounded-full bg-primary-100 px-4 py-2 text-sm font-semibold uppercase text-white transition duration-200 hover:bg-primary-200 active:scale-90 md:text-base ${
                isSubmitting ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </div>
          <footer className="mt-[20%] flex items-center justify-center">
            <Link
              to="/signup"
              className="text-zinc-600 underline hover:text-primary-100 max-md:text-sm"
            >
              Create Account
            </Link>
          </footer>
        </Form>
      </section>
      <section className="flex h-screen p-4 max-md:hidden">
        <LoginBanner />
      </section>
    </main>
  );
}

// ========================= style =========================

const inputStyle =
  "w-full appearance-none rounded-full border border-gray-300 text-gray-800 shadow-sm outline-none focus:border-transparent focus:ring-[2px] focus:ring-primary-100 max-md:text-sm";
