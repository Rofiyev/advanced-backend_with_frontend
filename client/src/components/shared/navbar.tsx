import { ArrowRight, Code2Icon } from "lucide-react";
import { Link, useLocation } from "react-router";
import { Button } from "../ui/button";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { useCurrentUser } from "@/context/app-context";
import UserButton from "./user-button";

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

const Navbar = () => {
  const { user } = useCurrentUser();
  const { pathname } = useLocation();
  const linkItems = useMemo(() => links, []);

  return (
    <div className="h-14 dark:bg-secondary/20 bg-secondary border-b border-separate">
      <div className="max-w-7xl h-full mx-auto flex items-center justify-between px-4 shadow-sm">
        <Link to={{ pathname: "/" }} className="flex items-center gap-2">
          <Code2Icon size={30} className="stroke-sky-500" />
          <p className="font-bold">
            Code<span className="text-sky-500">.</span>
          </p>
        </Link>

        <ul className="hidden sm:flex gap-4">
          {linkItems.map(({ label, path }) => (
            <li
              key={path}
              className={cn(
                "hover:text-sky-500 font-semibold transition-colors",
                path === pathname && "text-sky-500"
              )}
            >
              <Link to={{ pathname: path }}>{label}</Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-10">
          <div className="flex gap-1 items-center">
            {user ? (
              <UserButton />
            ) : (
              <Link to={{ pathname: "/auth" }}>
                <Button className="bg-sky-500 hover:bg-sky-600 transition-colors font-medium text-white">
                  Sign In <ArrowRight size={20} className="text-white" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
