import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuestionListContainer from "./QuestionListContainer";
import { supabase } from "@/services/supabasaeClient";
import { useUser } from "@/components/providers/provider";
import { InterviewFormData, Question, ApiResponse } from "@/types/interview";

const QuestionList = ({
 formData,
 onCreateInterview,
}: {
 formData: InterviewFormData;
 onCreateInterview: (interview_id: string) => void;
}) => {
 const [loading, setLoading] = useState<boolean>(false);
 const [error, setError] = useState<string | null>(null);
 const [questions, setQuestions] = useState<Question[]>([]);
 const [saveLoading, setSaveLoading] = useState<boolean>(false);
 const { user } = useUser();

 useEffect(() => {
  if (formData.job_position && formData.job_description) {
   generateQuestionList();
  }
 }, [formData]);

 const generateQuestionList = async () => {
  try {
   setLoading(true);
   setError(null);

   const { data } = await axios.post<ApiResponse>("/api/ai-model", formData);

   if (!data.interviewQuestions?.length) {
    throw new Error("No questions were generated");
   }

   setQuestions(data.interviewQuestions);
  } catch (err: unknown) {
   console.error("Failed to generate questions:", err);
   if (err instanceof Error) {
    setError(err.message);
   } else if (axios.isAxiosError(err)) {
    setError(err.response?.data?.error || err.message);
   } else {
    setError("An unknown error occurred");
   }
  } finally {
   setLoading(false);
  }
 };

 const onFinish = async () => {
  const interviewId = uuidv4();
  setSaveLoading(true);

  try {
   const newInterview = {
    jobPosition: formData.job_position,
    jobDescription: formData.job_description,
    duration: formData.interview_duration,
    type: formData.interview_type,
    questionList: questions,
    userEmail: user?.email || null,
    interview_id: interviewId,
   };

   const { data: Interviews, error } = await supabase
    .from("Interviews")
    .insert([newInterview])
    .select();

   setSaveLoading(false);

   onCreateInterview(interviewId);

   if (error) {
    throw new Error("Failed to save interview");
   }

   console.log("Interview saved:", Interviews);
  } catch (err: unknown) {
   if (err instanceof Error) {
    alert(err.message);
   } else {
    alert("Please check your internet connection");
   }
  } finally {
   setSaveLoading(false);
  }
 };

 if (error) {
  return (
   <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
    {error}
    <Button onClick={generateQuestionList} className="ml-4" variant="default">
     Retry
    </Button>
   </div>
  );
 }

 return (
  <div className="space-y-4 border p-5 rounded-xl bg-white">
   {loading && (
    <div className="p-5 bg-blue-50 rounded-xl border border-gray-100 flex gap-5">
     <Loader2Icon className="animate-spin" />
     <div>
      <h3 className="text-xl font-bold">Generating Interview Questions:</h3>
      <p className="text-primary">
       Our AI is crafting personalized questions based on your job
      </p>
     </div>
    </div>
   )}

   {questions?.length > 0 ? (
    <div className="space-y-4">
     <QuestionListContainer questions={questions} />
    </div>
   ) : (
    !loading && <p className="text-gray-500">No questions generated yet.</p>
   )}

   {questions.length > 0 && (
    <div className="flex justify-end mt-10">
     <Button onClick={onFinish} disabled={saveLoading || loading}>
      {saveLoading && <Loader2Icon className="animate-spin mr-2" />}
      Create Interview & Finish
     </Button>
    </div>
   )}
  </div>
 );
};

export default QuestionList;
