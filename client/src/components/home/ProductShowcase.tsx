import Image from "next/image";
import { ImageAssets } from "@/assets/images";

export const ProductShowcase = () => {
  return (
    <section className="bg-gradient-to-b from-black from-20%  to-[#5D2CA8] to-90%  px-4 py-18 gap-6 flex-center-col">
      <h2>Intuitive Interface</h2>
      <p className="text-body-lg max-w-[450px] font-inter text-center">Celebrate the joy of accomplishment with an app designed to track your progress, motivate your efforts, and celebrate your successes, one task at a time.</p>
      <Image src={ImageAssets.appScreen} alt="Logo" className='w-11/12 h-full object-cover ' width={500} height={500}/>
    </section>
  );
};
