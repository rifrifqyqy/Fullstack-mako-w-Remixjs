// card glassmorphism
export function CardSkeleton_1() {
  return (
    <div className="flex flex-col gap-2 rounded-2xl bg-zinc-200/20 p-2 backdrop-blur-md transition-shadow duration-300">
      <article className="flex items-center justify-between">
        <h1 className="h-6 w-2/3 rounded-lg bg-zinc-300 text-lg font-medium text-white">
          {" "}
        </h1>
      </article>

      <img
        alt=""
        src="/images/placeholder-img.jpg"
        className="aspect-square w-[240px] rounded-xl object-cover"
      />
    </div>
  );
}
