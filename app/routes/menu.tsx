import { requireAdmin } from "utils/session.server";

export const loader = async ({ request }) => {
  await requireAdmin(request);
  return null;
};

export default function Menus() {
  return (
    <>
      <main>Menus</main>
    </>
  );
}
