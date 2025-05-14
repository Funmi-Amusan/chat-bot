import BaseButton from "../ui/BaseButton";
import BaseInput from "../ui/BaseInput";
import { ImageAssets } from "@/assets/images";
import Image from "next/image";

export const CallToAction = () => {
  return (
    <section className="bg-white dark:bg-black flex-center-col py-20 px-8 relative">
      <div className=" max-w-[540px] flex-center-col ">

      <h2>Get instant access</h2>
      <p className="text-black/50 dark:text-white/50 text-body-gray font-inter text-center">
      Celebrate the joy of accomplishment with
 an app designed to track your progress
 and motivate your efforts.
      </p>
      <div className="flex flex-col items-center md:flex-row gap-4 mt-8">
      <BaseInput placeholder={"name@email.com"} id={"name"} name={"name"} className="!w-full"/>
      <BaseButton text={"Get access"} className=" !w-fit"/>
      </div>
         <Image src={ImageAssets.helix2.src} alt="cursor image" aria-hidden className="absolute top-10 -left-12 lg:left-40 lg:top-30 hidden md:block "  width={150} height={150} />
           <Image src={ImageAssets.emojiStar.src} alt="message image" aria-hidden className="absolute top-20 -right-15 lg:right-36 hidden md:block"  width={150} height={150} />
           
      </div>
    </section>
  );
};
