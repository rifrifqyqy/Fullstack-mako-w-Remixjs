import { ActionFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { json, Link, redirect, useLoaderData } from "@remix-run/react";
import { AnimatePresence, motion } from "framer-motion";
import { getCurrentUser } from "helper/currentUser";
import { priceFormat } from "helper/priceFormat";
import { transformHyphenToSpace } from "helper/transformText";
import { ReactNode, useState } from "react";
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
import EditReviewForm from "~/components/Fragments/form/UpdateReview";
import DeleteReview from "~/components/Fragments/form/DeleteReview";
import AddReviewForm from "~/components/Fragments/form/AddReview";
import formatDate from "helper/formatDate";

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
  console.log(menuData);
  console.log(alreadyReview);
  const [activeImage, setActiveImage] = useState(0);
  // end state and hooks

  // Fungsi untuk mengubah gambar aktif
  const handleImageClick = (index: number) => {
    setActiveImage(index);
  };

  // handle button prev | next
  const handlePrev = () => {
    setActiveImage((prevIndex) =>
      prevIndex === 0 ? menuData.gallery.length - 1 : prevIndex - 1,
    );
  };
  const handleNext = () => {
    setActiveImage((prevIndex) => (prevIndex + 1) % menuData.gallery.length);
  };
  const [isEditing, setIsEditing] = useState(false); // Tambahkan state untuk toggle form edit

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  return (
    <main className="px-8">
      {/* navbar */}
      <RemixNavbarMenu NavbarTitle={menuData.title} />
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
                key={menuData.gallery[activeImage]}
                exit="exit"
                src={menuData.gallery[activeImage]}
                alt=""
                className="menu-show h-[550px] rounded-2xl bg-zinc-200 object-contain"
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
              {menuData.gallery.map((image, index) => (
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
        <section className="flex flex-col gap-6 rounded-2xl">
          <article className="flex w-full flex-col gap-1 rounded-2xl border-2 border-zinc-300 p-6 text-primary-100">
            <header className="flex items-start justify-between">
              <h1 className="text-2xl font-bold uppercase">{menuData.title}</h1>
              <h1 className="flex items-center gap-2 rounded-full bg-zinc-200 py-1 pl-2 pr-3 text-base font-semibold uppercase text-zinc-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  className="text-amber-500"
                >
                  <path
                    fill="currentColor"
                    d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2L9.19 8.62L2 9.24l5.45 4.73L5.82 21z"
                  />
                </svg>
                <p>{menuData.averageRating}</p>
              </h1>
            </header>

            <div className="w-fit rounded-full bg-primary-100/15 px-3 py-1 text-sm capitalize text-primary-100">
              {transformHyphenToSpace(menuData.kategori)}
            </div>
            <p className="mt-2 text-zinc-600">{menuData.description}</p>
            <article className="mt-2 grid w-full grid-cols-2 gap-1 border-t-2 border-zinc-300 pt-4">
              <h2 className="mb-auto text-2xl font-bold text-primary-100">
                {priceFormat(menuData.price)}
              </h2>
              <h2 className="trasition-all flex cursor-pointer items-center justify-end text-sm text-zinc-500 hover:text-zinc-900">
                ⓘ informasi pembelian
              </h2>
            </article>
            <RemixButton
              title="Beli di GoFood"
              to=""
              stylebtn="flex justify-center mt-4 font-medium uppercase"
            />
          </article>
          <article className="flex flex-col">
            {/* cara menghitung data reviews gimana */}
            <h1 className="title-style flex items-center gap-2">
              Ulasan{" "}
              <p className="aspect-square h-fit w-fit rounded-full bg-zinc-200 px-2 py-0.5 text-base">
                {reviews.length}
              </p>{" "}
            </h1>
            <section>
              {alreadyReview ? (
                <div className="mt-4 flex flex-col gap-1 rounded-2xl bg-zinc-200 pt-2">
                  <p className="ml-2 w-fit rounded-full bg-white px-2 text-sm font-semibold lowercase text-primary-100">
                    Ulasan Anda
                  </p>
                  {/* your comment card */}
                  <figure className="flex w-full flex-col rounded-2xl border-2 border-zinc-300 bg-white p-4">
                    <section className="header-comment flex items-start gap-4">
                      <div className="rounded-full bg-gray-200 p-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"
                          />
                        </svg>
                      </div>
                      <article className="flex w-full flex-col gap-2">
                        <header className="flex w-full justify-between">
                          <p className="text-lg font-semibold capitalize">
                            {currentUser?.username}
                            <p className="text-sm font-normal text-zinc-500">
                              {formatDate(userReview?.updatedAt, "date")}
                            </p>
                          </p>
                          <div className="star flex h-fit items-center gap-2 rounded-full bg-zinc-200 py-1 pl-2 pr-3 font-semibold">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              className="text-amber-500"
                            >
                              <path
                                fill="currentColor"
                                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2L9.19 8.62L2 9.24l5.45 4.73L5.82 21z"
                              />
                            </svg>
                            <p>{userReview?.rating}</p>
                          </div>
                        </header>
                        {isEditing ? (
                          <EditReviewForm
                            userReview={userReview}
                            onSubmit={() => setIsEditing(!isEditing)}
                          />
                        ) : (
                          <p>{userReview?.comment}</p>
                        )}

                        {/* Tombol Edit */}
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setIsEditing(!isEditing)}
                            className="text-sm text-zinc-600 hover:text-zinc-900"
                          >
                            {isEditing ? "Batal Edit" : "Edit"}
                          </button>
                          <span className="text-zinc-500">|</span>
                          {/* Form untuk Menghapus Review */}
                          <DeleteReview reviewId={userReview?.id} />
                        </div>
                      </article>
                    </section>
                    <section className="body-comment"></section>
                  </figure>
                  {/* end your comment card */}
                  {/* Form untuk Mengedit Review */}
                </div>
              ) : currentUser && currentUser.id ? (
                <main className="mt-4">
                  <AddReviewForm />
                </main>
              ) : (
                <main className="mt-4 flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-zinc-200 px-4 py-6">
                  <figure>
                    <img
                      src="/images/toastknife.png"
                      alt=""
                      className="aspect-auto h-[160px]"
                    />
                  </figure>
                  <p className="text-center">
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
              <h1>
                Semua Ulasan <span>({reviews.length})</span>
              </h1>
              {reviews.map((review) => (
                // start card
                <figure
                  className="flex w-full flex-col rounded-2xl border-2 border-zinc-300 bg-white p-4"
                  key={review.id}
                >
                  <section className="header-comment flex items-start gap-4">
                    <div className="rounded-full bg-gray-200 p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"
                        />
                      </svg>
                    </div>
                    <article className="flex w-full flex-col gap-2">
                      <header className="flex w-full justify-between">
                        <p className="text-lg font-semibold capitalize">
                          {review.username}
                          <p className="text-sm font-normal text-zinc-500">
                            {formatDate(review?.updatedAt, "date")}
                          </p>
                        </p>
                        <div className="star flex h-fit items-center gap-2 rounded-full bg-zinc-200 py-1 pl-2 pr-3 font-semibold">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            className="text-amber-500"
                          >
                            <path
                              fill="currentColor"
                              d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2L9.19 8.62L2 9.24l5.45 4.73L5.82 21z"
                            />
                          </svg>
                          <p>{review?.rating}</p>
                        </div>
                      </header>
                      <p>{review.comment}</p>
                    </article>
                  </section>
                </figure>

                // end card
              ))}
            </section>
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
