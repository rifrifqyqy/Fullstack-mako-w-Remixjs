import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";
import { CategoryProvider } from "helper/CategoryContext";
import { useGlobalLoading } from "helper/LoadingContext";
import LoadingModal from "./components/Fragments/LoadingModal";
import RemixFooter from "./components/Layouts/RemixFooter";

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
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-white text-zinc-800">
        <main className="container mx-auto w-full">
          {isLoading && <LoadingModal title=" Memuat Roti..." />}
          {children}
          <ScrollRestoration />
          <Scripts />
        </main>
        {/* footer */}
        {signuppage || loginpage ? null : <RemixFooter />}
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
