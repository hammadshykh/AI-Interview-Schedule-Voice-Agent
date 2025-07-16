"use client";
import React from "react";
import CreateOptions from "./_components/CreateOptions";
import LastInterViewsList from "./_components/LastInterViewsList";

const Dashboard = () => {
 return (
  <div>
   <h2 className="font-bold text-2xl my-3">Dashboard</h2>
   <CreateOptions />
   <LastInterViewsList />
  </div>
 );
};

export default Dashboard;
