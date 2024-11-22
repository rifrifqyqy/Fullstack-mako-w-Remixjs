import { LoaderFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import { AnimatePresence, motion } from "framer-motion";
import { priceFormat } from "helper/priceFormat";
import { transformHyphenToSpace } from "helper/transformText";
import { useState } from "react";
import { getMenu } from "utils/menu.server";
import RemixButton from "~/components/Elements/RemixButton";
import { RemixNavbarMenu } from "~/components/Fragments/RemixNavbar";

// BACKEND LOGIC ambil data menu per(:id)
export const loader: LoaderFunction = async ({ params }) => {
  const { menu } = params;
  if (!menu) {
    throw new Response("Menu ID is required", { status: 400 });
  }
  const menuData = await getMenu(menu);
  if (!menuData) {
    throw new Response("Menu not found", { status: 404 });
  }
  return json(menuData);
};

// typescript
type MenuType = {
  id: string;
  title: string;
  thumb: string;
  description: string;
  gallery: string[];
  kategori: string;
  price: number;
};

// END BACKEND LOGIC

// ================== FRONTEND LOGIC ================
export default function MenuDetail() {
  const menu = useLoaderData<MenuType>();
  const [activeImage, setActiveImage] = useState(0);
  // end state and hooks

  // Fungsi untuk mengubah gambar aktif
  const handleImageClick = (index: number) => {
    setActiveImage(index);
  };

  // handle button prev | next
  const handlePrev = () => {
    setActiveImage((prevIndex) =>
      prevIndex === 0 ? menu.gallery.length - 1 : prevIndex - 1,
    );
  };
  const handleNext = () => {
    setActiveImage((prevIndex) => (prevIndex + 1) % menu.gallery.length);
  };
  return (
    <main className="px-8">
      {/* navbar */}
      <RemixNavbarMenu NavbarTitle={menu.title} />
      {/* end navbar */}

      {/* main content */}
      <main className="mt-8 grid grid-cols-3 gap-8">
        <section className="col-span-2">
          <figure className="relative flex flex-col justify-center gap-4">
            <AnimatePresence mode="wait">
              <motion.img
                variants={ANIMA_TAB_IMG}
                initial="hidden"
                animate="visible"
                key={menu.gallery[activeImage]}
                exit="exit"
                src={menu.gallery[activeImage]}
                alt=""
                className="menu-show h-[550px] rounded-2xl object-contain bg-zinc-200"
              />
            </AnimatePresence>
            <div className="absolute inset-0 my-auto mb-[10%] flex w-full items-center justify-between px-6">
              <button
                onClick={handlePrev}
                className="rounded-full bg-white p-2 text-primary-100 transition-all active:scale-90"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m12 19l-7-7l7-7m7 7H5"
                  />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="rounded-full bg-white p-2 text-primary-100 transition-all active:scale-90"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 12h14m-7-7l7 7l-7 7"
                  />
                </svg>
              </button>
            </div>
            <figure className="scrollbar-hide flex w-full items-center gap-2 overflow-x-scroll p-1">
              {menu.gallery.map((image, index) => (
                <div key={index}>
                  <button
                    onClick={() => handleImageClick(index)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ")
                        handleImageClick(index);
                    }}
                    className={`aspect-video h-24 overflow-hidden rounded-xl transition-all ${
                      activeImage === index
                        ? "ring-2 ring-primary-100"
                        : "brightness-50"
                    }`}
                    style={{
                      padding: 0,
                      border: "none",
                      background: "transparent",
                    }}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                </div>
              ))}
            </figure>
          </figure>
        </section>
        <section className="flex flex-col gap-4 rounded-2xl">
          <article className="flex w-full flex-col gap-1 rounded-2xl border-2 border-zinc-300 p-6 text-primary-100">
            <h1 className="text-2xl font-bold uppercase">{menu.title}</h1>
            <div className="w-fit rounded-full bg-primary-100/15 px-3 py-1 text-sm capitalize text-primary-100">
              {transformHyphenToSpace(menu.kategori)}
            </div>
            <p className="mt-2 text-zinc-600">{menu.description}</p>
            <article className="mt-2 grid w-full grid-cols-2 gap-1 border-t-2 border-zinc-300 pt-4">
              <h2 className="mb-auto text-2xl font-bold text-primary-100">
                {priceFormat(menu.price)}
              </h2>
              <h2 className="trasition-all flex text-sm cursor-pointer items-center justify-end text-zinc-500 hover:text-zinc-900">
                ⓘ informasi pembelian
              </h2>
            </article>
            <RemixButton
              title="Beli di GoFood"
              to=""
              stylebtn="flex justify-center mt-4 font-medium uppercase"
            />
          </article>
        </section>
      </main>
      {/* end main content */}
    </main>
  );
}

// ================ ANIMATION LOGIC ===============

const ANIMA_TAB_IMG = {
  hidden: {
    opacity: 0.9,
  },
  visible: {
    opacity: 1,
    transition: {
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0.9,
    transition: {
      ease: "easeInOut",
    },
  },
};
