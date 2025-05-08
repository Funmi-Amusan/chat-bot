import { IconAssets } from "@/assets/icons";


export const Banner = () => {
  return (
    <a href="" className=" py-3 w-full rainbow-gradient flex items-center justify-center gap-2">
      <p className=" text-body-tag hidden md:block">This page is included in a free SaaS Website Kit.</p>
        <p className=" text-body-tag" >View the complete kit</p>
        <img src={IconAssets.arrowBlack.src} alt="arrow right icon" width={16} height={16} />
    </a>
  )
  ;
};