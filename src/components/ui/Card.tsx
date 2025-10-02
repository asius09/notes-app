import React from "react";
import { View, StyleSheet, ViewStyle, StyleProp } from "react-native";
import { useTheme } from "../../hooks/useTheme";
import { H4, P } from "./Typography";

type CardProps = {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};

type CardHeaderProps = {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

type CardFooterProps = {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

type CardContentProps = {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  description,
  children,
  style,
}) => {
  const { colors } = useTheme();
  if (!title && !description && !children) return null;
  return (
    <View style={[styles.header, style]}>
      {title && <H4 style={styles.title}>{title}</H4>}
      {description && (
        <P style={[styles.description, { color: colors.muted }]}>
          {description}
        </P>
      )}
      {children}
    </View>
  );
};

export const CardContent: React.FC<CardContentProps> = ({
  children,
  style,
}) => {
  return <View style={[styles.content, style]}>{children}</View>;
};

export const CardFooter: React.FC<CardFooterProps> = ({ children, style }) => {
  if (!children) return null;
  return <View style={[styles.footer, style]}>{children}</View>;
};

export const Card: React.FC<CardProps> = ({ style, children }) => {
  const { colors } = useTheme();

  // Extract header, content, footer, and other children
  let header: React.ReactNode = null;
  let content: React.ReactNode = null;
  let footer: React.ReactNode = null;
  const other: React.ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) {
      other.push(child);
      return;
    }
    if (child.type === CardHeader) {
      header = child;
    } else if (child.type === CardContent) {
      content = child;
    } else if (child.type === CardFooter) {
      footer = child;
    } else {
      other.push(child);
    }
  });

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          shadowColor: colors.shadow,
        } as ViewStyle,
        style,
      ]}
    >
      <View style={styles.inner}>
        {header}
        {content}
        {other}
        <View style={{ flex: 1 }} />
        {footer && <View style={styles.footerContainer}>{footer}</View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    marginVertical: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  inner: {
    flexDirection: "column",
    flex: 1,
    minHeight: 0,
    padding: 16,
    flexGrow: 1,
    justifyContent: "flex-start",
  },
  header: {
    marginBottom: 8,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  title: {
    marginBottom: 2,
    textAlign: "left",
    alignSelf: "flex-start",
  },
  description: {
    textAlign: "left",
    alignSelf: "flex-start",
  },
  content: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
  },
  footer: {
    marginTop: 12,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    width: "100%",
  },
  footerContainer: {
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    flexGrow: 1,
    padding: 2,
  },
});

export default Card;
