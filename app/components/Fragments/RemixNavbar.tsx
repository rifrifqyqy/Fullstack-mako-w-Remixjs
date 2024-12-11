import { Link, NavLink, useLocation } from "@remix-run/react";
import RemixButton from "../Elements/RemixButton";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useScrollDirection } from "helper/scrollDirection";

// interface types navbar
type RemixNavbarProps = {
  to: string;
  title?: string;
  btn_to?: string;
  btn_title?: string;
  btn_title_mobile?: string;
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

const navbarMobileMenu = [
  {
    title: "Home",
    to: "/",
  },
  {
    title: "Menu",
    to: "/menu",
  },
  {
    title: "Outlet",
    to: "/outlet",
  },
  {
    title: "About",
    to: "/about",
  },
];

export function RemixNavbarMenu({ NavbarTitle }: { NavbarTitle: string }) {
  const goBack = () => {
    if (
      !document.referrer ||
      document.referrer.includes(window.location.href)
    ) {
      window.location.href = "/";
    } else {
      window.history.back();
    }
  };
  const scrollDirection = useScrollDirection();
  const showNavbar = scrollDirection !== "down";
  return (
    <motion.section
      variants={NAV_ANIMATION_SCROLL}
      initial="begin"
      animate={showNavbar ? "begin" : "end"}
      className="sticky top-4 z-50 mt-4 w-full"
    >
      <motion.nav
        variants={NAV_ANIMATION}
        initial="hidden"
        animate="visible"
        className=""
      >
        <nav className="flex items-center justify-between rounded-2xl border-2 border-zinc-300 bg-white/80 px-3 py-3 backdrop-blur-md md:px-8 md:py-3">
          <NavLink
            to=""
            role="button"
            className={
              "flex items-center justify-center gap-2 rounded-full py-1 pr-3 font-semibold uppercase text-primary-100 transition-all hover:bg-zinc-200 active:scale-95 max-md:text-sm"
            }
            onClick={goBack}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 md:h-8"
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
          <h1 className="text-base font-semibold uppercase md:text-xl">
            {NavbarTitle}
          </h1>
        </nav>
      </motion.nav>
    </motion.section>
  );
}
export function RemixNavbarHome({
  title,
  btn_to = "",
  btn_title = "Button",
  btn_title_mobile = "Button",
  color,
  userIcon = false,
}: RemixNavbarProps) {
  const [showModal, setShowModal] = useState(false);
  const [isNavToggled, setIsNavToggled] = useState(false);
  const scrollDirection = useScrollDirection();
  const showNavbar = scrollDirection !== "down";
  const location = useLocation();

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

  // logic toggle nav menu
  const handleToggle = () => {
    setIsNavToggled(!isNavToggled);
    if (isNavToggled) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
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
      className="sticky top-0 z-[999] flex w-full md:px-4"
    >
      <motion.nav
        variants={NAV_ANIMATION_SCROLL}
        initial="begin"
        animate={showNavbar ? "begin" : "end"}
        className={`${isNavToggled ? "border-b-[1px] border-zinc-200" : ""} relative z-[999] flex w-full items-center justify-between bg-white p-4 py-4 md:rounded-2xl`}
      >
        <h1 className="flex">
          {title}
          <svg
            className="h-6 md:h-8"
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
          <ul className="hidden items-center md:flex">
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
            stylebtn="hidden md:flex"
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
          <div
            className={`hamburger flex text-primary-100 transition-all hover:text-light-600 md:hidden`}
            role="button"
            onClick={handleToggle}
          >
            {isNavToggled ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2.3em"
                height="2.3em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2.3em"
                height="2.3em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M21 15.61L19.59 17l-5.01-5l5.01-5L21 8.39L17.44 12zM3 6h13v2H3zm0 7v-2h10v2zm0 5v-2h13v2z"
                />
              </svg>
            )}
          </div>
        </div>
        <div className="absolute hidden h-[70px] w-full items-center md:flex">
          <Link to="/" className="mx-auto w-fit">
            <img
              src="images/mako.svg"
              className="mx-auto my-auto h-12"
              alt=""
            />
          </Link>
        </div>
      </motion.nav>
      {/* Hamburger Menu */}
      <main
        className={`hamburger-menu absolute left-0 top-0 h-dvh w-full bg-white px-4 pt-4 text-white transition-transform duration-300 md:hidden ${
          isNavToggled ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <header className="flex w-full items-center justify-between border-b border-zinc-200 pb-3">
          <img src="images/mako.svg" className="h-10" alt="" />
          <div
            className={`hamburger flex text-primary-100 transition-all hover:text-light-600 md:hidden`}
            role="button"
            onClick={handleToggle}
          >
            {isNavToggled ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2.3em"
                height="2.3em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2.3em"
                height="2.3em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M21 15.61L19.59 17l-5.01-5l5.01-5L21 8.39L17.44 12zM3 6h13v2H3zm0 7v-2h10v2zm0 5v-2h13v2z"
                />
              </svg>
            )}
          </div>
        </header>
        <ul className="-pr-2 mt-8 space-y-4">
          {navbarMobileMenu.map((menu, index) => {
            const isCurrent = location.pathname === menu.to;

            return (
              <Link
                to={isCurrent ? "#" : menu.to}
                onClick={(e) => {
                  if (isCurrent) e.preventDefault();
                }}
                key={index}
                className={`${isCurrent ? "cursor-default text-primary-100" : "text-light-500"} flex items-center justify-between hover:text-primary-100`}
              >
                <NavLink
                  to={menu.to}
                  onClick={(e) => {
                    if (isCurrent) e.preventDefault();
                  }}
                  className={`${isCurrent ? "text-primary-100" : ""}`}
                >
                  {menu.title}
                </NavLink>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke={`${isCurrent ? "#8e1538" : "currentColor"} `}
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="m10 17l5-5l-5-5"
                  />
                </svg>
              </Link>
            );
          })}
        </ul>
        <RemixButton
          to={btn_to}
          title={btn_title}
          color={color}
          onClick={handleClick}
          stylebtn="flex mt-8 w-full text-center justify-center max-md:font-medium "
        >
          {userIcon && (
            <div className="mx-auto flex items-center gap-4 font-medium">
              <h1>{btn_title_mobile}</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.3em"
                height="1.3em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5M4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4z"
                />
              </svg>
            </div>
          )}
        </RemixButton>
      </main>
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

// nav scroll
const NAV_ANIMATION_SCROLL = {
  begin: {
    y: 0,
  },
  end: {
    y: -100,
    transition: {
      duration: 0.3,
      type: "spring",
      bounce: 0,
      ease: ["easeIn", "easeOut"],
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
