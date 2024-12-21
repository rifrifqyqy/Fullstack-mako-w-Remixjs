import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useRouteError,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";
import { CategoryProvider } from "hooks/CategoryContext";
import { useGlobalLoading } from "hooks/LoadingContext";
import LoadingModal from "./components/Fragments/LoadingModal";
import RemixFooter from "./components/Layouts/RemixFooter";
import { motion } from "framer-motion";
import RemixButton from "./components/Elements/RemixButton";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { isLoading } = useGlobalLoading();
  const location = useLocation();
  const loginpage = location.pathname.includes("/login");
  const signuppage = location.pathname.includes("/signup");
  const dashboardpage = location.pathname.includes("/dashboard");
  const routeError = useRouteError();
  const isError = routeError ? true : false;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="text-zinc-800">
        <main className="mx-auto min-h-screen w-full 2xl:container">
          {isLoading && <LoadingModal title=" Memuat Roti..." />}
          {children}
          <ScrollRestoration />
          <Scripts />
        </main>
        {/* footer */}
        {!signuppage && !loginpage && !isError && !dashboardpage && (
          <RemixFooter />
        )}
      </body>
    </html>
  );
}

export default function App() {
  return (
    <CategoryProvider>
      <Outlet />
    </CategoryProvider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
        <figure className="rounded-xl border border-primary-100 p-6">
          <svg
            className="h-12 md:h-20"
            viewBox="0 0 344 254"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M17.5 243.167L1 137.667C42 220.667 61.5 214.667 76.5 207.167C116.1 176.767 122 133.834 120 116.167C122.4 58.567 97 36.8337 84 33.167C77.2 29.967 65.5 35.5003 60.5 38.667C60.1667 26.8337 65.7 2.86699 90.5 1.66699C115.3 0.466992 127.833 16.8337 131 25.167L174 142.667C181.833 117.334 199.3 61.667 206.5 41.667C213.7 21.667 225.167 10.3335 230 7.16676C268.5 -12.3332 282.5 19.6668 284 30.6668C285.2 39.4668 282.167 39.6668 280.5 38.6668C259 26.6669 250 36.1668 239 51.6668C229.4 63.6668 225.333 90.0002 224.5 101.667C215.3 144.867 245.333 186.667 261.5 202.167C296.3 233.367 329.5 170.167 342.5 135.667L326.5 243.167C243.7 280.767 206 201.5 197.5 157.167C190.833 178.667 177.1 222.167 175.5 224.167C173.9 226.167 170.833 225 169.5 224.167L147 160.167C123 266.967 50.6667 260 17.5 243.167Z"
              fill="#8D1535"
              stroke="#8D1535"
              strokeWidth="2"
              initial={{
                pathLength: 0,
                fill: "rgba(255, 255, 255)",
              }}
              animate={{
                pathLength: 1,
                fill: "#8D1535",
              }}
              transition={{
                duration: 3,
                ease: "easeInOut",
              }}
            />
          </svg>
        </figure>
        <article className="mt-4 flex flex-col items-center gap-4 md:mt-8">
          <h1 className="text-2xl font-bold text-primary-100 md:text-5xl">
            {error.status} {error.statusText}
          </h1>
          <p className="text-center text-sm text-gray-700 md:text-xl">
            {error?.data || "Something went wrong."}
          </p>
        </article>
        <RemixButton
          to="/"
          title="Back to Homepage"
          stylebtn="mt-4 max-md:text-xs font-medium"
          color="bg-gray-800"
        />
      </main>
    );
  } else if (error instanceof Error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
        <h1 className="text-6xl font-bold text-red-500">Error</h1>
        <p className="mt-4 text-xl text-gray-700">{error.message}</p>
        <p className="mt-6 text-gray-500">
          The stack trace is:
          <pre className="mt-2 overflow-auto rounded bg-gray-200 p-4 text-sm text-gray-600">
            {error.stack}
          </pre>
        </p>
        <a
          href="/"
          className="mt-6 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Back to Home
        </a>
      </div>
    );
  } else {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
        <h1 className="text-6xl font-bold text-red-500">Unknown Error</h1>
        <p className="mt-4 text-xl text-gray-700">Something went wrong.</p>
        <a
          href="/"
          className="mt-6 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Back to Home
        </a>
      </div>
    );
  }
}
