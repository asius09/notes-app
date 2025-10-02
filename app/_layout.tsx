import { Stack } from "expo-router";
import { ThemeProvider } from "../src/hooks/useTheme";

export default function AppLayout() {
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  );
}
