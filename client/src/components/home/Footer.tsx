
import { FaLinkedin, FaPinterest, FaTiktok, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";

export const Footer = () => {
  return (
    <footer className="bg-black flex flex-col justify-center md:flex-row md:!justify-between py-10 px-8">
        <p className="text-white/50 text-body-gray text-sm font-inter text-center">
        @ 2024 Your Company, Inc. All rights reserved
        </p>
      <div className=" flex flex-row items-center mx-auto md:m-0 gap-4 ">
     <FaXTwitter color="gray" size={24} />
      <RiInstagramFill color="gray" size={24} />
      <FaPinterest color="gray" size={24} />
      <FaLinkedin color="gray" size={24}  />
      <FaTiktok color="gray" size={24}  />
      <FaYoutube color="gray" size={24}  />
      </div>
    </footer>
  );
};
