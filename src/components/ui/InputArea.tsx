import React, { useState, useRef } from "react";
import { TextInput, View, StyleSheet, Platform, TextInputProps } from "react-native";
import { useTheme } from "../../hooks/useTheme";

type InputAreaProps = TextInputProps & {
  minHeight?: number;
  maxHeight?: number;
  style?: any;
  containerStyle?: any;
};

export const InputArea: React.FC<InputAreaProps> = ({
  minHeight = 80,
  maxHeight = 240,
  style,
  containerStyle,
  ...props
}) => {
  const { colors } = useTheme();
  const [inputHeight, setInputHeight] = useState(minHeight);
  const inputRef = useRef<TextInput>(null);

  const handleContentSizeChange = (event: any) => {
    const height = event.nativeEvent.contentSize.height;
    let newHeight = Math.max(minHeight, height);
    if (maxHeight) {
      newHeight = Math.min(newHeight, maxHeight);
    }
    setInputHeight(newHeight);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.surface, borderColor: colors.border },
        containerStyle,
      ]}
    >
      <TextInput
        ref={inputRef}
        style={[
          styles.input,
          {
            color: colors.text,
            minHeight,
            maxHeight,
            height: inputHeight,
            textAlignVertical: "top",
          },
          style,
        ]}
        multiline
        onContentSizeChange={handleContentSizeChange}
        placeholderTextColor={colors.muted}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  input: {
    fontSize: 16,
    flex: 1,
    paddingVertical: Platform.OS === "ios" ? 6 : 0,
    paddingHorizontal: 0,
  },
});
