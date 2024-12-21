/* eslint-disable import/no-unresolved */
import type { MetaFunction } from "@remix-run/node";
import { json, LoaderFunction } from "@remix-run/node";
import { Link, NavLink, useLoaderData } from "@remix-run/react";
import { RemixNavbarHome } from "~/components/Fragments/RemixNavbar";
import { AnimatePresence, motion } from "framer-motion";
import { getAllMenu, getLatestMenu } from "utils/menu.server";
import { useEffect, useState } from "react";
import HomeCategoryLayout from "~/components/Layouts/_home.CategoryLayouts";
import Accordion from "~/components/Elements/RAccordion";
import HeroBanner from "~/components/Layouts/HeroBanner";
import BreadCard from "~/components/Fragments/Card/CardProduct";
import RemixButton from "~/components/Elements/RemixButton";
import SearchBar from "~/components/Elements/_SearchBar";
import { getCurrentUser } from "hooks/currentUser";
import { menuType } from "types/bakeryTypes";

// =============================================== END IMPORTS STORE =============================================== //
export const meta: MetaFunction = () => {
  return [
    { title: "MAKO | Beranda" },
    { name: "description", content: "Selamat Datang di Mako Bakery" },
  ];
};

// Loader function
export const loader: LoaderFunction = async ({ request }) => {
  let currentUser = await getCurrentUser(request);
  const bakery = await getLatestMenu();
  const menuData = await getAllMenu();
  // Sorting berdasarkan `createdAt` (terbaru di atas)
  const sortedMenuData = menuData.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return json({ currentUser, bakery, sortedMenuData, menuData });
};
// Tipe untuk loader data
type LoaderData = {
  currentUser: {
    username: string;
    id: string;
    role: string;
  } | null;
  bakery: menuType;
  menuData: menuType[];
  sortedMenuData: menuType[];
};

