// app/interview/[interview_id]/page.tsx

import { supabase } from "@/services/supabasaeClient";
import InterviewClient from "../_components/InterviewClient";

const InterviewPage = async ({
 params,
}: {
 params: Promise<{ interview_id: string }>;
}) => {
 const PARAMS = await params;
 const { data: interview } = await supabase
  .from("Interviews")
  .select("*")
  .eq("interview_id", PARAMS.interview_id);

 const interviewData = interview?.[0];

 return (
  <InterviewClient
   interview_id={PARAMS.interview_id}
   interviewData={interviewData}
  />
 );
};

export default InterviewPage;
