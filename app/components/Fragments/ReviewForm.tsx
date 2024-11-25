import { Form } from "@remix-run/react";

export default function ReviewForm() {
  return (
    <Form method="post" className="review-form">
      <label>
        Rating:
        
        <input
          type="number"
          name="rating"
          min="1"
          max="5"
          required
          className="input"
        />
      </label>
      <label>
        Comment:
        <textarea name="comment" required className="textarea"></textarea>
      </label>
      <button type="submit" className="btn">
        Submit Review
      </button>
    </Form>
  );
}
