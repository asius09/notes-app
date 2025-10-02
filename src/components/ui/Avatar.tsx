import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  ViewStyle,
  ImageStyle,
} from "react-native";
import { useTheme } from "../../hooks/useTheme";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

const sizeMap: Record<AvatarSize, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 56,
  xl: 72,
};

type AvatarProps = {
  source?: { uri: string } | number;
  size?: AvatarSize;
  style?: ViewStyle | ImageStyle;
  label?: string; // fallback initials or label
};

export const Avatar: React.FC<AvatarProps> = ({
  source,
  size = "md",
  style,
  label,
}) => {
  const { colors } = useTheme();
  const dimension = sizeMap[size];

  return (
    <View
      style={[
        styles.avatar,
        {
          width: dimension,
          height: dimension,
          borderRadius: dimension / 2,
          backgroundColor: colors.surfaceVariant || colors.surface,
          borderColor: colors.border,
        },
        style,
      ]}
    >
      {source ? (
        <Image
          source={source}
          style={{
            width: dimension,
            height: dimension,
            borderRadius: dimension / 2,
          }}
          resizeMode="cover"
        />
      ) : (
        <Text
          style={{
            color: colors.text,
            fontSize: dimension * 0.45,
            fontWeight: "600",
            textAlign: "center",
            lineHeight: dimension,
          }}
        >
          {label ? label[0].toUpperCase() : "?"}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderWidth: 1,
  },
});
