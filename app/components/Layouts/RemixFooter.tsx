import { Link } from "@remix-run/react";

export default function RemixFooter() {
  return (
    <footer className="mt-24 flex h-full w-full flex-col items-center justify-center gap-6 bg-primary-100 px-8 pb-4 pt-16">
      <h1 className="overflow-hidden rounded-lg bg-white px-4 py-2 text-3xl font-semibold text-white">
        <img src="images/mako.svg" alt="" className="h-12" />
      </h1>
      <article className="flex flex-col items-center">
        <ul className="flex gap-16 text-lg text-zinc-200">
          <Link to="">Home</Link>
          <Link to="">Menu</Link>
          <Link to="">Outlet</Link>
          <Link to="">About</Link>
          <Link to="">Contact</Link>
        </ul>
        <div className="mt-6 flex items-center gap-4">
          <img src="images/fb.svg" alt="" className="h-10" />
          <img src="images/insta.svg" alt="" className="h-10" />
          <p className="text-zinc-200">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum iusto
            quaerat aliquid!
          </p>
        </div>
      </article>
      <p className="mt-16 w-full border-t border-zinc-200 pt-4 text-center text-sm text-zinc-200">
        © 2024 MAKO BAKERY. All rights reserved | Designed by Luo Egamediev
      </p>
    </footer>
  );
}
