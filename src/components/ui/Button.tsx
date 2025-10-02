import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
  GestureResponderEvent,
} from "react-native";
import { useTheme } from "../../hooks/useTheme";

type ButtonVariant = "primary" | "secondary" | "outline" | "destructive";
type ButtonSize = "small" | "medium" | "large";

type ButtonProps = {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconSize?: number;
  disabled?: boolean;
  loading?: boolean;
  style?: any;
  textStyle?: any;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

const sizeStyles: Record<
  ButtonSize,
  {
    paddingVertical: number;
    paddingHorizontal: number;
    fontSize: number;
    borderRadius: number;
    iconSize: number;
  }
> = {
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

// Helper to get button colors based on variant, disabled, and theme
function getButtonColors({
  variant,
  disabled,
  colors,
}: {
  variant: ButtonVariant;
  disabled: boolean;
  colors: any;
}) {
  if (disabled) {
    return {
      backgroundColor: colors.muted,
      borderColor: colors.muted,
      textColor: colors.surface,
    };
  }
  switch (variant) {
    case "secondary":
      return {
        backgroundColor: colors.secondary,
        borderColor: colors.secondary,
        textColor: colors.surface,
      };
    case "outline":
      return {
        backgroundColor: "transparent",
        borderColor: colors.primary,
        textColor: colors.primary,
      };
    case "destructive":
      return {
        backgroundColor: colors.error,
        borderColor: colors.error,
        textColor: colors.surface,
      };
    case "primary":
    default:
      return {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
        textColor: colors.surface,
      };
  }
}

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

  const { backgroundColor, borderColor, textColor } = getButtonColors({
    variant,
    disabled,
    colors,
  });

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
