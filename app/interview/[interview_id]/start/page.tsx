"use client";
import { useInterview } from "@/context/InterviewContext";
import { Mic, Phone, Timer } from "lucide-react";
import Image from "next/image";
import React from "react";

const StartInterview = () => {
 const { interviewInfo } = useInterview();
 console.log(interviewInfo, "START INTERVIEW DATA");
 return (
  <div className="p-20 lg:px-48 xl:px-56 ">
   <div className="flex items-center justify-between w-full my-7">
    <h2 className="font-bold text-xl ">Ai Interview Session</h2>
    <span className="flex gap-2 items-center">
     <Timer />
     00:00:00
    </span>
   </div>

   <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
    <div className="bg-white p-40 h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center">
     <Image
      src={"/images/interview.webp"}
      className="w-[60px] h-[60px] rounded-full object-cover"
      alt="ai"
      width={100}
      height={100}
     />
     <h2>AI Recruiter</h2>
    </div>
    <div className="bg-white p-40 h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center">
     <h2 className="text-2xl bg-primary text-white p-3 rounded-full px-5">
      {interviewInfo?.userName[0]}
     </h2>
     <h2>{interviewInfo?.userName}</h2>
    </div>
   </div>
   <div className="flex items-center justify-center gap-5 mt-7">
    <Mic className="h-12 w-12 p-3 bg-gray-300 rounded-full cursor-pointer" />
    <Phone className="h-12 w-12 p-3 bg-red-500 text-white rounded-full cursor-pointer" />
   </div>
   <h2 className="text-center text-sm text-gray-400 mt-4">
    Interview in Progress...
   </h2>
  </div>
 );
};

export default StartInterview;
