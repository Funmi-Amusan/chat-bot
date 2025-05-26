
import { ImageAssets } from "@/assets/images";
import Link from "next/link";
import ThemeSwitch from "../ui/ThemeSwitch";

export const Navbar = () => {
  return (
    <nav className="p-6 flex-between ">
      <img src={ImageAssets.Logo.src} alt="logo" width={40}/>
      <div className="flex gap-4 items-center">
        <ThemeSwitch />
        <Link prefetch href={'/login'} className="text-black/70 text-sm dark:text-white font-medium border border-black/70 dark:border-white/70 px-4 rounded-lg !py-2 ">Sign In</Link>
         <Link prefetch href={'/signup'} className="btn !py-2 ">Sign Up</Link>
      </div>
    </nav>
  );
};
