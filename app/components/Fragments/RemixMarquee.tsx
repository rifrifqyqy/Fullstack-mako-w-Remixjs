import React, { useEffect, useState } from "react";

const BreadMarquee = React.lazy(() => import("react-fast-marquee"));

const BreadVector = [
  "images/toast.png",
  "images/danish.png",
  "images/slice-cake.png",
  "images/dry-cake.png",
  "images/coffee-bun.png",
  "images/cookie.png",
  "images/buns.png",
  "images/hampers.png",
  "images/maryam.png",
];

export default function BreadMarqueeWrapper() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <section className="flex items-center rounded-full overflow-hidden bg-zinc-200">
        <BreadMarquee autoFill={true} gradientWidth={50}>
          {BreadVector.map((image, index) => (
            <img
              key={index}
              src={image}
              alt=""
              className="h-8 object-cover px-4"
            />
          ))}
        </BreadMarquee>
      </section>
    </React.Suspense>
  );
}
