import { LoaderFunction } from "@remix-run/node";
import { MetaFunction, useLoaderData } from "@remix-run/react";
import { format } from "date-fns";
import { formatDateAgo } from "hooks/formatDateAgo";
import { usePagination } from "hooks/usePagination";
import { paginateType } from "types/bakeryTypes";
import { userType } from "types/userTypes";
import { getPaginatedUser } from "utils/user.server";
import Pagination from "~/components/Fragments/Pagination";

export const meta: MetaFunction = () => {
  return [
    { title: "Dashboard | User" },
    { name: "description", description: "dashboard user mako bakery" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = parseInt(url.searchParams.get("limit") || "7");

  const { userPaginated: users, totalItems } = await getPaginatedUser(
    page,
    limit,
  );

  const pagination = usePagination({ currentPage: page, totalItems, limit });
  // cara return user dan return json pagination
  return { dataUser: users, pagination };
};

type LoaderData = {
  dataUser: userType[];
  pagination: paginateType;
};

export default function DashboardUser() {
  const { dataUser, pagination } = useLoaderData<LoaderData>();
  console.log(dataUser);

  return (
    <main>
      <section className="mt-8 flex flex-col gap-4">
        {/* Daftar menu */}
        <ul className="flex flex-col gap-4">
          <header className="__table-wrapper grid grid-cols-6 font-semibold">
            <article className="col-span-2">ID</article>
            <article>username</article>
            <article>role</article>
            <article>terakhir login</article>
            <article>tanggal bergabung</article>
          </header>
          <section className="flex flex-col gap-4">
            {dataUser.map((menu) => (
              <main className="__table-wrapper __table-content grid grid-cols-6">
                <article className="col-span-2 line-clamp-1">{menu.id}</article>
                <article>{menu.username}</article>
                <article className="w-fit rounded-full bg-emerald-100 px-3 py-0.5 text-emerald-600">
                  {menu.role}
                </article>
                <article>{formatDateAgo(menu.lastLogin)}</article>
                <article>
                  {format(new Date(menu.createdAt), "dd MMMM yyyy")}
                </article>
              </main>
            ))}
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              hasNextPage={pagination.hasNextPage}
              hasPrevPage={pagination.hasPrevPage}
              baseUrl="/dashboard/user"
            />
          </section>
        </ul>
      </section>
    </main>
  );
}
