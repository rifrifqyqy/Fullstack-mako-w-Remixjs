import { Form, useFetcher } from "@remix-run/react";

export default function DeleteReview({
  reviewId,
  actionFetcher,
}: {
  reviewId: any;
  actionFetcher: string;
}) {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  return (
    <fetcher.Form method="post" action={actionFetcher}>
      <input type="hidden" name="_action" value="delete" />
      <input type="hidden" name="reviewId" value={reviewId} />
      <button
        type="submit"
        className="text-xs text-red-800 hover:text-red-600 md:text-sm"
      >
        {isSubmitting ? "Menghapus..." : "Hapus"}
      </button>
    </fetcher.Form>
  );
}
