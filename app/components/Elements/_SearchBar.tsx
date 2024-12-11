import { Link } from "@remix-run/react";
import { priceFormat } from "helper/priceFormat";
import { useDebounce } from "helper/useDebounce";
import { useState, useEffect, useRef, useCallback } from "react";

interface MenuItem {
  id: string;
  title: string;
  price: number;
  thumb: string;
}

export default function SearchBar({ dataSearch }: { dataSearch: MenuItem[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<MenuItem[]>([]);
  const [isLoad, setIsLoad] = useState(false);
  const [noResultsFound, setNoResultsFound] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Auto-update hasil pencarian setiap kali searchQuery berubah
  // Using debounced search query to reduce unnecessary searches
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const filterSearchResults = useCallback(() => {
    setIsLoad(true);
    setNoResultsFound(false);

    if (debouncedSearchQuery.trim() === "") {
      setSearchResults([]);
      setIsLoad(false);
      return;
    }
    const isNumericSearch = !isNaN(Number(debouncedSearchQuery));

    const filteredResults = dataSearch.filter((menu) => {
      if (isNumericSearch) {
        // If it's numeric, search by price
        return menu.price.toString().includes(debouncedSearchQuery);
      } else {
        // If it's text, search by title
        return menu.title
          .toLowerCase()
          .includes(debouncedSearchQuery.toLowerCase());
      }
    });

    setSearchResults(filteredResults);
    setIsLoad(false);
    setNoResultsFound(filteredResults.length === 0);
  }, [debouncedSearchQuery, dataSearch]);

  useEffect(() => {
    filterSearchResults();
  }, [debouncedSearchQuery, filterSearchResults]);
  const handleBlur = () => {
    if (searchQuery.trim() === "") {
      setNoResultsFound(false);
    }
    setSearchQuery("");
  };

  // handleclick to menu/id
  const handleMenuClick = (id: number, menu: any) => {
    window.location.href = `/menu/${menu.id}`;
  };

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex h-max w-full items-center rounded-full border-gray-300 px-4 py-2 ring-2 ring-zinc-200 focus-within:ring-primary-100">
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Cari roti..."
          className="w-full bg-white text-sm outline-none md:text-base"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onBlur={handleBlur}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="m18.031 16.617l4.283 4.282l-1.415 1.415l-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9s9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617m-2.006-.742A6.98 6.98 0 0 0 18 11c0-3.867-3.133-7-7-7s-7 3.133-7 7s3.133 7 7 7a6.98 6.98 0 0 0 4.875-1.975z"
          />
        </svg>
      </div>

      <div className="result relative flex h-full w-full bg-blue-600">
        {isLoad ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : noResultsFound ? (
          <p className="absolute left-0 top-0 z-50 w-full rounded-lg bg-white p-4 text-center text-gray-500 max-md:text-sm">
            Roti tidak ditemukan.
          </p>
        ) : (
          <main
            className={`scrollbar-hide absolute left-0 top-6 z-50 flex max-h-96 w-full flex-col divide-y-2 overflow-y-auto rounded-lg bg-white p-2 md:gap-4 ${searchResults.length === 0 ? "hidden" : "block"} `}
          >
            {searchResults.map((menu: any) => (
              <Link to={`/menu/${menu.id}`}>
                <article
                  key={menu.id}
                  className="flex items-start gap-4 rounded-xl bg-white px-2 py-2 hover:bg-gray-200"
                >
                  <img
                    src={menu.thumb}
                    alt={menu.title}
                    className="aspect-square h-16 rounded-lg object-cover md:h-20"
                  />
                  <div className="flex flex-col justify-between gap-2">
                    <h1 className="text-base font-semibold md:text-lg">
                      {menu.title}
                    </h1>
                    <p className="font-semibold text-primary-100 max-md:text-sm">
                      {priceFormat(menu.price)}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </main>
        )}
      </div>
    </div>
  );
}
