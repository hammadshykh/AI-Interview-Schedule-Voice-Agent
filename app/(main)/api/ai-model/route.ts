import { QUESTION_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

interface RequestBody {
 job_position: string;
 job_description: string;
 interview_duration: string;
 interview_type: string;
}

interface GeminiError extends Error {
 response?: {
  status?: number;
 };
}

export async function POST(req: Request) {
 let body: RequestBody;

 try {
  body = await req.json();
 } catch (e) {
  console.log(e);
  return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
 }

 const {
  job_position: jobPosition,
  job_description: jobDescription,
  interview_duration: duration,
  interview_type: type,
 } = body;

 if (!jobPosition || !jobDescription) {
  return NextResponse.json(
   { error: "Job position and description are required" },
   { status: 400 }
  );
 }

 const FINAL_PROMPT = QUESTION_PROMPT.replace("{{jobTitle}}", jobPosition)
  .replace("{{jobDescription}}", jobDescription)
  .replace("{{duration}}", duration)
  .replace("{{type}}", type);

 try {
  // Get the Gemini model
  const model = genAI.getGenerativeModel({
   model: "gemini-1.5-flash",
   generationConfig: {
    responseMimeType: "application/json",
   },
  });

  // Generate content
  const result = await model.generateContent({
   contents: [
    {
     role: "user",
     parts: [{ text: FINAL_PROMPT }],
    },
   ],
  });

  // Get the response text
  const response = await result.response;
  const text = response.text();

  // Parse the JSON response
  let parsedResponse: {
   interviewQuestions?: Array<{ question: string; type: string }>;
  };
  try {
   parsedResponse = JSON.parse(text);
  } catch (e) {
   console.log(e);
   console.error("Failed to parse response:", text);
   throw new Error("AI response was not valid JSON");
  }

  return NextResponse.json({
   interviewQuestions: parsedResponse.interviewQuestions || [],
  });
 } catch (error: unknown) {
  console.error("AI generation error:", error);

  let errorMessage = "Failed to generate questions";
  let statusCode = 500;
  let details: string | undefined;

  if (error instanceof Error) {
   errorMessage = error.message;

   const geminiError = error as GeminiError;
   if (geminiError.response?.status === 429) {
    statusCode = 429;
    details = "API rate limit exceeded. Please try again later.";
   }
  }

  return NextResponse.json(
   {
    error: errorMessage,
    details,
   },
   { status: statusCode }
  );
 }
}
