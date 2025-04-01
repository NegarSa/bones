import { createContext } from "react";
import User from "../utils/userInterface";

export interface AuthContextType {
	user: User | null;
	setTrig: (arg: boolean) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
