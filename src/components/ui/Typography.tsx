import React from "react";
import { Text, StyleSheet, TextProps } from "react-native";
import { useTheme } from "../../hooks/useTheme";

type TypographyProps = TextProps & {
  children: React.ReactNode;
  style?: any;
};

type SizeType = "xs" | "sm" | "md" | "lg" | "xl";

const fontSizeMap: Record<SizeType, number> = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
};

export const Typography: React.FC<TypographyProps> = ({
  children,
  style,
  ...props
}) => {
  const { colors } = useTheme();
  return (
    <Text style={[{ color: colors.text }, style]} {...props}>
      {children}
    </Text>
  );
};

export const H1: React.FC<TypographyProps> = ({
  children,
  style,
  ...props
}) => {
  return (
    <Typography style={[typographyStyles.h1, style]} {...props}>
      {children}
    </Typography>
  );
};

export const H2: React.FC<TypographyProps> = ({
  children,
  style,
  ...props
}) => {
  return (
    <Typography style={[typographyStyles.h2, style]} {...props}>
      {children}
    </Typography>
  );
};

export const H3: React.FC<TypographyProps> = ({
  children,
  style,
  ...props
}) => {
  return (
    <Typography style={[typographyStyles.h3, style]} {...props}>
      {children}
    </Typography>
  );
};

export const H4: React.FC<TypographyProps> = ({
  children,
  style,
  ...props
}) => {
  return (
    <Typography style={[typographyStyles.h4, style]} {...props}>
      {children}
    </Typography>
  );
};

type PProps = TypographyProps & {
  size?: SizeType;
};

export const P: React.FC<PProps> = ({
  children,
  style,
  size = "md",
  ...props
}) => {
  const { colors } = useTheme();
  return (
    <Text
      style={[
        typographyStyles.p,
        { color: colors.text, fontSize: fontSizeMap[size] },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

export const Label: React.FC<TypographyProps> = ({
  children,
  style,
  ...props
}) => {
  const { colors } = useTheme();
  return (
    <Text
      style={[typographyStyles.label, { color: colors.muted }, style]}
      {...props}
    >
      {children}
    </Text>
  );
};

type MutedProps = TypographyProps & {
  size?: SizeType;
};

export const Muted: React.FC<MutedProps> = ({
  children,
  style,
  size = "md",
  ...props
}) => {
  const { colors } = useTheme();
  return (
    <Text
      style={[
        typographyStyles.muted,
        { color: colors.muted, fontSize: fontSizeMap[size] },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

const typographyStyles = StyleSheet.create({
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
    fontWeight: "400",
    marginBottom: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  muted: {
    fontWeight: "400",
    opacity: 0.7,
  },
});
