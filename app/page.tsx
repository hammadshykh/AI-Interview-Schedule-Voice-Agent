"use client";

import { useUser } from "@/components/providers/provider";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
 const { user } = useUser();

 const isLoggedIn = !!user?.email;

 return (
  <div className="min-h-screen grid grid-rows-[auto_1fr_auto] gap-16 p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
   {/* Header */}
   <header className="w-full flex items-center justify-between max-w-5xl mx-auto">
    <h1 className="text-xl font-bold">AI Interview Platform</h1>

    {isLoggedIn ? (
     <div className="flex items-center gap-4">
      <div className="text-right">
       <h2 className="font-semibold text-sm">{user.name}</h2>
       <p className="text-xs text-muted-foreground">{user.email}</p>
      </div>
      {user.picture && (
       <Image
        src={user.picture}
        alt="User"
        width={40}
        height={40}
        className="rounded-full border"
       />
      )}
     </div>
    ) : (
     <Link href="/auth">
      <Button variant="outline">Login</Button>
     </Link>
    )}
   </header>

   {/* Main Section */}
   <main className="flex justify-center items-center">
    {isLoggedIn ? (
     <Link href="/dashboard">
      <Button>Go to Dashboard</Button>
     </Link>
    ) : (
     <Link href="/auth">
      <Button>Login to Continue</Button>
     </Link>
    )}
   </main>

   {/* Footer */}
   <footer className="text-center text-sm text-muted-foreground">
    &copy; {new Date().getFullYear()} AI Interview Platform. All rights
    reserved.
   </footer>
  </div>
 );
}
