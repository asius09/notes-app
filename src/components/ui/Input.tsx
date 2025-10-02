import React from "react";
import { TextInput, View, TextInputProps, StyleSheet } from "react-native";
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
  ...props
}) => {
  const { colors } = useTheme();

  // Move styles that depend on theme/colors inside the component
  const themedStyles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderRadius: 10,
      backgroundColor: colors.surface,
      borderColor: colors.border,
      paddingHorizontal: 16,
      paddingVertical: 10,
      minHeight: 44,
      shadowColor: colors.shadow || "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.06,
      shadowRadius: 2,
      elevation: 1,
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: colors.text,
      paddingVertical: 0,
      paddingHorizontal: 0,
      minHeight: 20,
      backgroundColor: "transparent",
    },
    leftIcon: {
      marginRight: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    rightIcon: {
      marginLeft: 10,
      alignItems: "center",
      justifyContent: "center",
    },
  });

  return (
    <View style={[themedStyles.container, containerStyle]}>
      {leftIcon && <View style={themedStyles.leftIcon}>{leftIcon}</View>}
      <TextInput
        style={[themedStyles.input, inputStyle]}
        placeholderTextColor={colors.muted}
        underlineColorAndroid="transparent"
        {...props}
      />
      {rightIcon && <View style={themedStyles.rightIcon}>{rightIcon}</View>}
    </View>
  );
};
