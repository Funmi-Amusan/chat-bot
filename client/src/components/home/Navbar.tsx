import { IoMdMenu } from "react-icons/io";
import { ImageAssets } from "@/assets/images";

export const Navbar = () => {
  return (
    <nav className="p-6 flex-between ">
      <img src={ImageAssets.Logo.src} alt="logo" width={40}/>
      <IoMdMenu color="white" size={30} />
    </nav>
  );
};
