/* eslint-disable import/no-unresolved */
// app/routes/dashboard/menu.tsx
import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getAllMenu } from "utils/menu.server";
import categoryMenu from "data/category.json";
import { RemixNavbarMenu } from "~/components/Fragments/RemixNavbar";
import { Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import BreadCard from "~/components/Fragments/CardProduct";
import { useCategory } from "helper/CategoryContext";

type Menu = {
  id: number;
  title: string;
  description: string;
  thumb: string;
  gallery: string[];
  kategori: string;
  price: number;
};
// Loader function untuk mengambil data menu
export const loader: LoaderFunction = async () => {
  const menu = await getAllMenu();
  return json(menu);
};
export default function Menu() {
  const menus = useLoaderData<Menu[]>();
  const { activeCategory, setActiveCategory } = useCategory();

  const filteredMenus = menus.filter(
    (menu) => menu.kategori === activeCategory,
  );

  // handleclick category
  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <main className="flex flex-col px-8">
      <RemixNavbarMenu />
      <section className="relative mt-8 flex h-[200px] w-full overflow-hidden rounded-3xl bg-cover">
        <article className="m-auto flex flex-col gap-2">
          <h1 className="z-10 mx-auto w-fit text-5xl font-semibold uppercase text-white">
            Menu
          </h1>
          <p className="z-10 text-zinc-200">
            Temukan berbagai pilihan roti, kue, dan pastry yang disiapkan khusus
            untuk Anda. Dari roti lembut hingga kue premium
          </p>
        </article>

        <img
          src="https://images.unsplash.com/photo-1568254183919-78a4f43a2877?q=80&w=1280&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="absolute h-full w-full object-cover brightness-50"
        />
      </section>
      <header className="mt-8 flex w-full">
        <ul className="scrollbar-hide flex w-full justify-between gap-4 overflow-x-scroll">
          <Suspense fallback={<div>Loading...</div>}>
            {categoryMenu.map((category) => (
              <button
                className={`w-full text-nowrap rounded-xl px-4 py-2 text-center font-semibold capitalize transition-all duration-300 ${
                  activeCategory === category.name
                    ? "bg-primary-100 text-white"
                    : "bg-zinc-200"
                }`}
                key={category.name}
                onClick={() => handleCategoryClick(category.name)}
              >
                {category.displayName}{" "}
                {activeCategory === category.name &&
                  `(${filteredMenus.length})`}
              </button>
            ))}
          </Suspense>
        </ul>
      </header>
      <section className="menu-data mt-6 grid grid-cols-5 justify-items-center gap-6">
        <Suspense fallback={<div>Loading...</div>}>
          <AnimatePresence mode="wait">
            {filteredMenus.length > 0 ? (
              filteredMenus.map((menu) => (
                <BreadCard key={menu.id}>
                  <BreadCard.Toppings
                    DirecTo={`/menu/${menu.id}`}
                    thumb={menu.thumb}
                    title={menu.title}
                    kategori={menu.kategori}
                  />
                  <BreadCard.Layer
                    title={menu.title}
                    description={menu.description}
                    price={menu.price}
                  />
                </BreadCard>
              ))
            ) : (
              <div className="col-span-5 flex h-full w-full flex-col items-center justify-center gap-4 rounded-3xl border-2 p-8">
                <img
                  src="/images/no-data.png"
                  className="aspect-auto h-32"
                  alt=""
                />
                <p className="text-center font-semibold">No menu available</p>
              </div>
            )}
          </AnimatePresence>
        </Suspense>
      </section>
    </main>
  );
}

// ========================== ANIMATION ==========================
