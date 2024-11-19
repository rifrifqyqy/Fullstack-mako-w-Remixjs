import { json } from "@remix-run/node";
import { deleteMenu } from "utils/menu.server";

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const id = formData.get("id");

  if (typeof id !== "string") {
    return json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    await deleteMenu(id);
    return json({ success: true });
  } catch (error) {
    console.error("Error deleting menu:", error);
    return json({ error: "Failed to delete menu" }, { status: 500 });
  }
};
