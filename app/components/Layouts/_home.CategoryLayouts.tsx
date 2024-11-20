import dataCategory from "../../../data/category.json";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "@remix-run/react";
import RemixButton from "../Elements/RemixButton";
import { transformHyphenToSpace } from "helper/transformText";

// types
interface CategoryType {
  name: string;
  img: string;
}

export default function HomeCategoryLayout() {
  const [activeCategory, setActiveCategory] = useState<CategoryType>(
    dataCategory[0],
  );

  return (
    <main className="grid grid-cols-3 gap-4">
      <section className="col-span-1">
        <motion.ul
          variants={ANIMATION_WRAP}
          initial="hidden"
          animate="visible"
          className="flex w-fit flex-col gap-4"
        >
          {dataCategory.map((category) => (
            <motion.div
              variants={ANIMATE_FLEFT}
              role="button"
              key={category.name}
              onClick={() => setActiveCategory(category)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setActiveCategory(category);
                }
              }}
              tabIndex={0}
              className={`menu group/item flex w-full cursor-pointer items-center justify-between gap-44 rounded-full border border-zinc-300 p-2 text-center capitalize transition-all ${activeCategory?.name === category.name ? "bg-primary-100 text-white" : "bg-zinc-50"}`}
            >
              <h1 className="ml-2">{transformHyphenToSpace(category.name)}</h1>
              <div className="w-fit rounded-full bg-white p-1 transition-all group-hover/item:rotate-45">
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
            </motion.div>
          ))}
        </motion.ul>
      </section>

      {/* Image Section */}
      <motion.section
        variants={ANIMATE_FRIGHT}
        initial="hidden"
        animate="visible"
        className="relative col-span-2 cursor-pointer transition-all hover:brightness-[85%]"
      >
        <NavLink to={`/menu/${activeCategory.name}`}>
          <div className="absolute z-10 flex h-full w-full flex-col gap-4 opacity-0 hover:opacity-100">
            <section className="m-auto flex flex-col gap-10">
              <figure className="flex items-center gap-8">
                <img
                  src="https://www.makobakery.com/assets/img/logo-mako.png"
                  className="h-10 border-r-[4px] border-white pr-6"
                  alt=""
                />
                <p className="text-4xl uppercase text-white">
                  {transformHyphenToSpace(activeCategory.name)}
                </p>
              </figure>
              <RemixButton
                to={`/menu?category=${activeCategory.name}`}
                title=""
                stylebtn="w-fit mx-auto uppercase text-lg"
              >
                {transformHyphenToSpace(activeCategory.name)}
              </RemixButton>
            </section>
          </div>
        </NavLink>
        <section className="relative h-[480px]">
          <AnimatePresence>
            <motion.img
              variants={ANIMATION_IMAGE}
              initial="hidden"
              animate="visible"
              exit="exit"
              key={activeCategory.name}
              src={activeCategory.img}
              alt={activeCategory.name}
              className="absolute h-fit w-full rounded-3xl"
            />
          </AnimatePresence>
        </section>
      </motion.section>
    </main>
  );
}

// value animate
const ANIMATION_IMAGE = {
  hidden: {
    opacity: 0,
    y: "50%",
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  exit: {
    opacity: 0,
    y: "-50%",
    transition: {
      duration: 0.2,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const ANIMATION_WRAP = {
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const ANIMATE_FLEFT = {
  hidden: {
    opacity: 0,
    x: "-100%",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const ANIMATE_FRIGHT = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,

    transition: {
      duration: 0.3,
      staggerChildren: 0.2,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};
