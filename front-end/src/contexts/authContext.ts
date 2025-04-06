import { createContext } from "react";
import User from "../utils/userInterface";

export interface AuthContextType {
	user: User;
}

export const AuthContext = createContext<User | null>(null);
