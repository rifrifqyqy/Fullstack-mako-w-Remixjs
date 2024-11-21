import { AnimatePresence, motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import RemixButton from "~/components/Elements/RemixButton";
import { Suspense } from "react";
import { CardSkeleton_1 } from "~/components/Skeletons/CardSkeleton";

// image banner
const Banner = [
  "https://images.unsplash.com/photo-1413745000559-46fdd2d81cd7?q=80&w=1270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1560427183-4efd29c38997?q=80&w=1270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1505285360-458ff677f029?q=80&w=1270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1456426333805-2dde09207a79?q=80&w=1270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1595144780677-6d0b5abbd089?q=80&w=1270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];
// typescript
type Bakery = {
  keyBakery: string;
  bakeryTitle: string;
  bakeryThumb: string;
};

export default function HeroBanner({
  keyBakery,
  bakeryTitle,
  bakeryThumb,
}: Bakery) {
  return (
    <section className="mt-4 flex px-8">
      <figure className="overflow-hidden relative flex h-[620px] w-full justify-center rounded-3xl">
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
          <motion.div
            variants={ANIMATE_SCALE}
            initial="hidden"
            animate="visible"
          >
            <RemixButton
              to="/menu"
              stylebtn="text-[18px] font-medium px-6 py-3"
              title="Browse Pastries"
            />
          </motion.div>
        </h1>

        {/* latest menu card */}
        <Suspense fallback={<CardSkeleton_1 />}>
          <motion.div
            variants={ANIMATE_FRIGHT}
            initial="hidden"
            animate="visible"
            className="absolute bottom-0 right-0 z-20 m-4 flex flex-col gap-2"
          >
            <h1 className="w-fit rounded-full bg-zinc-200/20 px-4 py-2 font-medium text-white backdrop-blur-md">
              Latest Menu
            </h1>
            <div
              key={keyBakery}
              className="flex flex-col gap-2 rounded-2xl bg-zinc-200/20 p-2 backdrop-blur-md transition-shadow duration-300"
            >
              <article className="flex items-center justify-between">
                <h1 className="text-lg font-medium text-white">
                  {bakeryTitle}
                </h1>
                <div className="rounded-full bg-white p-1">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.68356 6.47716C9.26947 6.48726 8.94197 6.83113 8.95207 7.24522C8.96217 7.65931 9.30605 7.98681 9.72014 7.97671L9.68356 6.47716ZM16.968 7.79994C17.3821 7.78984 17.7096 7.44596 17.6995 7.03187C17.6894 6.61778 17.3455 6.29028 16.9314 6.30038L16.968 7.79994ZM17.6995 7.06845C17.7096 6.65436 17.3821 6.31048 16.968 6.30038C16.5539 6.29028 16.21 6.61778 16.1999 7.03187L17.6995 7.06845ZM16.0231 14.2797C16.013 14.6938 16.3405 15.0377 16.7546 15.0478C17.1687 15.0579 17.5126 14.7304 17.5227 14.3163L16.0231 14.2797ZM17.48 7.58049C17.7729 7.2876 17.7729 6.81272 17.48 6.51983C17.1871 6.22694 16.7123 6.22694 16.4194 6.51983L17.48 7.58049ZM6.51987 16.4193C6.22698 16.7122 6.22698 17.1871 6.51987 17.48C6.81276 17.7729 7.28764 17.7729 7.58053 17.48L6.51987 16.4193ZM9.72014 7.97671L16.968 7.79994L16.9314 6.30038L9.68356 6.47716L9.72014 7.97671ZM16.1999 7.03187L16.0231 14.2797L17.5227 14.3163L17.6995 7.06845L16.1999 7.03187ZM16.4194 6.51983L6.51987 16.4193L7.58053 17.48L17.48 7.58049L16.4194 6.51983Z"
                      fill="black"
                    />
                  </svg>
                </div>
              </article>

              <img
                src={bakeryThumb}
                alt=""
                className="aspect-square w-[240px] rounded-xl object-cover"
              />
            </div>
          </motion.div>
        </Suspense>
      </figure>
    </section>
  );
}

// ===================== animation logic =====================

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

const ANIMATE_FRIGHT = {
  hidden: {
    opacity: 0,
    x: "50%",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const ANIMATE_SCALE = {
  hidden: {
    scale: 0.6,
    opacity: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

// ====================== style =========================
const style = {
  swiperBtn:
    " rounded-full bg-white p-2 text-primary-100 hover:opacity-90 active:scale-90 transition-all",
};
