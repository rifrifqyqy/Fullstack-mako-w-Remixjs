/* eslint-disable import/no-unresolved */
// app/routes/dashboard/menu.tsx
import { json, LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData, useNavigate, useSearchParams } from "@remix-run/react";
import { getAllMenu } from "utils/menu.server";
import categoryMenu from "data/category.json";
import { RemixNavbarMenu } from "~/components/Fragments/RemixNavbar";
import { Suspense, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import BreadCard from "~/components/Fragments/Card/CardProduct";
import { useCategory } from "helper/CategoryContext";
import RemixFooter from "~/components/Layouts/RemixFooter";

export const meta: MetaFunction = () => {
  return [
    { title: "MAKO | Menu" },
    { name: "description", content: "Menu di Mako Bakery" },
  ];
};

type Review = {
  id: number;
  rating: number;
  comment: string;
  userId: string;
};
type Menu = {
  averageRating: any;
  id: number;
  title: string;
  description: string;
  thumb: string;
  gallery: string[];
  kategori: string;
  price: number;
  reviews: Review[];
};
// Loader function untuk mengambil data menu
export const loader: LoaderFunction = async () => {
  const menus = await getAllMenu();
  return json({ menus });
};

export default function Menu() {
  const { menus } = useLoaderData<{ menus: Menu[] }>();
  console.log(menus);
  const { activeCategory, setActiveCategory } = useCategory();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const filteredMenus = menus.filter(
    (menu) => menu.kategori === activeCategory,
  );

  // handleclick category
  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };

  // get category params
  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setActiveCategory(category);
      navigate("/menu", { replace: true });
    }
  }, [searchParams, setActiveCategory, navigate]);

  return (
    <main className="wrapper">
      {/* component menu */}
      <main className="flex flex-col px-4 md:px-8">
        <RemixNavbarMenu NavbarTitle="Menu Books" />
        <section className="relative mt-8 hidden h-[200px] w-full overflow-hidden rounded-3xl bg-cover md:flex">
          <article className="m-auto flex flex-col gap-2">
            <h1 className="z-10 mx-auto w-fit text-5xl font-semibold uppercase text-white">
              Menu
            </h1>
            <p className="z-10 text-zinc-200">
              Temukan berbagai pilihan roti, kue, dan pastry yang disiapkan
              khusus untuk Anda. Dari roti lembut hingga kue premium
            </p>
          </article>

          <img
            src="https://images.unsplash.com/photo-1568254183919-78a4f43a2877?q=80&w=1280&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="absolute h-full w-full object-cover brightness-50"
          />
        </section>
        <header className="mt-6 flex w-full md:mt-8">
          <ul className="scrollbar-hide flex w-full justify-between gap-2 overflow-x-scroll md:gap-4">
            <Suspense fallback={<div>Loading...</div>}>
              {categoryMenu.map((category) => (
                <button
                  className={`flex w-full items-center justify-center gap-2 text-nowrap rounded-xl px-4 py-2 text-center font-semibold capitalize transition-all duration-300 max-md:text-sm ${
                    activeCategory === category.name
                      ? "bg-primary-100 text-white"
                      : "bg-zinc-200"
                  }`}
                  key={category.name}
                  onClick={() => handleCategoryClick(category.name)}
                >
                  {category.displayName}
                  {activeCategory === category.name && (
                    <p className="rounded-full bg-white px-1.5 text-xs text-primary-100 md:px-2 md:text-sm">
                      {filteredMenus.length}
                    </p>
                  )}
                </button>
              ))}
            </Suspense>
          </ul>
        </header>
        <section className="menu-data mt-6 grid grid-cols-2 justify-items-center gap-2 sm:grid-cols-3 md:grid-cols-4 md:gap-6 xl:grid-cols-5 2xl:grid-cols-5">
          <AnimatePresence mode="wait">
            {filteredMenus.length > 0 ? (
              filteredMenus.map((menu) => (
                <BreadCard key={menu.id}>
                  <BreadCard.Toppings
                    DirecTo={`/menu/${menu.id}`}
                    thumb={menu.thumb}
                    title={menu.title}
                    kategori={menu.kategori}
                    rating={menu.averageRating?.toFixed(1)}
                  />
                  <BreadCard.Layer
                    title={menu.title}
                    kategori={menu.kategori}
                    description={menu.description}
                    price={menu.price}
                    deleteID={menu.id}
                  />
                </BreadCard>
              ))
            ) : (
              <div className="col-span-5 flex h-full w-full flex-col items-center justify-center gap-4 rounded-3xl border-2 p-8">
                <img
                  src="/images/no-data.png"
                  className="aspect-auto h-20 md:h-32"
                  alt=""
                />
                <p className="text-center font-semibold">No menu available</p>
              </div>
            )}
          </AnimatePresence>
        </section>
      </main>
      {/* end component menu */}
    </main>
  );
}

// ========================== ANIMATION ==========================
