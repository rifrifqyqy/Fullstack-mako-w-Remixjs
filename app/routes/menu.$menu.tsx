import { useParams } from "@remix-run/react";

export default function MenuDetail() {
  const { menu } = useParams(); // `menu` adalah nama parameter dinamis di URL

  return (
    <div>
      <h1>Menu Detail for {menu}</h1>
      {/* Fetch data berdasarkan `menu` dan tampilkan informasi menu */}
    </div>
  );
}
