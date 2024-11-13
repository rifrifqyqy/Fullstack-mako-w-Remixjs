import { NavLink } from "@remix-run/react";
import { twMerge } from "tailwind-merge";

// RemixButton Props Type
type RemixButtonProps = {
  to: string;
  title?: string;
  color?: string;
  stylebtn?: string;
  target?: string;
  rel?: string;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
};

export default function RemixButton({
  to,
  title = "Button",
  color = "bg-primary-100",
  target = "",
  rel = target === "_blank" ? "noreferrer noopener" : "", // secara otomatis menambah rel jika target adalah _blank
  children = null,
  stylebtn = "",
  onClick = () => {},
}: RemixButtonProps) {
  const buttonClass = twMerge(
    `py-2 px-4 font-bold rounded-full text-white transition-all hover:opacity-90 flex gap-4 items-center`,
    color,
    stylebtn,
  );

  return (
    <NavLink
      onClick={onClick}
      className={buttonClass}
      to={to}
      target={target}
      rel={rel}
    >
      {children}
      {title}
    </NavLink>
  );
}
