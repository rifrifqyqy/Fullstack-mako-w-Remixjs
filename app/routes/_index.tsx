/* eslint-disable import/no-unresolved */
import type { MetaFunction } from "@remix-run/node";
import { prisma } from "utils/db.server";
import { json, LoaderFunction } from "@remix-run/node";
import { Link, NavLink, useLoaderData } from "@remix-run/react";
import { getUserSession } from "utils/session.server";
import { RemixNavbarHome } from "~/components/Fragments/RemixNavbar";
import { AnimatePresence, motion } from "framer-motion";
import BreadMarquee from "~/components/Fragments/RemixMarquee";
import { getLatestMenu } from "utils/menu.server";
import { useEffect, useState } from "react";
import HomeCategoryLayout from "~/components/Layouts/_home.CategoryLayouts";
import Accordion from "~/components/Elements/RAccordion";
import RemixFooter from "~/components/Layouts/RemixFooter";
import HeroBanner from "~/components/Layouts/HeroBanner";

// =============================================== END IMPORTS STORE =============================================== //
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};
type menuType = {
  id: string;
  title: string;
  thumb: string;
  description: string;
  gallery: string[];
  kategori: string;
};
// Loader function
export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserSession(request);

  let currentUser = null;

  if (userId) {
    currentUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { username: true },
    });
  }
  const bakery = await getLatestMenu();
  return json({ currentUser, bakery });
};
// Tipe untuk loader data
type LoaderData = {
  currentUser: {
    username: string;
  } | null;
  bakery: menuType;
};

export default function Index() {
  const { currentUser, bakery } = useLoaderData<LoaderData>();
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
  // button handle previous image index

  const sentence =
    "Temukan berbagai pilihan roti, kue, dan pastry yang disiapkan khusus untuk Anda.";
  const words = sentence.split(" ");

  return (
    <main className="">
      <RemixNavbarHome
        to="/"
        btn_title={currentUser ? `` : "Login"}
        btn_to={currentUser ? "/logout" : "/login"}
        color={
          currentUser
            ? "bg-primary-100 capitalize px-2 text-white"
            : "bg-primary-100"
        }
        userIcon={currentUser ? true : false}
      />
      <nav className="flex justify-between gap-8 px-8 py-2">
        <BreadMarquee />
        <ul className="flex gap-4">
          <NavLink
            to="/menu"
            className="h-fit rounded-full px-4 py-2 font-medium ring-[1px] ring-zinc-300 transition-all hover:bg-primary-100 hover:text-white hover:ring-0"
          >
            Menu
          </NavLink>
          <NavLink
            to="/"
            className="h-fit rounded-full px-4 py-2 font-medium ring-[1px] ring-zinc-300 transition-all hover:bg-primary-100 hover:text-white hover:ring-0"
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
      <section className="mt-24 flex flex-col gap-16 px-8">
        <article className="flex flex-col gap-2">
          <motion.div
            variants={ANIMATE_TITLE_1}
            initial="hidden"
            animate="visible"
            className="flex w-fit gap-4 rounded-full bg-zinc-200 px-4 py-1"
          >
            <img src="images/danish.png" alt="" className="h-8" />
            <img src="images/buns.png" alt="" className="h-8" />
            <img src="images/cookie.png" alt="" className="h-8" />
          </motion.div>
          <motion.div
            variants={sentenceAnimation}
            initial="hidden"
            whileInView="visible"
            className="text-[54px] font-semibold"
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
      {/* accordion */}
      <section className="mt-32 px-8">
        <div className="flex flex-col gap-12 rounded-3xl border-2 border-zinc-200 px-8 pb-4 pt-12">
          <article className="mx-auto flex w-fit items-center gap-4">
            <motion.img
              variants={ANIMATE_KEYFRAME_2}
              initial="hidden"
              animate="visible"
              src="images/toast.png"
              className="h-12"
              alt=""
            />
            <h1 className="text-3xl font-semibold text-primary-100">
              Frequently Asked Questions
            </h1>
            <motion.img
              variants={ANIMATE_KEYFRAME}
              initial="hidden"
              animate="visible"
              src="images/cookie.png"
              className="h-12"
              alt=""
            />
          </article>
          <Accordion items={accordionData} />
        </div>
      </section>

      {/* cta layout */}
      <section className="mt-24 h-[280px] px-8">
        <figure
          className="relative grid h-full w-full grid-cols-2 items-center justify-between rounded-3xl border-2 border-primary-100 bg-cover bg-center bg-repeat"
          style={{ backgroundImage: "url(images/dotpattern.png)" }}
        >
          <div className="relative h-full">
            <img
              src="images/mockupmako.png"
              alt=""
              className="absolute bottom-0 left-1/3 w-[220px]"
            />
          </div>
          <article className="flex flex-col gap-6 pr-8">
            <h1 className="text-3xl font-semibold text-zinc-800">
              Download <span className="text-primary-100">MAKO</span> App on
              Google Play Store & Apple App Store
            </h1>
            <div className="flex gap-4">
              <Link
                to="https://play.google.com/store/apps/details?id=com.mako.app"
                className="flex h-fit w-fit transition-all hover:opacity-80 active:scale-95"
              >
                <img src="images/googleplay-btn.png" className="h-12" alt="" />
              </Link>
              <Link
                to="https://apps.apple.com/id/app/mako-cake-and-bakery/id1623760961"
                className="flex h-fit w-fit transition-all hover:opacity-80 active:scale-95"
              >
                <img src="images/appstore-btn.png" className="h-12" alt="" />
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

      {/* footer */}
      <RemixFooter />
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
