import { Link } from "@remix-run/react";
import { motion } from "framer-motion";
import { priceFormat } from "helper/priceFormat";
import { transformHyphenToSpace } from "helper/transformText";
export default function BreadCard({ children }: BreadTypes) {
  return (
    <motion.div
      className="menu-item group flex flex-col gap-2 rounded-2xl border border-zinc-200 bg-white p-2 transition-all hover:border-primary-100"
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

function Toppings({ title, thumb, kategori, DirecTo }: ToppingsTypes) {
  return (
    <figure className="relative">
      <Link to={DirecTo}>
        <img
          src={thumb}
          alt={title}
          className="aspect-square w-full rounded-xl object-cover"
        />
        <div className="absolute bottom-0 flex h-fit w-full p-3">
          <h1 className="ml-auto rounded-full bg-primary-100 px-4 py-1 text-sm font-semibold uppercase text-white">
            {transformHyphenToSpace(kategori)}
          </h1>
        </div>
      </Link>
    </figure>
  );
}

function Layer({ title, description, price }: LayerTypes) {
  return (
    <article className="flex h-full flex-col gap-2 rounded-xl bg-zinc-100 p-3">
      <h1 className="text-xl font-semibold text-primary-100">{title}</h1>
      <p className="line-clamp-2 text-[.875rem] text-zinc-600">{description}</p>
      <p className="ml-auto text-xl font-bold capitalize text-zinc-800">
        {priceFormat(price)}
      </p>
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
};
type LayerTypes = {
  title: string;
  description: string;
  price: number;
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
