import { Ionicons } from "@expo/vector-icons";
import React from "react";

import { DARK } from "./colors";

interface IconProps {
  size?: number;
  color?: string;
}
export const ICONS = {
  LOGOUT: ({ color = DARK, size = 24 }: IconProps) => <Ionicons name="md-log-out" size={size} color={color} />,
};

export type ICON = (typeof ICONS)[keyof typeof ICONS];
