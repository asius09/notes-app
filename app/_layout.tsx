import { ThemeProvider } from "../src/hooks/useTheme";
import { NoteProvider } from "@/src/context/note";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NoteProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </NoteProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
