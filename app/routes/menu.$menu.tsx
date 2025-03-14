import { ActionFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { json, Link, redirect, useLoaderData } from "@remix-run/react";
import { AnimatePresence, motion } from "framer-motion";
import { getCurrentUser } from "hooks/currentUser";
import { priceFormat } from "hooks/priceFormat";
import { transformHyphenToSpace } from "hooks/transformText";
import { ReactNode, useCallback, useState } from "react";
import { getMenu } from "utils/menu.server";
import {
  deleteReview,
  getReviewsWithUsernames,
  getUserReviewForMenu,
  hasReviewedMenu,
  saveReview,
} from "utils/reviews.server";
import RemixButton from "~/components/Elements/RemixButton";
import { RemixNavbarMenu } from "~/components/Fragments/RemixNavbar";
import AddReviewForm from "~/components/Fragments/form/AddReview";
import CardReview from "~/components/Fragments/Card/CardReview";

// ================== BACKEND LOGIC ==========================

export const loader: LoaderFunction = async ({ params, request }) => {
  const { menu } = params;
  if (!menu) {
    throw new Response("Menu ID is required", { status: 400 });
  }
  const menuData = await getMenu(menu);
  if (!menuData) {
    throw new Response("Menu not found", { status: 404 });
  }
  const currentUser = await getCurrentUser(request);
  const reviews = await getReviewsWithUsernames(menu);
  // Ambil review spesifik user untuk menu
  let userReview = null;
  let alreadyReview = false;
  if (currentUser) {
    userReview = await getUserReviewForMenu(currentUser.id, menu);
  }
  if (currentUser) {
    alreadyReview = await hasReviewedMenu(currentUser.id, menu);
  }
  return json({ menuData, currentUser, reviews, alreadyReview, userReview });
};

export const action: ActionFunction = async ({ request, params }) => {
  const formData = new URLSearchParams(await request.text());
  const actionType = formData.get("_action");
  const reviewId = formData.get("reviewId") || undefined;
  const rating = parseInt(formData.get("rating") || "");
  const comment = formData.get("comment");

  const menuId = params.menu;
  const userId = await getCurrentUser(request);

  // Validate required parameters
  if (!menuId || !userId) {
    return json({ error: "User and Menu ID are required." }, { status: 400 });
  }

  try {
    switch (actionType) {
      case "add":
        if (!rating || !comment) {
          return json(
            { error: "Rating and comment are required." },
            { status: 400 },
          );
        }
        await saveReview(menuId, userId.id, rating, comment);
        break;

      case "edit":
        if (!reviewId || !rating || !comment) {
          return json(
            { error: "Review ID, rating, and comment are required." },
            { status: 400 },
          );
        }
        await saveReview(menuId, userId.id, rating, comment, reviewId);
        break;

      case "delete":
        if (!reviewId) {
          return json({ error: "Review ID is required." }, { status: 400 });
        }
        await deleteReview(reviewId);
        break;

      default:
        return json({ error: "Invalid action." }, { status: 400 });
    }

    return redirect(`/menu/${menuId}`);
  } catch (error) {
    return json(
      {
        error: error instanceof Error ? error.message : "Something went wrong.",
      },
      { status: 500 },
    );
  }
};
// typescript
type MenuType = {
  averageRating: ReactNode;
  id: string;
  title: string;
  thumb: string;
  description: string;
  gallery: string[];
  kategori: string;
  price: number;
};
type LoaderData = {
  menuData: MenuType;
  currentUser: { username: string; id: string } | null;
  alreadyReview: boolean;
  userReview: {
    rating: number;
    comment: string;
    id: string;
    menuId: string;
    createdAt: any;
    updatedAt: any;
  } | null;
  reviews: {
    username: ReactNode;
    id: string;
    rating: number;
    review: string;
    user: {
      id: string | undefined;
      username: string;
    };
    menuId: string;
    createdAt: Date;
    updatedAt: Date;
    comment: string;
  }[];
};

// META FUCNTION
export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const title =
    `${data?.menuData?.kategori.toUpperCase()} | ${data?.menuData?.title}` ||
    "Menu";
  return [{ title }, { name: "description", content: title }];
};
// END META FUNCTION
// ================== END BACKEND LOGIC ===============================

