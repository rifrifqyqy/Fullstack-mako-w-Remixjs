import { redirect } from "@remix-run/react";

export function useDashboardRedirect(request: Request) {
  const url = new URL(request.url);
  if (url.pathname === "/dashboard") {
    return redirect("/dashboard/beranda");
  }
  return null;
}
