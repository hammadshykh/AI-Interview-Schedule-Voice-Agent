"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { supabase } from "@/services/supabasaeClient"; // adjust path to your Supabase client

const Login = () => {
 const handleSigninWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
   provider: "google",
  });

  console.log(data, "USER");

  if (error) {
   console.error("Google sign-in error:", error.message);
   return;
  }

  console.log("Redirecting to Google OAuth...");
 };

 return (
  <div className="h-screen flex items-center justify-center">
   <div className="flex flex-col items-center border rounded-xl p-8">
    <Image
     src={"/images/logo.webp"}
     width={400}
     height={100}
     className="w-[180px]"
     alt="LOGO"
    />
    <div className="flex flex-col text-center gap-4 ">
     <Image
      src={"/images/login.webp"}
      width={400}
      height={100}
      className="w-[400px] h-[250px] rounded-2xl"
      alt="Login"
     />
     <h2 className="text-2xl font-bold text-center mt-5">
      Welcome to AiCruiter
     </h2>
     <h2 className="text-gray-500 text-center">
      Sign In With Google Authentication
     </h2>
     <Button onClick={handleSigninWithGoogle} className="mt-7">
      Login with Google
     </Button>
    </div>
   </div>
  </div>
 );
};

export default Login;
