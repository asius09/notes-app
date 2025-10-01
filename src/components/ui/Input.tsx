import React from "react";
import { TextInput, View, StyleSheet, TextInputProps } from "react-native";
import { useTheme } from "../../hooks/useTheme";

type InputProps = TextInputProps & {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: any;
  inputStyle?: any;
};

export const Input: React.FC<InputProps> = ({
  leftIcon,
  rightIcon,
  containerStyle,
  inputStyle,
  style,
  ...props
}) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.surface, borderColor: colors.border },
        containerStyle,
      ]}
    >
      {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
      <TextInput
        style={[
          styles.input,
          { color: colors.text },
          inputStyle,
          style,
        ]}
        placeholderTextColor={colors.muted}
        {...props}
      />
      {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    minHeight: 20,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});