// ================== FRONTEND LOGIC ================
export default function MenuDetail() {
  const { menuData, currentUser, reviews, alreadyReview, userReview } =
    useLoaderData<LoaderData>();
  const [activeImage, setActiveImage] = useState(0);
  // end state and hooks

  // Fungsi untuk mengubah gambar aktif
  const handleImageClick = useCallback((index: number) => {
    setActiveImage(index);
  }, []);
  // handle button prev | next
  const handlePrev = () => {
    setActiveImage((prev) =>
      prev > 0 ? prev - 1 : menuData.gallery.length - 1,
    );
  };
  const handleNext = () => {
    setActiveImage((prev) => (prev + 1) % menuData.gallery.length);
  };
  const [isEditing, setIsEditing] = useState(false); // Tambahkan state untuk toggle form edit

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  return (
    <main className="flex flex-col">
      <main className="px-4 md:px-8">
        {/* navbar */}
        <RemixNavbarMenu NavbarTitle={menuData.title} />

        {/* end navbar */}

        {/* main content */}
        <main className="mt-4 flex flex-col gap-4 md:mt-8 md:grid md:grid-cols-3 md:gap-8">
          <section className="col-span-2">
            <figure className="flex flex-col justify-center gap-4">
              <div className="relative flex w-full overflow-hidden rounded-2xl">
                <AnimatePresence mode="wait">
                  <motion.img
                    variants={ANIMA_TAB_IMG}
                    initial="hidden"
                    animate="visible"
                    key={menuData.gallery[activeImage]}
                    exit="exit"
                    src={menuData.gallery[activeImage]}
                    alt=""
                    className="menu-show h-[300px] w-full rounded-xl bg-zinc-200 object-contain md:h-[550px] md:rounded-2xl"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 my-auto flex w-full items-center justify-between">
                  <button
                    onClick={handlePrev}
                    className="h-full bg-gradient-to-r from-transparent to-transparent pl-4 pr-8 text-light-100 transition-all duration-500 active:from-primary-100/30 md:px-12"
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
                    className="h-full bg-gradient-to-l from-transparent to-transparent pl-8 pr-4 text-light-100 transition-all duration-500 active:from-primary-100/30 md:px-12"
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
              </div>
              <figure className="scrollbar-hide flex w-full items-center gap-2 overflow-x-scroll p-1">
                {menuData.gallery.map((image, index) => (
                  <div key={index}>
                    <button
                      onClick={() => handleImageClick(index)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ")
                          handleImageClick(index);
                      }}
                      className={`aspect-video h-14 overflow-hidden rounded-md transition-all md:h-24 md:rounded-xl ${
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
          <section className="flex flex-col gap-6 rounded-2xl">
            <article className="flex w-full flex-col gap-0 rounded-2xl border-2 border-zinc-300 p-4 text-primary-100 md:p-6">
              <header className="flex items-start justify-between">
                <h1 className="text-base font-bold uppercase md:text-2xl">
                  {menuData.title}
                </h1>
                <h1 className="flex items-center gap-2 rounded-full bg-zinc-200 py-1 pl-2 pr-3 text-sm font-semibold lowercase text-zinc-800 md:text-base">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-4 text-amber-500 md:h-5"
                  >
                    <path
                      fill="currentColor"
                      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2L9.19 8.62L2 9.24l5.45 4.73L5.82 21z"
                    />
                  </svg>
                  <p className="max-md:text-xs">{menuData.averageRating}</p>
                </h1>
              </header>

              <div className="w-fit rounded-full bg-primary-100/15 px-2 py-0.5 text-xs lowercase text-primary-100 md:px-3 md:py-1 md:text-sm">
                {transformHyphenToSpace(menuData.kategori)}
              </div>
              <p className="mt-2 line-clamp-1 text-zinc-600 max-md:text-sm">
                {menuData.description}
              </p>
              <article className="mt-2 grid w-full grid-cols-2 gap-1 border-t-2 border-zinc-300 pt-4">
                <h2 className="mb-auto text-lg font-bold text-primary-100 md:text-2xl">
                  {priceFormat(menuData.price)}
                </h2>
                <h2 className="trasition-all flex cursor-pointer items-center justify-end text-end text-sm text-zinc-500 hover:text-zinc-900 max-sm:text-xs">
                  ⓘ informasi pembelian
                </h2>
              </article>
              <RemixButton
                to="https://gofood.co.id/search?q=mako"
                title="Beli di GoFood"
                stylebtn="flex justify-center mt-4 font-medium uppercase w-full max-md:text-sm"
              />
            </article>
            <article className="flex flex-col">
              {/* cara menghitung data reviews gimana */}
              <h1 className="title-style flex items-center gap-2 text-dark-200 max-md:text-base">
                Ulasan{" "}
                <p className="aspect-square h-fit w-fit rounded-full bg-zinc-200 px-2 py-0.5 text-sm md:text-base">
                  {reviews.length}
                </p>{" "}
              </h1>
              <section>
                {alreadyReview ? (
                  <div className="mt-4 flex flex-col gap-1 rounded-2xl bg-zinc-200 pt-2">
                    <p className="ml-2 w-fit rounded-full bg-white px-2 text-xs font-semibold lowercase text-primary-100 md:text-sm">
                      Ulasan Anda
                    </p>
                    {/* your comment card */}
                    <CardReview
                      currentUser={currentUser}
                      userReview={userReview}
                      actionFetcher={`/menu/${menuData.id}`}
                      type="yourReview"
                    />
                    {/* end your comment card */}
                    {/* Form untuk Mengedit Review */}
                  </div>
                ) : currentUser && currentUser.id ? (
                  <main className="mt-4">
                    <AddReviewForm actionFetcher={`/menu/${menuData.id}`} />
                  </main>
                ) : (
                  <main className="mt-4 flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-zinc-200 px-4 py-6">
                    <figure>
                      <img
                        src="/images/toastknife.png"
                        alt=""
                        className="aspect-auto h-32 md:h-[160px]"
                      />
                    </figure>
                    <p className="text-center max-md:text-sm">
                      Anda harus{" "}
                      <Link to="/login" className="text-primary-100 underline">
                        login
                      </Link>{" "}
                      terlebih dahulu untuk memberikan ulasan!
                    </p>
                  </main>
                )}
              </section>
              <section className="__ulasan-semua-WRAPPER mt-6 flex flex-col gap-4">
                <h1 className="max-md:text-sm">
                  Semua Ulasan <span>({reviews.length})</span>
                </h1>
                {reviews.map((review) => (
                  // start card
                  <CardReview
                    type="generalReview"
                    key={review.id}
                    username={review.username}
                    displayReview={review.comment}
                    dateReview={review.createdAt}
                    rating={review.rating}
                    actionFetcher={""}
                  />

                  // end card
                ))}
              </section>
            </article>
          </section>
        </main>
        {/* end main content */}
      </main>
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
