import RemixButton from "../Elements/RemixButton";

export default function AdminNavbar() {
  return (
    <nav className="flex items-center justify-between rounded-xl py-2">
      <header className="flex items-center text-2xl font-semibold">
        Mako Kitchen
      </header>
      <ul>
        <RemixButton to="/" title="User Page"></RemixButton>
          
      </ul>
    </nav>
  );
}
