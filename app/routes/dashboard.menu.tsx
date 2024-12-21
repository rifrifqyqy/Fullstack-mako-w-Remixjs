import { json, LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { div } from "framer-motion/client";
import { priceFormat } from "hooks/priceFormat";
import { usePagination } from "hooks/usePagination";
import { URL } from "node:url";
import { menuType, paginateType } from "types/bakeryTypes";
import { getAllMenu, getPaginatedMenu } from "utils/menu.server";
import SearchBar from "~/components/Elements/_SearchBar";
import RemixButton from "~/components/Elements/RemixButton";
import Pagination from "~/components/Fragments/Pagination";

export const meta: MetaFunction = () => {
  return [
    { title: "Dashboard | Menu" },
    { name: "description", content: "Menu Mako Bakery" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = parseInt(url.searchParams.get("limit") || "6");

  const { menuspaginate: menus, totalItems } = await getPaginatedMenu(
    page,
    limit,
  );
  const pagination = usePagination({ currentPage: page, totalItems, limit });

  return json({
    menus,
    pagination,
  });
};

type LoaderData = {
  menus: menuType[];
  pagination: paginateType;
};

export default function DashboardMenu() {
  const { menus, pagination } = useLoaderData<LoaderData>();
  console.log(menus);

  return (
    <main className="flex flex-col">
      <header className="flex items-center gap-4">
        <SearchBar dataSearch={menus} />
        <ul className="flex">
          <RemixButton
            to="/dashboard/menu/new"
            title="Tambah Roti"
            stylebtn="flex-nowrap w-max"
            color="bg-primary-100 text-white font-medium hover:opacity-70"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.3em"
              height="1.3em"
              viewBox="0 0 24 24"
            >
              <g fill="none">
                <path
                  fill="currentColor"
                  d="M21 7c0 2.21-4.03 4-9 4S3 9.21 3 7s4.03-4 9-4s9 1.79 9 4"
                ></path>
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 7c0 2.21-4.03 4-9 4S3 9.21 3 7m18 0c0-2.21-4.03-4-9-4S3 4.79 3 7m18 0v5M3 7v5m9 4c-4.97 0-9-1.79-9-4m0 0v5c0 2.21 4.03 4 9 4m6-6v3m0 3v-3m0 0h3m-3 0h-3"
                ></path>
              </g>
            </svg>
          </RemixButton>
        </ul>
      </header>
      <section className="mt-8 flex flex-col gap-4">
        {/* Daftar menu */}
        <ul className="flex flex-col gap-4">
          <header className="__table-wrapper grid w-full grid-cols-7 font-semibold">
            <article className="col-span-2">ID</article>
            <article>Nama Roti</article>
            <article>Deskripsi</article>
            <article>Kategori</article>
            <article>Harga</article>
            <article>Rating</article>
          </header>
          {menus.map((menu) => (
            <article
              key={menu.id}
              className="__table-wrapper __table-content grid w-full grid-cols-7"
            >
              <p className="col-span-2 line-clamp-1">{menu.id}</p>
              <figure className="flex gap-4">
                <h3 className="my-auto">{menu.title}</h3>
              </figure>
              <p className="line-clamp-1 h-fit overflow-hidden">
                {menu.description}
              </p>
              <p className="w-fit rounded-full bg-primary-100/15 px-3 py-0.5 text-primary-100">
                {menu.kategori}
              </p>
              <p>{priceFormat(menu.price)}</p>
              <p className="flex w-fit items-center gap-2 rounded-full bg-light-200 py-0.5 pl-2 pr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.3em"
                  height="1.3em"
                  viewBox="0 0 24 24"
                  className="text-amber-500"
                >
                  <path
                    fill="currentColor"
                    d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2L9.19 8.62L2 9.24l5.45 4.73L5.82 21z"
                  ></path>
                </svg>
                {menu.averageRating}
              </p>
            </article>
          ))}
        </ul>

        {/* Pagination */}
        <div className="pagination mt-6 flex justify-center gap-4">
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            hasNextPage={pagination.hasNextPage}
            hasPrevPage={pagination.hasPrevPage}
            baseUrl="/dashboard/menu"
          />
        </div>
      </section>
    </main>
  );
}
