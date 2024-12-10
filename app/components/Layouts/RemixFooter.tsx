import { Link } from "@remix-run/react";

export default function RemixFooter() {
  return (
    <footer className="mt-24 flex h-full w-full flex-col items-center justify-start gap-6 bg-primary-100 px-8 pb-4 pt-8 sm:justify-center sm:pt-16">
      <h1 className="overflow-hidden rounded-lg bg-white px-4 py-2 text-3xl font-semibold text-white max-sm:self-start">
        <img src="/images/mako.svg" alt="" className="h-10 sm:h-12" />
      </h1>
      <article className="max-sm:grid max-sm:grid-cols-2 sm:flex sm:flex-col sm:items-center">
        <ul className="flex gap-4 text-lg text-zinc-200 max-sm:flex-col max-sm:text-sm sm:gap-16">
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/outlet">Outlet</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </ul>
        <div className="flex items-start gap-4 max-sm:flex-col max-sm:text-sm sm:mt-6 sm:items-center">
          <figure className="flex gap-4">
            <img src="/images/fb.svg" alt="" className="h-10" />
            <img src="/images/insta.svg" alt="" className="h-10" />
          </figure>

          <p className="text-zinc-200">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum iusto
            quaerat aliquid!
          </p>
        </div>
      </article>
      <p className="mt-16 w-full border-t border-zinc-200 pt-4 text-center text-sm text-zinc-200 max-sm:text-xs">
        © 2024 MAKO BAKERY. All rights reserved | Designed by Luo Egamediev
      </p>
    </footer>
  );
}
