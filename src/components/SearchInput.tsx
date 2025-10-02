import { Input } from "./ui/Input";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../hooks/useTheme";

export const SearchInput = () => {
  const { colors } = useTheme();
  return (
    <Input
      rightIcon={<Ionicons name="search" size={20} color={colors.muted} />}
      placeholder="Search notes..."
      containerStyle={{ paddingHorizontal: 16, marginBottom: 8 }}
    />
  );
};
