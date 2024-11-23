import RemixButton from "../Elements/RemixButton";

export default function HeaderAuthNav() {
  return (
    <header className="m-4 self-start">
      <RemixButton
        to="/"
        title="Homepage"
        stylebtn="w-fit bg-white border-2 border-zinc-500 text-zinc-600 hover:bg-zinc-800 hover:text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z" />
        </svg>
      </RemixButton>
    </header>
  );
}
