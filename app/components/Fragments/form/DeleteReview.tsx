import { Form } from "@remix-run/react";

export default function DeleteReview({ reviewId }: { reviewId: any }) {
  return (
    <Form method="post">
      <input type="hidden" name="_action" value="delete" />
      <input type="hidden" name="reviewId" value={reviewId} />
      <button type="submit" className="text-sm text-red-800 hover:text-red-600">
        Hapus
      </button>
    </Form>
  );
}
