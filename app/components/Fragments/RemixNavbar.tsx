import { Link, NavLink } from "@remix-run/react";
import RemixButton from "../Elements/RemixButton";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// interface types navbar
type RemixNavbarProps = {
  to: string;
  title?: string;
  btn_to?: string;
  btn_title?: string;
  color?: string;
  userIcon?: boolean;
  goBack?: () => void;
};

// list menu navbar
const navbarMenu: RemixNavbarProps[] = [
  {
    title: "About",
    to: "/about",
  },
  {
    title: "Contact",
    to: "/contact",
  },
];

export function RemixNavbarMenu({ NavbarTitle }: { NavbarTitle: string }) {
  const goBack = () => {
    setTimeout(() => {
      window.history.back();
    }, 500);
  };
  return (
    <motion.nav
      variants={NAV_ANIMATION}
      initial="hidden"
      animate="visible"
      className="sticky top-0 z-50 mt-4 w-full"
    >
      <nav className="flex items-center justify-between rounded-2xl border border-zinc-300 bg-white/80 px-8 py-4 backdrop-blur-md">
        <NavLink
          to=""
          role="button"
          className={
            "flex items-center justify-center gap-2 rounded-full py-1 pr-3 font-semibold uppercase text-primary-100 transition-all hover:bg-zinc-200 active:scale-95"
          }
          onClick={goBack}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m14 7l-5 5l5 5"
            />
          </svg>
          Kembali
        </NavLink>
        <h1 className="text-xl font-semibold uppercase">{NavbarTitle}</h1>
      </nav>
    </motion.nav>
  );
}
export function RemixNavbarHome({
  title,
  btn_to = "",
  btn_title = "Button",
  color,
  userIcon = false,
}: RemixNavbarProps) {
  const [showModal, setShowModal] = useState(false);

  // logout modal logic
  const handleLogout = async () => {
    window.location.href = "/logout";
    localStorage.removeItem("toastShown");
  };
  const handleClick = (e: React.MouseEvent) => {
    if (btn_to === "/logout") {
      e.preventDefault();
      setShowModal(true);
    }
  };

  // overflow hidden when modal show
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);
  return (
    <motion.section
      variants={NAV_ANIMATION}
      initial="hidden"
      animate="visible"
      className="sticky top-0 z-[999] flex w-full bg-white px-4"
    >
      <nav className="relative flex w-full items-center justify-between rounded-xl p-4">
        <h1 className="flex">
          {title}
          <svg
            className="h-8"
            viewBox="0 0 344 254"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M17.5 243.167L1 137.667C42 220.667 61.5 214.667 76.5 207.167C116.1 176.767 122 133.834 120 116.167C122.4 58.567 97 36.8337 84 33.167C77.2 29.967 65.5 35.5003 60.5 38.667C60.1667 26.8337 65.7 2.86699 90.5 1.66699C115.3 0.466992 127.833 16.8337 131 25.167L174 142.667C181.833 117.334 199.3 61.667 206.5 41.667C213.7 21.667 225.167 10.3335 230 7.16676C268.5 -12.3332 282.5 19.6668 284 30.6668C285.2 39.4668 282.167 39.6668 280.5 38.6668C259 26.6669 250 36.1668 239 51.6668C229.4 63.6668 225.333 90.0002 224.5 101.667C215.3 144.867 245.333 186.667 261.5 202.167C296.3 233.367 329.5 170.167 342.5 135.667L326.5 243.167C243.7 280.767 206 201.5 197.5 157.167C190.833 178.667 177.1 222.167 175.5 224.167C173.9 226.167 170.833 225 169.5 224.167L147 160.167C123 266.967 50.6667 260 17.5 243.167Z"
              fill="#8D1535"
              stroke="#8D1535"
              strokeWidth="2"
              initial={{
                pathLength: 0,
                fill: "rgba(255, 255, 255)",
              }}
              animate={{
                pathLength: 1,
                fill: "#8D1535",
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
              }}
            />
          </svg>
        </h1>

        <div className="z-20 flex items-center gap-4">
          <ul className="flex items-center">
            {navbarMenu.map((menu, index) => (
              <NavLink
                key={index}
                to={menu.to}
                className={({ isActive }) => getMenuActive({ isActive })}
              >
                {menu.title}
              </NavLink>
            ))}
          </ul>
          {/* ======== modal logout ======= */}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-xl font-semibold">
                  Apakah Anda yakin ingin logout?
                </h2>
                <div className="flex justify-between">
                  <button
                    onClick={handleLogout}
                    className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                  >
                    Sure
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="rounded bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
                  >
                    Batal
                  </button>
                </div>
              </div>
            </div>
          )}
          <RemixButton
            to={btn_to}
            title={btn_title}
            color={color}
            onClick={handleClick}
          >
            {userIcon && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"
                />
              </svg>
            )}
          </RemixButton>
        </div>
        <div className="absolute flex h-[70px] w-full items-center">
          <Link to="/" className="mx-auto w-fit">
            <img
              src="images/mako.svg"
              className="mx-auto my-auto h-12"
              alt=""
            />
          </Link>
        </div>
      </nav>
    </motion.section>
  );
}

// animation
const NAV_ANIMATION = {
  hidden: {
    y: "-150%",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      when: "beforeChildren",
      duration: 0.5,
      ease: [0.83, 0, 0.17, 1],
      staggerChildren: 0.2,
    },
  },
};

// style and conditional
function getMenuActive({ isActive }: { isActive: boolean }) {
  const defaultStyle =
    "py-2 px-4 font-medium rounded-full hover:bg-zinc-200 active:scale-95 transition-all";

  return isActive
    ? `${defaultStyle} bg-primary-100 text-white hover:bg-primary-100/80`
    : defaultStyle;
}
