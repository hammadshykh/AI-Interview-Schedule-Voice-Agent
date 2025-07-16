import React, { ReactNode } from "react";
import InterviewHeader from "./_components/InterviewHeader";
import InterviewContextProvider from "@/context/InterviewContext";

const InterviewLayout = ({ children }: { children: ReactNode }) => {
 return (
  <InterviewContextProvider>
   <div className="bg-secondary min-h-screen h-full">
    <InterviewHeader />

    {children}
   </div>
  </InterviewContextProvider>
 );
};

export default InterviewLayout;
