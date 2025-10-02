import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppHeader } from "../src/components/AppHeader";
import { SearchInput } from "../src/components/SearchInput";
import { NoteType } from "../src/types/noteType";
import { NoNotes, NotesContainer } from "../src/components/NotesContainer";
import { useTheme } from "@react-navigation/native";

export default function HomeScreen() {
  const { colors } = useTheme();
  const notes: NoteType[] = [
    {
      id: "1",
      title: "First Note",
      content: "This is the content of the first note.",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Second Note",
      content: "Here's another note for testing.",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{ flex: 1, width: "100%", backgroundColor: colors.background }}
      >
        <AppHeader />
        <View style={{ paddingHorizontal: 16, marginBottom: 8 }}>
          <SearchInput />
        </View>
        {notes && notes.length > 0 ? (
          <NotesContainer notes={notes} />
        ) : (
          <NoNotes />
        )}
      </View>
    </SafeAreaView>
  );
}
