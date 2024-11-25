import { Link, useFetcher } from "@remix-run/react";
import { motion } from "framer-motion";
import { priceFormat } from "helper/priceFormat";
import { transformHyphenToSpace } from "helper/transformText";
import { useState } from "react";

export default function BreadCard({ children }: BreadTypes) {
  return (
    <motion.div
      className="menu-item group flex flex-col gap-2 rounded-2xl border-2 border-transparent bg-white p-2 transition-all hover:border-primary-100"
      style={{ boxShadow: "rgba(0, 0, 0, 0.1) -4px 9px 25px -6px" }}
      variants={CARD_ANIMATION}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}

function Toppings({ title, thumb, kategori, DirecTo, rating }: ToppingsTypes) {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <figure className="relative">
      <Link to={DirecTo}>
        {/* onload placeholder image */}
        {!isLoaded && (
          <img
            src="images/placeholder-img.jpg"
            alt=""
            className="absolute inset-0 aspect-square w-full rounded-xl object-cover"
          />
        )}

        <img
          src={thumb}
          alt={title}
          className={`aspect-square w-full rounded-xl object-cover transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setIsLoaded(true)}
        />
        <div className="absolute bottom-0 flex h-fit w-full items-center justify-between p-3">
          <h1 className="rounded-full bg-primary-100 px-4 py-1 text-sm font-semibold uppercase text-white">
            {transformHyphenToSpace(kategori)}
          </h1>
          <h1 className="flex gap-2 rounded-full bg-white pr-3 pl-2 py-1 text-sm font-semibold uppercase">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="text-yellow-500"
            >
              <path
                fill="currentColor"
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2L9.19 8.62L2 9.24l5.45 4.73L5.82 21z"
              />
            </svg>
            {rating}
          </h1>
        </div>
      </Link>
    </figure>
  );
}

function Layer({ title, description, price, deleteID }: LayerTypes) {
  const fetcher = useFetcher();

  // handle delete menu
  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this menu?")) return;
    fetcher.submit(
      { id: deleteID },
      { method: "post", action: "/menu/delete" },
    );
  };
  return (
    <article className="flex h-full flex-col gap-2 rounded-xl bg-zinc-100 p-3">
      <h1 className="line-clamp-1 text-xl font-semibold text-primary-100">
        {title}
      </h1>
      <p className="line-clamp-2 text-[.875rem] text-zinc-600">{description}</p>
      <p className="ml-auto mt-auto text-xl font-bold capitalize text-zinc-800">
        {priceFormat(price)}
      </p>

      {/* <button
        onClick={handleDelete}
        className="rounded bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-700"
      >
        {fetcher.state === "submitting" ? "Deleting..." : "Delete"}
      </button> */}
    </article>
  );
}

type BreadTypes = {
  children: React.ReactNode;
};
type ToppingsTypes = {
  title: string;
  thumb: string;
  kategori: string;
  DirecTo: string;
  rating: number;
};

type LayerTypes = {
  title: string;
  description: string;
  price: number;
  deleteID: number;
};
BreadCard.Toppings = Toppings;
BreadCard.Layer = Layer;

// ============================ CARD ANIMATION =========================== //
const CARD_ANIMATION = {
  hidden: {
    opacity: 0,
    y: "5%",
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.83, 0, 0.17, 1],
    },
  },
  exit: {
    opacity: 0,
    y: "-5%",
    transition: {
      duration: 0.3,
      ease: [0.83, 0, 0.17, 1],
    },
  },
};
