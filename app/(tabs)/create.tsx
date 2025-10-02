import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNote } from "../../src/context/note";
import { Muted } from "../../src/components/ui/Typography";
import { Button } from "../../src/components/ui/Button";
import { useTheme } from "../../src/hooks/useTheme";
import { SafeAreaView } from "react-native-safe-area-context";
import { NoteType } from "@/src/types/noteType";
// import { debounce } from "@/src/utils/debounce";

const CreateNotePage = () => {
  const { createNote, loading, error } = useNote();
  const { colors } = useTheme();

  const [note, setNote] = useState<NoteType>({
    id: Date.now().toString(),
    title: "",
    content: "",
    createdAt: "",
    updatedAt: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  const saveNote = async () => {
    setIsSaving(true);
    try {
      await createNote(note);
      setIsSaving(false);
    } catch (e: any) {
      setIsSaving(false);
      Alert.alert("Error", e?.message || "Failed to create note.");
    }
  };

  // Handle saving a new note
  const handleSave = async () => {
    if (!note.title.trim()) {
      Alert.alert("Title required", "Please enter a title for your note.");
      return;
    }
    if (!note.content.trim()) {
      Alert.alert("Content required", "Please enter content for your note.");
      return;
    }
    saveNote();
    setNote({
      id: Date.now().toString(),
      title: "",
      content: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  };

  //   const handleAutoSave = useRef(debounce(saveNote, 500)).current;

  // Handle note field changes
  const onNoteChange = (name: keyof NoteType, value: string) => {
    setNote((prev) => ({
      ...prev,
      [name]: value,
      createdAt: new Date().toISOString(),
    }));
    // handleAutoSave(); // Uncomment if you want to auto-save on change
  };

  if (loading === "loading") {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={80}
      >
        {/* Top action row with Save and Cancel */}
        <View style={[styles.buttonRow, { marginBottom: 18 }]}>
          <Button
            title="Cancel"
            variant="destructive"
            onPress={() => {}}
            style={[styles.button, { marginRight: 8 }]}
            disabled={isSaving}
          />
          <Button
            title="Save"
            onPress={handleSave}
            style={styles.button}
            loading={isSaving}
            disabled={isSaving}
          />
        </View>
        <TextInput
          style={[styles.titleInput, { color: colors.text }]}
          value={note.title}
          onChangeText={(text) => onNoteChange("title", text)}
          placeholder="Title"
          placeholderTextColor={colors.muted}
          maxLength={100}
        />
        <TextInput
          style={[styles.contentInput, { color: colors.text }]}
          value={note.content}
          onChangeText={(text) => onNoteChange("content", text)}
          placeholder="Write your note here..."
          placeholderTextColor={colors.muted}
          textAlignVertical="top"
          multiline
        />
        {error && (
          <Muted size="sm" style={{ color: colors.danger, marginTop: 8 }}>
            {error}
          </Muted>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  titleInput: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 12,
    marginBottom: 12,
  },
  contentInput: {
    flex: 1,
    fontSize: 16,
    padding: 12,
    minHeight: 120,
    textAlignVertical: "top",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CreateNotePage;
