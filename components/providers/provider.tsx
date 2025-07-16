"use client";

import React, { useEffect, useState, ReactNode, useContext } from "react";
import { supabase } from "@/services/supabasaeClient";
import { User, UserDetailContext } from "@/context/useDetailsContext";

interface Props {
 children: ReactNode;
}

const Provider = ({ children }: Props) => {
 const [user, setUser] = useState<User | undefined>();

 useEffect(() => {
  createNewUser();
 }, []);

 const createNewUser = async () => {
  const {
   data: { user: authUser },
   error: authError,
  } = await supabase.auth.getUser();

  if (authError || !authUser) {
   console.log("No authenticated user found.");
   return;
  }

  const { data: existingUsers, error: fetchError } = await supabase
   .from("Users")
   .select("*")
   .eq("email", authUser.email);

  if (fetchError) {
   console.error(fetchError.message);
   return;
  }

  if (existingUsers && existingUsers.length > 0) {
   setUser(existingUsers[0]); // ✅ User exists
  } else {
   const { data: newUserData, error: insertError } = await supabase
    .from("Users")
    .insert([
     {
      name: authUser.user_metadata.name,
      email: authUser.email,
      picture: authUser.user_metadata.picture,
     },
    ])
    .select();

   if (insertError) {
    console.error(insertError.message);
    return;
   }

   setUser(newUserData?.[0] || undefined);
  }
 };

 return (
  <UserDetailContext.Provider value={{ user, setUser }}>
   <div>{children}</div>
  </UserDetailContext.Provider>
 );
};

export default Provider;

// Custom hook with safety check
export const useUser = () => {
 const context = useContext(UserDetailContext);
 if (!context) {
  throw new Error("useUser must be used within a Provider");
 }
 return context;
};
