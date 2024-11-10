import { LoaderFunction } from "@remix-run/node";
import { logout } from "utils/session.server";

export const loader: LoaderFunction = async ({
  request,
}: {
  request: Request;
}) => {
  return logout(request);
};
