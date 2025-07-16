import React, { ReactNode } from "react";
import DashboardProvider from "./provider";
import WelcomeContainer from "./dashboard/_components/WelcomeContainer";

interface Props {
 children: ReactNode;
}

const Dashboardlayout = ({ children }: Props) => {
 return (
  <div className="bg-secondary w-full">
   <DashboardProvider>
    <div className="p-10 w-full">
     <WelcomeContainer />
     {children}
    </div>
   </DashboardProvider>
  </div>
 );
};

export default Dashboardlayout;
