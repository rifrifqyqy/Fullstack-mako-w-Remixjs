import { useState } from "react";
import { Form, useFetcher } from "@remix-run/react";

export default function AddReviewForm({
  actionFetcher,
}: {
  actionFetcher: string;
}) {
  const [rating, setRating] = useState(0);
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  const isLoading = fetcher.state === "loading";
  const handleStarClick = (starRating: number) => {
    setRating(starRating);
  };
  const renderButtonText = () => {
    switch (fetcher.state) {
      case "submitting":
        return "Menyimpan Ulasan...";
      case "loading":
        return "Berhasil Menyimpan...";
      default:
        return "Simpan Ulasan";
    }
  };

  return (
    <fetcher.Form
      method="post"
      className="flex flex-col gap-4"
      action={actionFetcher}
    >
      <input type="hidden" name="_action" value="add" />
      <input type="hidden" name="rating" value={rating} />{" "}
      <div>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              onClick={() => handleStarClick(star)}
              className={`cursor-pointer ${star <= rating ? "fill-amber-500" : "fill-zinc-400"}`}
            >
              <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-6.91-.58L12 2 9.91 8.66 3 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ))}
        </div>
      </div>
      <div>
        <textarea
          name="comment"
          id="comment"
          required
          className="min-h-32 w-full resize-none appearance-none rounded-lg border-2 border-zinc-200 bg-zinc-200 p-3 outline-none focus-within:border-primary-100 focus-within:bg-white"
        ></textarea>
      </div>
      <button
        type="submit"
        className="rounded-full bg-primary-100 px-4 py-2 text-white hover:opacity-85"
      >
        {renderButtonText()}
      </button>
    </fetcher.Form>
  );
}
