import formatDate from "helper/formatDate";
import DeleteReview from "../form/DeleteReview";
import EditReviewForm from "../form/UpdateReview";
import { ReactNode, useState } from "react";

// typescript
interface ReviewTraits {
  currentUser?: any;
  userReview?: any;
  username?: ReactNode;
  dateReview?: any;
  rating?: number;
  key?: any;
  displayReview?: string;
  type: "yourReview" | "generalReview";
  actionFetcher: string;
}

export default function CardReview({
  currentUser,
  userReview,
  username,
  dateReview,
  rating,
  type,
  key,
  displayReview,
  actionFetcher,
}: ReviewTraits) {
  const [isEditing, setIsEditing] = useState(false);

  // conditional rendering
  const displayUsername =
    type === "yourReview" ? currentUser?.username : username;

  const displayDate =
    type === "yourReview"
      ? formatDate(userReview?.updatedAt, "date")
      : formatDate(dateReview, "date");
  const displayRating = type === "yourReview" ? userReview?.rating : rating;
  return (
    <>
      <figure
        className="flex w-full flex-col rounded-2xl border-2 border-zinc-200 bg-white px-3 py-4 md:px-4"
        key={key}
      >
        <section className="header-comment flex items-start gap-4">
          <div className="mt-2 rounded-full bg-gray-200 p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 md:h-8"
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
              <p className="text-base font-semibold capitalize md:text-lg">
                {displayUsername}
                <p className="text-xs font-normal text-zinc-500 md:text-sm">
                  {displayDate}
                </p>
              </p>
              {/* star rating */}
              <div className="star flex h-fit items-center gap-2 rounded-full bg-zinc-200 py-1 pl-2 pr-3 font-semibold max-md:text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-5 text-amber-500 md:h-6"
                >
                  <path
                    fill="currentColor"
                    d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2L9.19 8.62L2 9.24l5.45 4.73L5.82 21z"
                  />
                </svg>
                <p className="max-md:text-sm">{displayRating}</p>
              </div>
            </header>
            {type === "yourReview" && isEditing ? (
              <EditReviewForm
                actionFetcher={actionFetcher}
                userReview={userReview}
                onSubmit={() => setIsEditing(!isEditing)}
              />
            ) : (
              <p className="max-md:text-sm">{userReview?.comment}</p>
            )}
            {type === "generalReview" && (
              <p className="max-md:text-sm">{displayReview}</p>
            )}
            {/* Tombol Edit */}
            {type === "yourReview" && (
              <div className="_edit-layout flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-sm text-zinc-600 hover:text-zinc-900"
                >
                  {isEditing ? "Batal Edit" : "Edit"}
                </button>
                <span className="text-zinc-500">|</span>
                {/* Form untuk Menghapus Review */}
                <DeleteReview
                  reviewId={userReview?.id}
                  actionFetcher={actionFetcher}
                />
              </div>
            )}
          </article>
        </section>
        <section className="body-comment"></section>
      </figure>
    </>
  );
}
