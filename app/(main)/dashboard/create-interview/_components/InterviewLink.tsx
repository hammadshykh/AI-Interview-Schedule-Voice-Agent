"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { InterviewFormData, Question } from "@/types/interview";
import { ArrowLeft, Clock, List, Mail, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CopyButton } from "./CopyButton";
interface Props {
 formData: InterviewFormData;
 interview_id: string;
 questions?: Question[];
}
const InterviewLink = ({ formData, interview_id }: Props) => {
 const url = `${process.env.NEXT_PUBLIC_HOST_URL}/${interview_id}`;
 const GetInterviewURL = () => {
  const url = `${process.env.NEXT_PUBLIC_HOST_URL}/${interview_id}`;
  return url;
 };

 console.log(interview_id, "INTER VIEW ID");

 return (
  <div className="flex items-center justify-center mt-10 flex-col">
   <Image src={"/check-icon.png"} alt="check" width={100} height={100} />
   <h2 className="font-bold text-lg mt-4">Your AI Interview is Ready!</h2>
   <p className="mt-3">
    share this link with your candidates to start the interview process
   </p>
   <div className="w-full p-7 mt-6 rounded-lg bg-white">
    <div className="flex justify-between items-center">
     <h2 className="font-semibold">Interview Link</h2>
     <h2 className="text-primary bg-blue-50 rounded-full py-1 px-2">
      Valid for 30 days
     </h2>
    </div>

    <div className="flex mt-3 gap-3 items-center">
     <Input defaultValue={GetInterviewURL()} disabled={true} />
     <CopyButton text={url} />
    </div>
    <Separator className="my-7" />
    <div className="flex items-center gap-4">
     <h2 className="text-gray-500 text-xs flex gap-2 items-center ">
      <Clock className="h-4 w-4" />
      {formData.interview_duration}
     </h2>
     <h2 className="text-gray-500 text-xs flex gap-2 items-center ">
      <List className="h-4 w-4" />
      10 Questions
     </h2>
     {/* <h2 className="text-gray-500 text-xs flex gap-2 items-center ">
      <Calendar className="h-2 w-4" />
      30 Min {formData.}
     </h2> */}
    </div>
   </div>

   <div className="mt-7 bg-white p-5 rouned-lg w-full">
    <h2 className="font-semibold">share via </h2>
    <div className="flex mt-7 gap-5">
     <Button variant={"outline"}>
      <Mail /> Email
     </Button>
     <Button variant={"outline"}>
      <Mail /> Slack
     </Button>

     <Button variant={"outline"}>
      <Mail /> Whatsapp
     </Button>
    </div>
   </div>

   <div className="flex justify-between w-full items-center mt-6">
    <Link href={"/dashboard"}>
     <Button variant={"outline"}>
      <ArrowLeft />
      Back to Dashboard
     </Button>
    </Link>
    <Link href={"/create-interview"}>
     <Button>
      <Plus />
      Create New Interview
     </Button>
    </Link>
   </div>
  </div>
 );
};

export default InterviewLink;
