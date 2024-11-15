// app/routes/dashboard/menu.tsx
import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getAllMenu, getLatestMenu } from "utils/menu.server";

type Menu = {
  id: number;
  title: string;
  description: string;
  thumb: string;
  gallery: string[];
};
// Loader function untuk mengambil data menu
export const loader: LoaderFunction = async () => {
  const menu = await getAllMenu();
  return json(menu);
};
export default function Menu() {
  const menus = useLoaderData<Menu[]>();
  console.log(menus);

  return (
    <div className="space-y-6">
      {menus.length === 0 ? (
        <p className="text-center">Tidak ada menu tersedia.</p>
      ) : (
        menus.map((menu) => (
          <div key={menu.id} className="rounded-lg border p-4">
            <h3 className="text-lg font-bold">{menu.title}</h3>
            <p>{menu.description}</p>

            {/* Menampilkan thumbnail */}
            {menu.thumb && (
              <img
                src={menu.thumb}
                alt={menu.title}
                className="mt-2 h-auto w-full rounded-lg"
              />
            )}

            {/* Menampilkan gallery jika ada */}
            <div className="mt-4 grid grid-cols-3 gap-2">
              {menu.gallery.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="h-auto w-full rounded-lg"
                />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
