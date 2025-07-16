"use client";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import FormContainer from "./_components/FormContainer";
import QuestionList from "./_components/QuestionList";
import { toast } from "sonner";
import InterviewLink from "./_components/InterviewLink";

const CreateInterview = () => {
 const router = useRouter();
 const [step, setStep] = useState(1);
 const [interviewId, setInterviewId] = useState("");
 const [formData, setFormData] = useState({
  job_position: "",
  job_description: "",
  interview_duration: "",
  interview_type: "",
 });

 console.log(formData, "FORM DATA");
 const onHandleInputChange = (field: string, value: string) => {
  setFormData((prev) => ({
   ...prev,
   [field]: value,
  }));
 };

 const onGoToNext = () => {
  if (
   formData.interview_duration == "" ||
   formData.job_position == "" ||
   formData.interview_type == "" ||
   formData.job_description == ""
  ) {
   toast.error("Please enter all details!");
   return;
  }
  setStep(step + 1);
 };

 const onCreateLinkHandler = (interview_id: string) => {
  setInterviewId(interview_id);
  setStep(step + 1);
 };

 return (
  <div className="mt-10 px-10 md:px-24 lg:px-44 xl:px-56">
   <div className="flex gap-5 items-center">
    <ArrowLeft
     onClick={() => router.back()}
     className="cursor-pointer scale-100 transition-transform duration-500 hover:scale-105"
    />
    <h2 className="font-bold text-2xl">Create New Interview</h2>
   </div>
   <Progress value={step * 33.33} className="my-5" />
   {step == 1 ? (
    <FormContainer
     onHandleInputChange={onHandleInputChange}
     GoToNext={onGoToNext}
    />
   ) : step == 2 ? (
    <QuestionList formData={formData} onCreateInterview={onCreateLinkHandler} />
   ) : step == 3 ? (
    <InterviewLink formData={formData} interview_id={interviewId} />
   ) : null}
  </div>
 );
};

export default CreateInterview;
