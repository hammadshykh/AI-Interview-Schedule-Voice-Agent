"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Clock, Info, Video } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useInterview } from "@/context/InterviewContext";
import { useRouter } from "next/navigation";

type Props = {
 interviewData: {
  jobPosition?: string;
  jobDescription?: string;
  duration?: string;
  type?: string;
  interview_id?: string;
 };
 interview_id: string;
};

const InterviewClient = ({ interviewData, interview_id }: Props) => {
 const [name, setName] = useState("");
 const [loading, setLoading] = useState(false);
 const router = useRouter();
 const { setInterviewInfo } = useInterview();

 const handleJoin = async () => {
  if (!name) return;
  setLoading(true);

  setInterviewInfo({
   userName: name,
   jobPosition: interviewData.jobPosition,
   jobDescription: interviewData.jobDescription || "",
   duration: interviewData.duration,
   type: interviewData.type,
   questionList: [], // initial empty array
  });

  router.push(`/interview/${interview_id}/start`);
  // No need to setLoading(false) after redirect
 };

 return (
  <div className="px-10 md:px-28 lg:px-48 xl:px-64 mt-16 pb-10 max-w-7xl mx-auto">
   <div className="flex justify-center items-center p-7 xl:px-44 lg:px-32 border rounded-lg bg-white flex-col">
    <Image
     src={"/images/logo.webp"}
     alt="logo"
     width={100}
     height={100}
     className="w-[140px]"
    />
    <h2>AI Powered Interview Platform</h2>

    <Image
     width={500}
     height={500}
     className="w-[280px] my-6"
     src={"/images/interview.webp"}
     alt="Interview"
    />

    <h2 className="font-bold text-xl">
     {interviewData?.jobPosition} Interview
    </h2>
    <h2 className="flex gap-2 items-center text-gray-500 mt-3">
     <Clock className="h-4 w-4" />
     {interviewData?.duration}
    </h2>

    <div className="w-full mt-4">
     <h2>Enter your full name</h2>
     <Input
      placeholder="e.g. John Smith"
      value={name}
      onChange={(e) => setName(e.target.value)}
     />
    </div>

    <div className="bg-blue-200 p-3 gap-4 rounded-xl mt-7 w-full">
     <div className="flex gap-2 items-start">
      <Info className="text-primary mt-1" />
      <div>
       <h2 className="font-bold">Before you begin</h2>
       <ul>
        <li className="text-sm text-primary font-semibold">
         - Ensure you have a stable internet connection
        </li>
        <li className="text-sm text-primary font-semibold">
         - Test your camera and microphone
        </li>
        <li className="text-sm text-primary font-semibold">
         - Find a quiet place for the interview
        </li>
       </ul>
      </div>
     </div>
    </div>

    <Button
     onClick={handleJoin}
     disabled={!name || loading}
     className="w-full mt-5 font-bold"
    >
     {loading ? (
      "Joining..."
     ) : (
      <>
       <Video className="mr-2 h-4 w-4" /> Join Interview
      </>
     )}
    </Button>
   </div>
  </div>
 );
};

export default InterviewClient;
