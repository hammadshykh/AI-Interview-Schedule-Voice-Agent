"use client";

import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";

// Define the user type
export type User = {
 name: string;
 email: string;
 picture: string;
};

// Define the context type
export type UserContextType = {
 user: User | undefined;
 setUser: Dispatch<SetStateAction<User | undefined>>;
};

// Set context with default undefined
export const UserDetailContext = createContext<UserContextType | undefined>(
 undefined
);
