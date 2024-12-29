import { menuType } from "types/bakeryTypes";
import BreadCard from "../Fragments/Card/CardProduct";

export default function RecomBread({ data }: { data: menuType[] }) {
  return (
    <section className="mt-8 grid grid-cols-2 gap-2 px-4 sm:grid-cols-3 md:mt-16 md:grid-cols-4 md:gap-8 md:px-8 xl:grid-cols-5 2xl:grid-cols-5">
      {data.slice(0, 5).map((menu, index) => (
        <BreadCard key={menu.id} index={index}>
          <BreadCard.Toppings
            DirecTo={`/menu/${menu.id}`}
            thumb={menu.thumb}
            title={menu.title}
            kategori={menu.kategori}
            rating={menu.averageRating.toFixed(1)}
          />
          <BreadCard.Layer
            kategori={menu.kategori}
            title={menu.title}
            description={menu.description}
            price={menu.price}
          />
        </BreadCard>
      ))}
    </section>
  );
}
