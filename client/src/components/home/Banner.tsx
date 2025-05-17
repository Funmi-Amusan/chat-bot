import { IconAssets } from "@/assets/icons";


export const Banner = () => {
  return (
    <a href="" className=" py-3 w-full rainbow-gradient flex items-center justify-center gap-2">
      <p className=" text-body-tag hidden md:block"> The copy is just a fill in for now</p>
        <p className=" text-body-tag" >Thanks for helping me test</p>
        <img src={IconAssets.arrowBlack.src} alt="arrow right icon" width={16} height={16} />
    </a>
  )
  ;
};