import { useContext } from "react";
import { LocationContext } from "../context/locationContext";

export const useLocation = () => useContext(LocationContext)