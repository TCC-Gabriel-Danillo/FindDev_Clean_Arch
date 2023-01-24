import { useContext } from "react";
import { UserContext } from "../context/userContext";

export const useUserService = () => useContext(UserContext);
