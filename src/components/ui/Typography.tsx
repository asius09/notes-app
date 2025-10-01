import React from "react";
import { Text, StyleSheet, TextProps } from "react-native";
import { useTheme } from "../../hooks/useTheme";

type TypographyProps = TextProps & {
  children: React.ReactNode;
  style?: any;
};

export const H1: React.FC<TypographyProps> = ({ children, style, ...props }) => {
  const { colors } = useTheme();
  return (
    <Text
      style={[styles.h1, { color: colors.text }, style]}
      {...props}
    >
      {children}
    </Text>
  );
};

export const H2: React.FC<TypographyProps> = ({ children, style, ...props }) => {
  const { colors } = useTheme();
  return (
    <Text
      style={[styles.h2, { color: colors.text }, style]}
      {...props}
    >
      {children}
    </Text>
  );
};

export const H3: React.FC<TypographyProps> = ({ children, style, ...props }) => {
  const { colors } = useTheme();
  return (
    <Text
      style={[styles.h3, { color: colors.text }, style]}
      {...props}
    >
      {children}
    </Text>
  );
};

export const H4: React.FC<TypographyProps> = ({ children, style, ...props }) => {
  const { colors } = useTheme();
  return (
    <Text
      style={[styles.h4, { color: colors.text }, style]}
      {...props}
    >
      {children}
    </Text>
  );
};

export const P: React.FC<TypographyProps> = ({ children, style, ...props }) => {
  const { colors } = useTheme();
  return (
    <Text
      style={[styles.p, { color: colors.text }, style]}
      {...props}
    >
      {children}
    </Text>
  );
};

export const Label: React.FC<TypographyProps> = ({ children, style, ...props }) => {
  const { colors } = useTheme();
  return (
    <Text
      style={[styles.label, { color: colors.muted }, style]}
      {...props}
    >
      {children}
    </Text>
  );
};

export const Small: React.FC<TypographyProps> = ({ children, style, ...props }) => {
  const { colors } = useTheme();
  return (
    <Text
      style={[styles.small, { color: colors.muted }, style]}
      {...props}
    >
      {children}
    </Text>
  );
};

export const Muted: React.FC<TypographyProps> = ({ children, style, ...props }) => {
  const { colors } = useTheme();
  return (
    <Text
      style={[styles.muted, { color: colors.muted }, style]}
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 8,
  },
  h2: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 6,
  },
  h3: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 4,
  },
  h4: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 2,
  },
  p: {
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  small: {
    fontSize: 12,
    fontWeight: "400",
  },
  muted: {
    fontSize: 14,
    fontWeight: "400",
    opacity: 0.7,
  },
});
