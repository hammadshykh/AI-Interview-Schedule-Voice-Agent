import Image from "next/image";
import React from "react";

const InterviewHeader = () => {
 return (
  <div className="p-4 shadow-sm bg-white">
   <Image
    src={"/images/logo.webp"}
    alt="logo"
    width={100}
    height={100}
    className="w-[140px]"
   />
  </div>
 );
};

export default InterviewHeader;
