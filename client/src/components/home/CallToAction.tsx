import BaseInput from "../ui/BaseInput";
import { ImageAssets } from "@/assets/images";
import Image from "next/image";
import Link from "next/link";

export const CallToAction = () => {
  return (
    <section className="bg-white dark:bg-black flex-center-col py-20 px-8 relative">
      <div className=" max-w-[540px] flex-center-col ">

      <h2>Get instant access</h2>
   <p className="text-black/50 dark:text-white/50 text-body-gray font-inter text-center">
      Embrace your achievements with an AI assistant that tracks your progress, keeps you motivated, and helps you reach new milestones effortlessly.
</p>

      <div className="flex w-full flex-col items-center justify-center md:flex-row gap-2 mt-8">
      {/* <BaseInput placeholder={"name@email.com"} id={"name"} name={"name"} className="!w-full"/> */}
      <Link href='/login' className="btn">Get Access</Link>
      </div>
         <Image src={ImageAssets.helix2.src} alt="cursor image" aria-hidden className="absolute top-10 -left-12 lg:left-40 lg:top-30 hidden md:block "  width={150} height={150} />
           <Image src={ImageAssets.emojiStar.src} alt="message image" aria-hidden className="absolute top-20 -right-15 lg:right-36 hidden md:block"  width={150} height={150} />
      </div>
    </section>
  );
};
