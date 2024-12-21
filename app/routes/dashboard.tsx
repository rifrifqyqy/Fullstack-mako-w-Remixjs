import { LoaderFunction } from "@remix-run/node";
import {
  Link,
  MetaFunction,
  NavLink,
  Outlet,
  redirect,
} from "@remix-run/react";
import { requireAdmin } from "utils/session.server";
import AdminNavbar from "~/components/Fragments/AdminNavbar";
import "../../public/css/dashboard.css";
import { useDashboardRedirect } from "hooks/useRedirect";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
export const meta: MetaFunction = () => {
  return [
    { title: "MAKO | Dashboard" },
    { name: "description", content: "Dashboard Mako Bakery" },
  ];
};
// loader function :Remix
export const loader: LoaderFunction = async ({ request }) => {
  const redirectBeranda = useDashboardRedirect(request);
  if (redirectBeranda) return redirectBeranda;
  await requireAdmin(request);
  return null;
};
// end loader function :Remix
let sidebarmenu = [
  {
    name: "Beranda",
    navigate: "/dashboard/beranda",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 min-h-6 w-6"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M14 9q-.425 0-.712-.288T13 8V4q0-.425.288-.712T14 3h6q.425 0 .713.288T21 4v4q0 .425-.288.713T20 9zM4 13q-.425 0-.712-.288T3 12V4q0-.425.288-.712T4 3h6q.425 0 .713.288T11 4v8q0 .425-.288.713T10 13zm10 8q-.425 0-.712-.288T13 20v-8q0-.425.288-.712T14 11h6q.425 0 .713.288T21 12v8q0 .425-.288.713T20 21zM4 21q-.425 0-.712-.288T3 20v-4q0-.425.288-.712T4 15h6q.425 0 .713.288T11 16v4q0 .425-.288.713T10 21z"
        ></path>
      </svg>
    ),
  },

  {
    name: "Admin",
    navigate: "/dashboard/admin",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.3em"
        height="1.3em"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M12 14v8H4a8 8 0 0 1 8-8m0-1c-3.315 0-6-2.685-6-6s2.685-6 6-6s6 2.685 6 6s-2.685 6-6 6m9 4h1v5h-8v-5h1v-1a3 3 0 1 1 6 0zm-2 0v-1a1 1 0 1 0-2 0v1z"
        ></path>
      </svg>
    ),
  },
  {
    name: "User",
    navigate: "/dashboard/user",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.5em"
        height="1.5em"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"
        ></path>
      </svg>
    ),
  },
  {
    name: "Menu",
    navigate: "/dashboard/menu",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.3em"
        height="1.3em"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M20 6c0-2.168-3.663-4-8-4S4 3.832 4 6v2c0 2.168 3.663 4 8 4s8-1.832 8-4zm-8 13c-4.337 0-8-1.832-8-4v3c0 2.168 3.663 4 8 4s8-1.832 8-4v-3c0 2.168-3.663 4-8 4"
        ></path>
        <path
          fill="currentColor"
          d="M20 10c0 2.168-3.663 4-8 4s-8-1.832-8-4v3c0 2.168 3.663 4 8 4s8-1.832 8-4z"
        ></path>
      </svg>
    ),
  },
];
// main component
export default function DashboardPage() {
  const miniSidebar = "w-[6%]";
  const largeSidebar = "w-[20%]";
  const [sizeSidebar, setSizeSidebar] = useState(largeSidebar);
  const toggleSidebar = () => {
    setSizeSidebar(sizeSidebar === largeSidebar ? miniSidebar : largeSidebar);
  };

  return (
    <>
      <main className="max-h-dvh p-3">
        <main className="flex min-h-screen gap-12 rounded-2xl bg-gray-100 p-4">
          <section
            className={twMerge(`relative p-4 transition-all`, sizeSidebar)}
          >
            <header className="flex w-full flex-col">
              <figure className="mx-auto flex w-full gap-4 rounded-xl bg-primary-100/20 bg-white p-5 text-2xl font-semibold text-primary-100">
                <img src="/images/mako-m.svg" className="h-8" alt="" />
                <p
                  className={`${sizeSidebar === largeSidebar ? "" : "hidden"}`}
                >
                  Mako
                </p>
              </figure>

              <button
                className="absolute right-0 top-16 -mr-6 rounded-full bg-white p-2 shadow-md"
                onClick={toggleSidebar}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.3em"
                  height="1.3em"
                  viewBox="0 0 24 24"
                  className={`${sizeSidebar === largeSidebar ? "rotate-180" : ""} text-primary-100`}
                >
                  <path
                    fill="currentColor"
                    d="M4 11v2h12v2h2v-2h2v-2h-2V9h-2v2zm10-4h2v2h-2zm0 0h-2V5h2zm0 10h2v-2h-2zm0 0h-2v2h2z"
                  ></path>
                </svg>
              </button>
            </header>
            <ul className="mt-20 flex flex-col gap-5 font-medium transition-all">
              {sidebarmenu.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.navigate}
                    className={`flex aspect-auto w-full items-center rounded-full bg-light-300 ring-2 ring-transparent transition-all hover:ring-primary-100 ${sizeSidebar === largeSidebar ? "px-6 py-3" : "px-2 py-3"} `}
                    id="dashboard"
                  >
                    <div
                      className={`${sizeSidebar === largeSidebar ? "" : "mx-auto"} flex items-center gap-4 transition-all`}
                    >
                      {item?.icon}
                      <p
                        className={`${sizeSidebar === largeSidebar ? "block" : "hidden"}`}
                      >
                        {item.name}
                      </p>
                    </div>
                  </NavLink>
                </li>
              ))}
            </ul>
          </section>
          <section className="flex w-full flex-col gap-6 pr-4">
            <AdminNavbar />
            <main className="h-full w-full rounded-3xl bg-white p-4">
              <Outlet />
            </main>
          </section>
        </main>
      </main>
    </>
  );
}
