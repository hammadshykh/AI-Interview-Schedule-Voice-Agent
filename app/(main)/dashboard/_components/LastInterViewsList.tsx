import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";
import React, { useState } from "react";

const LastInterViewsList = () => {
 const [interviewsList, setInterviewsList] = useState([]);
 console.log(setInterviewsList);
 return (
  <div className="my-5">
   <h2 className="font-bold text-2xl">Previousely Created Interviews</h2>

   {interviewsList.length == 0 && (
    <div className="p-5 flex flex-col gap-3 items-center bg-white mt-5">
     <Video className="h-10 w-10 text-primary" />
     <h2>You dont have any interview created</h2>
     <Button>+ Create New Interview </Button>
    </div>
   )}
  </div>
 );
};

export default LastInterViewsList;
