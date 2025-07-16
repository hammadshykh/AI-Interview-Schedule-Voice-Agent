"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import { IntterviewType } from "@/services/Constants";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

type FormContainerProps = {
 GoToNext: () => void;
 onHandleInputChange: (field: string, value: string) => void;
};

const FormContainer = ({
 onHandleInputChange,
 GoToNext,
}: FormContainerProps) => {
 const [interviewType, setInterviewType] = useState<string[]>([]);

 useEffect(() => {
  if (interviewType) {
   onHandleInputChange("interview_type", interviewType.join(","));
  }
 }, [interviewType]);

 const addInterviewType = (type: string) => {
  setInterviewType((prev) => {
   if (prev.includes(type)) {
    return prev.filter((item) => item !== type);
   } else {
    return [...prev, type];
   }
  });
 };

 return (
  <div className="p-5 bg-white rounded-xl">
   <div>
    <h2 className="text-sm">Job Position</h2>
    <Input
     placeholder="e.g. Full Stack Developer"
     className="mt-2"
     onChange={(e) => onHandleInputChange("job_position", e.target.value)}
    />
   </div>
   <div className="mt-5">
    <h2 className="text-sm">Job Description</h2>
    <Textarea
     placeholder="Enter detailed job description"
     className="mt-2 h-[200px]"
     onChange={(e) => onHandleInputChange("job_description", e.target.value)}
    />
   </div>
   <div className="mt-5">
    <h2 className="text-sm">Interview Duration</h2>
    <Select
     onValueChange={(value) => onHandleInputChange("interview_duration", value)}
    >
     <SelectTrigger className="w-full mt-2">
      <SelectValue placeholder="Select Duration" />
     </SelectTrigger>
     <SelectContent>
      <SelectItem value="5 Min">5 Min</SelectItem>
      <SelectItem value="15 Min">15 Min</SelectItem>
      <SelectItem value="30 Min">30 Min</SelectItem>
      <SelectItem value="45 Min">45 Min</SelectItem>
      <SelectItem value="60 Min">60 Min</SelectItem>
     </SelectContent>
    </Select>
   </div>
   <div className="mt-5">
    <h2 className="text-sm">Interview Type</h2>
    <div className="flex flex-wrap gap-3 mt-2">
     {IntterviewType.map((type, index) => (
      <div
       key={index}
       className={`flex items-center gap-2 p-1 px-2 border border-gray-200 rounded-2xl bg-white cursor-pointer hover:bg-secondary ${
        interviewType.includes(type.title) ? "bg-blue-50 text-primary" : ""
       }`}
       onClick={() => addInterviewType(type.title)}
      >
       <type.icon className="h-4 w-4" />
       <span>{type.title}</span>
      </div>
     ))}
    </div>
   </div>
   <div className="mt-7 flex justify-end" onClick={() => GoToNext()}>
    <Button>
     Generate Question <ArrowRight />
    </Button>
   </div>
  </div>
 );
};

export default FormContainer;
