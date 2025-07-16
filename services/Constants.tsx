import {
 BriefcaseBusinessIcon,
 Calendar,
 Code2Icon,
 LayoutDashboard,
 List,
 Puzzle,
 Settings,
 User2Icon,
 Users,
 WalletCards,
} from "lucide-react";

export const sidebarOptions = [
 {
  name: "Dashboard",
  Icon: LayoutDashboard,
  path: "/dashboard",
 },
 {
  name: "Schedule Interview",
  Icon: Calendar,
  path: "/schedule-interview",
 },
 {
  name: "All Interview",
  Icon: List,
  path: "/all-interview",
 },
 {
  name: "Billing",
  Icon: WalletCards,
  path: "/billing",
 },
 {
  name: "Settings",
  Icon: Settings,
  path: "/settings",
 },
];

type Interview = {
 title: string;
 icon: any;
};

export const IntterviewType: Interview[] = [
 {
  title: "Technical",
  icon: Code2Icon,
 },
 {
  title: "Behaviovral",
  icon: User2Icon,
 },
 {
  title: "Experience",
  icon: BriefcaseBusinessIcon,
 },
 {
  title: "Problem Solving",
  icon: Puzzle,
 },
 {
  title: "Leadership",
  icon: Users,
 },
];

export const QUESTION_PROMPT = `You are an expert technical interviewer.
Based on the following inputs, generate a well-structured list of high-quality interview questions:
Job Title: {{jobTitle}}
Job Description: {{jobDescription}}
Interview Duration: {{duration}}
Interview Type: {{type}}

- Your task:
  Analyze the job description to identify key responsibilities, required skills, and expected experience.
  Generate a list of interview questions depends on interview duration
  Adjust the number and depth of questions to match the interview duration.
  Ensure the questions match the tone and structure of a real-life {{type}} interview.

- Format your response in JSON format with array list of questions.
format: interviewQuestions=[
{
    question: "",
    type: "Technical/Behavioral/Experience/Problem Solving/Leadership"
},
...
]

- The goal is to create a structured, relevant, and time-optimized interview plan for a {{jobTitle}} role.`;