export default function Index() {
  const { currentUser, bakery, sortedMenuData, menuData } =
    useLoaderData<LoaderData>();
  const [showToast, setShowToast] = useState(false);
  useEffect(() => {
    if (currentUser && !localStorage.getItem("toastShown")) {
      setShowToast(true);
      localStorage.setItem("toastShown", "true");
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  }, [currentUser]);

  const sentence =
    "Temukan berbagai pilihan roti, kue, dan pastry yang disiapkan khusus untuk Anda.";
  const words = sentence.split(" ");

  const sentence2 =
    "Jadilah yang pertama menikmati kreasi roti dan pastry terbaru kami!";
  const words2 = sentence2.split(" ");

  return (
    <main className="">
      <RemixNavbarHome
        to="/"
        btn_title={currentUser ? `` : "Login"}
        btn_to={currentUser ? "" : "/login"}
        btn_title_mobile={currentUser ? `Logout` : ""}
        color={
          currentUser
            ? "bg-primary-100 capitalize px-2 text-white"
            : "bg-primary-100"
        }
        userIcon={currentUser ? true : false}
        dataUser={currentUser}
      />
      <nav className="flex px-4 py-2 md:gap-8 md:px-8">
        <div className="w-full gap-8 md:grid md:grid-cols-2">
          <p className="line-clamp-1 h-full rounded-full bg-light-200 px-4 py-2 font-medium max-md:hidden"></p>
          <SearchBar dataSearch={menuData} />
        </div>

        <ul className="hidden gap-4 md:flex">
          <NavLink
            to="/menu"
            className="h-fit rounded-full px-4 py-2 font-medium ring-2 ring-zinc-200 transition-all hover:bg-primary-100 hover:text-white hover:ring-0"
          >
            Menu
          </NavLink>
          <NavLink
            to="/"
            className="h-fit rounded-full px-4 py-2 font-medium ring-2 ring-zinc-200 transition-all hover:bg-primary-100 hover:text-white hover:ring-0"
          >
            Outlet
          </NavLink>
        </ul>
      </nav>
      {/* Herosection Banner */}
      <HeroBanner
        keyBakery={bakery.id}
        bakeryThumb={bakery.thumb}
        bakeryTitle={bakery.title}
      />
      {/* end herosection banner */}

      {/* category layout */}

      <section className="mt-12 flex flex-col gap-4 px-4 md:mt-24 md:gap-16 md:px-8">
        <article className="flex flex-col gap-2">
          <motion.div
            variants={ANIMATE_TITLE_1}
            initial="hidden"
            animate="visible"
            className="flex w-fit gap-4 rounded-full bg-zinc-200 px-4 py-1"
          >
            <img src="images/danish.png" alt="" className="h-6 md:h-8" />
            <img src="images/buns.png" alt="" className="h-6 md:h-8" />
            <img src="images/cookie.png" alt="" className="h-6 md:h-8" />
          </motion.div>
          <motion.div
            variants={sentenceAnimation}
            initial="hidden"
            whileInView="visible"
            className="text-[2em] font-semibold md:text-[54px]"
          >
            {words.map((word, index) => (
              <span key={index} className="inline-block overflow-clip">
                <motion.span
                  variants={wordAnimation}
                  className={`mr-2 inline-block ${
                    ["pastry", "disiapkan"].includes(word)
                      ? "text-primary-100"
                      : ""
                  }`}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.div>
        </article>
        <HomeCategoryLayout />
      </section>
      {/* end category layout */}
      {/* menu data loop */}
      <main className="flex flex-col">
        <section className="mt-12 flex flex-col gap-2 px-4 md:mt-24 md:px-8">
          <motion.article
            variants={sentenceAnimation}
            initial="hidden"
            whileInView="visible"
            className="w-[80%] self-end text-end text-[2em] font-semibold md:text-[54px]"
          >
            {words2.map((word, index) => (
              <span key={index} className="inline-block overflow-clip">
                <motion.span
                  variants={wordAnimation}
                  className={`mr-2 inline-block ${
                    ["menikmati", "terbaru"].includes(word)
                      ? "text-primary-100"
                      : ""
                  }`}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.article>
        </section>
        <section className="mt-8 grid grid-cols-2 gap-2 px-4 sm:grid-cols-3 md:mt-16 md:grid-cols-4 md:gap-8 md:px-8 xl:grid-cols-5 2xl:grid-cols-5">
          {sortedMenuData.slice(0, 5).map((menu, index) => (
            <BreadCard key={menu.id} index={index}>
              <BreadCard.Toppings
                DirecTo={`/menu/${menu.id}`}
                thumb={menu.thumb}
                title={menu.title}
                kategori={menu.kategori}
                rating={menu.averageRating.toFixed(1)}
              />
              <BreadCard.Layer
                kategori={menu.kategori}
                title={menu.title}
                description={menu.description}
                price={menu.price}
              />
            </BreadCard>
          ))}
        </section>
        <div className="mx-auto mt-8">
          <RemixButton
            title="Lihat Semua"
            stylebtn="pr-2 md:text-base text-sm md:font-semibold font-medium"
            to="/menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              className="order-2 text-white"
            >
              <path
                d="M9.68356 6.47716C9.26947 6.48726 8.94197 6.83113 8.95207 7.24522C8.96217 7.65931 9.30605 7.98681 9.72014 7.97671L9.68356 6.47716ZM16.968 7.79994C17.3821 7.78984 17.7096 7.44596 17.6995 7.03187C17.6894 6.61778 17.3455 6.29028 16.9314 6.30038L16.968 7.79994ZM17.6995 7.06845C17.7096 6.65436 17.3821 6.31048 16.968 6.30038C16.5539 6.29028 16.21 6.61778 16.1999 7.03187L17.6995 7.06845ZM16.0231 14.2797C16.013 14.6938 16.3405 15.0377 16.7546 15.0478C17.1687 15.0579 17.5126 14.7304 17.5227 14.3163L16.0231 14.2797ZM17.48 7.58049C17.7729 7.2876 17.7729 6.81272 17.48 6.51983C17.1871 6.22694 16.7123 6.22694 16.4194 6.51983L17.48 7.58049ZM6.51987 16.4193C6.22698 16.7122 6.22698 17.1871 6.51987 17.48C6.81276 17.7729 7.28764 17.7729 7.58053 17.48L6.51987 16.4193ZM9.72014 7.97671L16.968 7.79994L16.9314 6.30038L9.68356 6.47716L9.72014 7.97671ZM16.1999 7.03187L16.0231 14.2797L17.5227 14.3163L17.6995 7.06845L16.1999 7.03187ZM16.4194 6.51983L6.51987 16.4193L7.58053 17.48L17.48 7.58049L16.4194 6.51983Z"
                fill="currentColor"
              />
            </svg>
          </RemixButton>
        </div>
      </main>
      {/* end menu data loop */}

      {/* accordion */}
      <section className="mt-12 px-4 md:mt-24 md:px-8">
        <div className="flex flex-col gap-12 rounded-3xl border-2 border-zinc-200 px-4 pb-4 pt-8 md:px-8 md:pt-12">
          <article className="mx-auto flex w-fit items-center gap-4">
            <motion.img
              variants={ANIMATE_KEYFRAME_2}
              initial="hidden"
              animate="visible"
              src="images/toast.png"
              className="h-8 md:h-12"
              alt=""
            />
            <h1 className="text-center text-lg font-semibold text-primary-100 md:text-3xl">
              Frequently Asked Questions
            </h1>
            <motion.img
              variants={ANIMATE_KEYFRAME}
              initial="hidden"
              animate="visible"
              src="images/cookie.png"
              className="h-8 md:h-12"
              alt=""
            />
          </article>
          <Accordion items={accordionData} />
        </div>
      </section>

      {/* cta layout */}
      <section className="mt-24 h-[500px] px-4 md:h-[280px] md:px-8">
        <figure
          className="relative h-full w-full items-center justify-center gap-8 rounded-3xl border-2 border-primary-100 bg-cover bg-center bg-repeat max-md:flex max-md:flex-col max-md:p-4 md:grid md:grid-cols-2 md:justify-between"
          style={{ backgroundImage: "url(images/dotpattern.png)" }}
        >
          <div className="relative h-full w-full max-md:flex max-md:justify-center">
            <img
              src="images/mockupmako.png"
              alt=""
              className="absolute bottom-0 aspect-auto h-full md:left-1/3 md:w-[220px]"
            />
          </div>
          <article className="flex flex-col gap-6 pr-8">
            <h1 className="text-xl font-semibold text-zinc-800 md:text-3xl">
              Download <span className="text-primary-100">MAKO</span> App on
              Google Play Store & Apple App Store
            </h1>
            <div className="flex gap-4">
              <Link
                to="https://play.google.com/store/apps/details?id=com.mako.app"
                className="flex h-fit w-fit transition-all hover:opacity-80 active:scale-95"
              >
                <img
                  src="images/googleplay-btn.png"
                  className="h-10 md:h-12"
                  alt=""
                />
              </Link>
              <Link
                to="https://apps.apple.com/id/app/mako-cake-and-bakery/id1623760961"
                className="flex h-fit w-fit transition-all hover:opacity-80 active:scale-95"
              >
                <img
                  src="images/appstore-btn.png"
                  className="h-10 md:h-12"
                  alt=""
                />
              </Link>
            </div>
          </article>
        </figure>
      </section>

      {/* ====================== toast, modal, alert components ====================== */}
      {/* toast component for welcome login */}
      <AnimatePresence mode="wait">
        {showToast && (
          <motion.div
            className="fixed bottom-0 right-0 z-50 m-8 flex transform items-center gap-4 rounded-xl bg-zinc-200/70 p-4 text-primary-100 shadow-md backdrop-blur-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <img src="images/furina.png" className="h-16 object-cover" alt="" />
            <p className="text-xl font-semibold capitalize">
              Welcome {currentUser?.username}!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      {/* end toast */}
    </main>
  );
}

// ===================== ACCORDION DATA =====================
const accordionData = [
  {
    title: " Apakah semua produk dibuat fresh setiap hari?",
    content:
      "Ya! Semua produk kami dibuat segar setiap hari dengan bahan-bahan berkualitas premium untuk menjamin rasa terbaik.",
  },
  {
    title: "Apakah bisa memesan kue ulang tahun atau kue custom?",
    content:
      "Tentu saja! Kami menerima pesanan kue ulang tahun, kue pernikahan, atau kue custom lainnya. Silakan hubungi kami melalui Kontak untuk konsultasi desain dan rasa.",
  },
  {
    title: "Bagaimana cara memesan produk Mako Bakery?",
    content:
      "Anda dapat mengunjungi outlet kami langsung atau melaui pihak ketiga, yaitu GoFood, GrabFood, atau ShopeeFood.",
  },
];
// ===================== END ACCORDION DATA =====================

// ===================== animation logic =====================

const ANIMATE_KEYFRAME = {
  hidden: {
    opacity: 1,
    rotate: -15,
  },
  visible: {
    opacity: 1,
    rotate: 15,
    transition: {
      duration: 0.2,
      repeat: Infinity,
      repeatType: "reverse",
      repeatDelay: 0.7,
    },
  },
};
const ANIMATE_KEYFRAME_2 = {
  hidden: {
    opacity: 1,
    rotate: -15,
  },
  visible: {
    opacity: 1,
    rotate: 15,
    transition: {
      delay: 0.4,
      duration: 0.2,
      repeat: Infinity,
      repeatType: "reverse",
      repeatDelay: 0.7,
    },
  },
};

const ANIMATE_TITLE_1 = {
  hidden: {
    opacity: 0,
    y: "-100%",
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const wordAnimation = {
  hidden: {
    opacity: 1,
    y: "100%",
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const sentenceAnimation = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// ====================== style =========================
