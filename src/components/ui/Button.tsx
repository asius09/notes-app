import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
  GestureResponderEvent,
} from "react-native";
import { useTheme } from "../../hooks/useTheme";

type ButtonProps = {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  iconSize?: number;
  disabled?: boolean;
  loading?: boolean;
  style?: any;
  textStyle?: any;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

const sizeStyles = {
  small: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    fontSize: 14,
    borderRadius: 6,
    iconSize: 16,
  },
  medium: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    borderRadius: 8,
    iconSize: 20,
  },
  large: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    fontSize: 18,
    borderRadius: 10,
    iconSize: 24,
  },
};

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  iconSize,
  disabled = false,
  loading = false,
  style,
  textStyle,
  leftIcon,
  rightIcon,
}) => {
  const { colors } = useTheme();

  // Determine colors based on variant
  let backgroundColor = colors.primary;
  let borderColor = colors.primary;
  let textColor = colors.surface;

  if (variant === "secondary") {
    backgroundColor = colors.secondary;
    borderColor = colors.secondary;
    textColor = colors.surface;
  } else if (variant === "outline") {
    backgroundColor = "transparent";
    borderColor = colors.primary;
    textColor = colors.primary;
  }

  if (disabled) {
    backgroundColor = colors.muted;
    borderColor = colors.muted;
    textColor = colors.surface;
  }

  const sizeStyle = sizeStyles[size];
  const resolvedIconSize = iconSize ?? sizeStyle.iconSize;

  // Helper to render icon with size prop if possible
  const renderIcon = (icon: React.ReactNode, position: "left" | "right") => {
    if (!icon) return null;
    // If icon is a valid React element and accepts size prop, clone it with size and color
    if (React.isValidElement(icon)) {
      return React.cloneElement(icon as React.ReactElement<any>, {
        size: resolvedIconSize,
        color: textColor,
        style: [
          (icon as any).props?.style,
          position === "left" ? { marginRight: 6 } : { marginLeft: 6 },
        ],
      });
    }
    // Otherwise, just render as is
    return (
      <View
        style={position === "left" ? { marginRight: 6 } : { marginLeft: 6 }}
      >
        {icon}
      </View>
    );
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled || loading}
      style={[
        {
          backgroundColor,
          borderColor,
          borderWidth: variant === "outline" ? 2 : 0,
          borderRadius: sizeStyle.borderRadius,
          paddingVertical: sizeStyle.paddingVertical,
          paddingHorizontal: sizeStyle.paddingHorizontal,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          opacity: disabled ? 0.7 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={textColor}
          style={{ marginRight: 6 }}
          size={resolvedIconSize}
        />
      ) : (
        renderIcon(leftIcon, "left")
      )}
      <Text
        style={[
          {
            color: textColor,
            fontSize: sizeStyle.fontSize,
            fontWeight: "600",
          },
          textStyle,
        ]}
      >
        {title}
      </Text>
      {!loading && renderIcon(rightIcon, "right")}
    </TouchableOpacity>
  );
};
