export default function LoginBanner() {
  return (
    <figure className="flex h-full w-full flex-col items-center justify-center gap-8 rounded-2xl bg-primary-100/10 p-12">
      <img
        src="images/login-banner.png"
        className="aspect-auto w-[500px]"
        alt=""
      />
      <h1 className="text-center text-4xl font-semibold text-zinc-800">
        High-quality, refined, and delicious bread and pastries
      </h1>
    </figure>
  );
}
