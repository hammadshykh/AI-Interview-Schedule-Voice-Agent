"use client";

import { Question } from "@/types/interview";
import {
 createContext,
 ReactNode,
 useContext,
 useState,
 Dispatch,
 SetStateAction,
} from "react";

export type InterviewInfoType = {
 jobPosition?: string;
 duration?: string;
 jobDescription?: string;
 type?: string;
 userName: string;
 questionList?: Question[]; // made optional if not yet loaded
};

type InterviewContextType = {
 interviewInfo: InterviewInfoType | undefined;
 setInterviewInfo: Dispatch<SetStateAction<InterviewInfoType | undefined>>;
};

const InterviewDataContext = createContext<InterviewContextType | undefined>(
 undefined
);

const InterviewContextProvider = ({ children }: { children: ReactNode }) => {
 const [interviewInfo, setInterviewInfo] = useState<
  InterviewInfoType | undefined
 >();

 return (
  <InterviewDataContext.Provider value={{ interviewInfo, setInterviewInfo }}>
   {children}
  </InterviewDataContext.Provider>
 );
};

export const useInterview = () => {
 const context = useContext(InterviewDataContext);
 if (!context) {
  throw new Error(
   "useInterview must be used within an InterviewContextProvider"
  );
 }
 return context;
};

export default InterviewContextProvider;
