import { IconAssets } from "@/assets/icons";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="bg-black flex flex-col justify-center md:flex-row md:!justify-between py-10 px-8">
        <p className="text-white/50 text-body-gray font-inter text-center">
        @ 2024 Your Company, Inc. All rights reserved
        </p>
      <div className=" flex flex-row gap-4 bg-amber-300">
      
     <Image src={IconAssets.instagram.src} alt="logo" width={24} height={24} />
     <Image src={IconAssets.XSocial.src} alt="logo" width={24} height={24} />
     <Image src={IconAssets.linkedin.src} alt="logo" width={24} height={24} />
     <Image src={IconAssets.pinterest.src} alt="logo" width={24} height={24} />
     <Image src={IconAssets.tiktok.src} alt="logo" width={24} height={24} />
     <Image src={IconAssets.youtube.src} alt="logo" width={24} height={24} />
      </div>
    </footer>
  );
};
