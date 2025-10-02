import React from "react";
import { View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppHeader } from "../../src/components/AppHeader";
import { SearchInput } from "../../src/components/SearchInput";
import { NoNotes, NotesContainer } from "../../src/components/NotesContainer";
import { useTheme } from "@react-navigation/native";
import { useNote } from "../../src/context/note";

export default function HomeScreen() {
  const { colors } = useTheme();
  const { notes, loading, error } = useNote();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{ flex: 1, width: "100%", backgroundColor: colors.background }}
      >
        <AppHeader />
        <View style={{ paddingHorizontal: 16, marginBottom: 8 }}>
          <SearchInput />
        </View>
        {loading === "loading" ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : error ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 16,
            }}
          >
            <NoNotes message={error} />
          </View>
        ) : notes && notes.length > 0 ? (
          <NotesContainer notes={notes} />
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 16,
            }}
          >
            <NoNotes />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
