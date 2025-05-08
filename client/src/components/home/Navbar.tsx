import { IconAssets } from "@/assets/icons";
import { ImageAssets } from "@/assets/images";

export const Navbar = () => {
  return (
    <nav className="p-6 flex-between ">
      <img src={ImageAssets.Logo.src} alt="logo" width={40}/>
      <img src={IconAssets.menuWhite.src} alt="mobile menu" width={20}/>
    </nav>
  );
};
