import { Feather, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NoteProvider } from "../../src/context/note";
import { ThemeProvider } from "../../src/hooks/useTheme";

// Only show the following icons: Home (Ionicons home-outline), Create (Feather plus-circle), Profile (Ionicons person-circle-outline)

export default function TabLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NoteProvider>
          <Tabs
            screenOptions={{
              headerShown: false,
              tabBarActiveTintColor: "#007AFF",
              tabBarInactiveTintColor: "#8e8e93",
              tabBarStyle: { backgroundColor: "#fff" },
            }}
          >
            <Tabs.Screen
              name="index"
              options={{
                title: "Home",
                tabBarLabel: "Home",
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="home-outline" size={size} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="create"
              options={{
                title: "Create Note",
                tabBarLabel: "Create",
                tabBarIcon: ({ color, size }) => (
                  <Feather name="plus-circle" size={size} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="profile"
              options={{
                title: "Profile",
                tabBarLabel: "Profile",
                tabBarIcon: ({ color, size }) => (
                  <Ionicons
                    name="person-circle-outline"
                    size={size}
                    color={color}
                  />
                ),
              }}
            />
          </Tabs>
        </NoteProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
