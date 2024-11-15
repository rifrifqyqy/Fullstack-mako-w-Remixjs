// app/routes/dashboard/menu.tsx
import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getAllMenu } from "utils/menu.server";
import categoryMenu from "data/category.json";
import { RemixNavbarMenu } from "~/components/Fragments/RemixNavbar";
import { Suspense, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
type Menu = {
  id: number;
  title: string;
  description: string;
  thumb: string;
  gallery: string[];
  kategori: string;
};
// Loader function untuk mengambil data menu
export const loader: LoaderFunction = async () => {
  const menu = await getAllMenu();
  return json(menu);
};
export default function Menu() {
  const menus = useLoaderData<Menu[]>();
  const [activeCategory, setActiveCategory] = useState("danish");
  const filteredMenus = menus.filter(
    (menu) => menu.kategori === activeCategory,
  );
  console.log(menus);

  // handleclick category
  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <main className="flex flex-col px-8">
      <RemixNavbarMenu to="" />
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
      <section className="menu-data mt-6 grid grid-cols-4 justify-items-center gap-12">
        <AnimatePresence mode="popLayout">
          {filteredMenus.length > 0 ? (
            filteredMenus.map((menu) => (
              <motion.div
                className="menu-item rounded-xl border p-2"
                key={menu.id}
                variants={CARD_ANIMATION}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <img
                  src={menu.thumb}
                  alt={menu.title}
                  className="aspect-square w-full object-cover"
                />
                <h1>{menu.title}</h1>
                <p>{menu.description}</p>
                <p>{menu.kategori}</p>
              </motion.div>
            ))
          ) : (
            <div className="col-span-4 flex h-full w-full flex-col items-center justify-center gap-4 rounded-3xl border-2 p-8">
              <img
                src="/images/no-data.png"
                className="aspect-auto h-32"
                alt=""
              />
              <p className="text-center font-semibold">No menu available</p>
            </div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}

// ========================== ANIMATION ==========================

const CARD_ANIMATION = {
  hidden: {
    opacity: 0,
    y: "-10%",
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.83, 0, 0.17, 1],
    },
  },
  exit: {
    opacity: 0,
    y: "10%",
    transition: {
      duration: 0.5,
      ease: [0.83, 0, 0.17, 1],
    },
  },
};
