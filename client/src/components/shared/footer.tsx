import { Code2Icon } from "lucide-react";
import { useMemo } from "react";
import { Link } from "react-router";

const links: { label: string; path: string }[] = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "About Us",
    path: "/about",
  },
  {
    label: "Posts",
    path: "/posts",
  },
  {
    label: "Contact",
    path: "/contact",
  },
];

const Footer = () => {
  const linkItems = useMemo(() => links, []);

  return (
    <footer className="w-full pt-16 pb-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Link to={{ pathname: "/" }} className="flex justify-center ">
            <div className="flex items-center gap-2">
              <Code2Icon size={60} className="stroke-sky-500" />
              <p className="font-bold text-3xl">
                Code<span className="text-sky-500">.</span>
              </p>
            </div>
          </Link>
          <ul className="text-lg flex items-center justify-center flex-col gap-7 md:flex-row md:gap-12 transition-all duration-500 py-16 mb-10 border-b border-gray-200">
            {linkItems.map(({ label, path }) => (
              <li
                key={path}
                className="hover:text-sky-500 font-semibold transition-colors"
              >
                <Link to={{ pathname: path }}>{label}</Link>
              </li>
            ))}
          </ul>

          <span className="text-lg text-gray-500 text-center block">
            <Link to={{ pathname: "/" }}>Code.</Link>©{new Date().getFullYear()}{" "}
            All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
