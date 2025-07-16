// types/interview.ts
export interface InterviewFormData {
 job_position: string;
 job_description: string;
 interview_duration: string;
 interview_type: string;
}

export interface Question {
 question: string;
 type: string;
}

export interface Interview {
 id?: number;
 job_position: string;
 job_description: string;
 interview_duration: string;
 interview_type: string;
 questionList: Question[];
 userEmail?: string | null;
 interview_id: string;
 created_at?: string;
}

export interface ApiResponse {
 interviewQuestions?: Question[];
 error?: string;
 details?: string;
}
