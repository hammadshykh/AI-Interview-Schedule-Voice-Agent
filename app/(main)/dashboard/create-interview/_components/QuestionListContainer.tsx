import { Question } from "@/types/interview";
import React from "react";

const QuestionListContainer = ({ questions }: { questions: Question[] }) => {
 return (
  <div>
   <h3 className="text-xl font-semibold">Generated Interview Questions:</h3>
   <ul className="space-y-4 list-decimal pl-5">
    {questions?.map((q, index) => (
     <li key={index} className="p-3 border rounded-lg bg-white ">
      <p className="text-gray-800 mb-2 font-medium">{q.question}</p>
      <span className="text-sm  font-bold capitalize text-primary">
       <span className="font-medium">Type: </span>({q.type})
      </span>
     </li>
    ))}
   </ul>
  </div>
 );
};

export default QuestionListContainer;
