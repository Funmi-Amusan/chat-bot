
import { ImageAssets } from "@/assets/images";
import Link from "next/link";
import ThemeSwitch from "../ui/ThemeSwitch";

export const Navbar = () => {
  return (
    <nav className="p-6 flex-between ">
      <img src={ImageAssets.Logo.src} alt="logo" width={40}/>
      <div className="flex gap-4 items-center">
        <ThemeSwitch />
        <Link href={'/signup'} className="btn !py-2 ">Sign In</Link>
      </div>
    </nav>
  );
};
