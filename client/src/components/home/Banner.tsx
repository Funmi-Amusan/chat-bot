import { IconAssets } from "@/assets/icons";


export const Banner = () => {
  return (
    <section className=" h-12 w-full rainbow-gradient flex items-center justify-center gap-4">
        <p className=" text-body-tag ">View the complete kit</p>
        <img src={IconAssets.arrowBlack.src} alt="arrow right icon" width={16} height={16} />
    </section>
  )
  ;
};