import { IconAssets } from "@/assets/icons";
import { Navbar } from "./Navbar";
import { ImageAssets } from "@/assets/images";
import Image from "next/image";

export const Hero = () => {
  return (
    <section className=" overflow-clip"
    style={{ 
      backgroundImage: `url(${ImageAssets.landingBGHero.src})`, 
      backgroundSize: 'cover',  
      backgroundPosition: 'center'  
    }}
    >
      <Navbar />
      <div className=" container pt-12 pb-20 flex-col-center flex-col justify-center text-center">
        <a href="" className="tag inline-flex text-white/50 ">
        Version 2.0 is here 
        <span className="text-white inline-flex pl-2 gap-2 flex-center">Read more 
           <img src={IconAssets.arrowWhite.src} alt="mobile menu" width={10}/> 
        </span> 
           </a>
           <div className="relative overflow-clip">

     <h1 className=" my-8 ">One Task <br /> at a Time</h1>
     <div className=" flex justify-center">
     <p className="text-body-lg max-w-[450px] font-inter text-center  ">Celebrate the joy of accomplishment with an app designed to track your progress, motivate your efforts, and celebrate your successes.</p>
     <Image src={ImageAssets.cursor.src} alt="cursor image" aria-hidden className="absolute top-10 -left-12 lg:left-40 lg:top-30 hidden md:block"  width={150} height={150} />
     <Image src={ImageAssets.message.src} alt="message image" aria-hidden className="absolute top-20 -right-15 lg:right-36 hidden md:block"  width={150} height={150} />
     
     </div>
    <button className="btn mt-8">Get Free</button>
           </div>
      </div>
    </section>
  );
};
