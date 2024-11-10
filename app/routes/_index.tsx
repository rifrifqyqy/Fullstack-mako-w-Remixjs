import type { MetaFunction } from "@remix-run/node";
import { prisma } from "utils/db.server";
import { json, LoaderFunction } from "@remix-run/node";
import { NavLink, useLoaderData } from "@remix-run/react";
import { getUserSession } from "utils/session.server";
import { RemixNavbarMenu } from "~/components/Fragments/RemixNavbar";
import { AnimatePresence, motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import RemixButton from "~/components/Elements/RemixButton";
import HomeLayout from "~/components/Layouts/_home.CategoryLayouts";
import BreadMarquee from "~/components/Fragments/RemixMarquee";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
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

  return json({ currentUser });
};
// Tipe untuk loader data
type LoaderData = {
  currentUser: {
    username: string;
  } | null;
};

// image banner
const Banner = [
  "https://images.unsplash.com/photo-1413745000559-46fdd2d81cd7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1560427183-4efd29c38997?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1505285360-458ff677f029?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1456426333805-2dde09207a79?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1595144780677-6d0b5abbd089?q=80&w=2043&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];
export default function Index() {
  const { currentUser } = useLoaderData<LoaderData>();

  // button handle previous image index
  return (
    <main className="">
      <RemixNavbarMenu
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
            to="/"
            className="h-fit rounded-full border border-zinc-300 px-4 py-2 font-medium"
          >
            Menu
          </NavLink>
          <NavLink
            to="/"
            className="h-fit rounded-full border border-zinc-300 px-4 py-2 font-medium"
          >
            Outlet
          </NavLink>
        </ul>
      </nav>
      <section className="mt-4 flex px-8">
        <figure className="relative flex h-[620px] w-full justify-center overflow-hidden rounded-3xl">
          <AnimatePresence mode="wait">
            <Swiper
              modules={[Navigation, Autoplay]}
              navigation={{
                nextEl: ".swiper-next",
                prevEl: ".swiper-prev",
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination
              loop={true}
              className="h-full w-full"
              spaceBetween={0}
              slidesPerView={1}
            >
              {Banner.map((url, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={url}
                    alt={`Banner ${index + 1}`}
                    className="h-full w-full object-cover brightness-[40%]"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </AnimatePresence>
          <div className="absolute right-0 top-0 z-30 mr-6 mt-8 flex gap-4">
            <button className={`swiper-prev ${style.swiperBtn}`}>
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
            <button className={`swiper-next ${style.swiperBtn}`}>
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
          <article className="absolute left-0 top-0 z-10 ml-4 mt-12 rounded-3xl p-4">
            <motion.h1
              className="flex max-w-[60%] flex-col gap-6 text-[62px] leading-tight text-white"
              variants={ANIMATION_BANNER}
              initial="hidden"
              animate="visible"
            >
              Indulge yourself with our premium bread and pastries.
              <motion.div
                variants={ANIMATE_TITLE_1}
                className="flex items-start gap-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  className="rotate-[220deg]"
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
                <p className="max-w-[70%] text-lg font-normal text-zinc-300">
                  Freshly baked every morning, our bread and pastries are made
                  with the best ingredients.
                </p>
              </motion.div>
            </motion.h1>
          </article>
          <h1 className="absolute bottom-0 z-20 mb-[5%]">
            <RemixButton
              to="/"
              stylebtn="text-[18px] font-medium px-6 py-3"
              title="Browse Pastries"
            />
          </h1>
        </figure>
      </section>

      <div>
        <h1>Welcome to Remix!</h1>
        <button className="swiper-next">Next</button>
        {/* menampilkan current user */}
        {currentUser ? currentUser.username : "guest"}
      </div>
      <section className="mt-16 px-8">
        <HomeLayout />
      </section>
    </main>
  );
}

// animation logic
const ANIMATION_BANNER = {
  hidden: {
    opacity: 0,
    x: "-100%",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
      when: "beforeChildren",
      staggerChildren: 0.3,
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

// style
const style = {
  swiperBtn:
    " rounded-full bg-white p-2 text-primary-100 hover:opacity-90 active:scale-90 transition-all",
};
