import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useNote } from "../../src/context/note";
import { Muted, P } from "../../src/components/ui/Typography";
import { Button } from "../../src/components/ui/Button";
import { useTheme } from "../../src/hooks/useTheme";
import { SafeAreaView } from "react-native-safe-area-context";
// import { debounce } from "../../../src/utils/debounce";

const NoteEditPage = () => {
  const { noteid } = useLocalSearchParams<{ noteid: string }>();
  const { notes, updateNote, deleteNote, loading, error } = useNote();
  const { colors } = useTheme();
  const router = useRouter();

  const [note, setNote] = useState<{
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
  } | null>(null);

  const [isSaving, setIsSaving] = useState(false);

  // const handleAutoSave = useRef(debounce(() => handleSave(false), 500)).current;

  useEffect(() => {
    const foundNote = notes.find((n) => n.id === noteid);
    if (foundNote) {
      setNote({
        id: foundNote.id,
        title: foundNote.title,
        content: foundNote.content,
        createdAt: foundNote.createdAt,
        updatedAt: foundNote.updatedAt,
      });
    }
  }, [noteid, notes]);

  const handleSave = async (goBack = true) => {
    if (!note) return;
    if (!note.title.trim()) {
      Alert.alert("Title required", "Please enter a title for your note.");
      return;
    }
    if (!note.content.trim()) {
      Alert.alert("Content required", "Please enter content for your note.");
      return;
    }
    setIsSaving(true);
    try {
      await updateNote({
        ...note,
        title: note.title.trim(),
        updatedAt: new Date().toISOString(),
      });
      setIsSaving(false);
      if (goBack) router.back();
    } catch (e: any) {
      setIsSaving(false);
      Alert.alert("Error", e?.message || "Failed to update note.");
    }
  };

  // Handle note field changes
  const onNoteChange = (name: "title" | "content", value: string) => {
    setNote((prev) =>
      prev
        ? {
            ...prev,
            [name]: value,
            updatedAt: new Date().toISOString(),
          }
        : prev
    );
    // handleAutoSave && handleAutoSave();
  };

  const handleDelete = () => {
    Alert.alert("Delete Note", "Are you sure you want to delete this note?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteNote(noteid!);
            router.replace("/");
          } catch (e: any) {
            Alert.alert("Error", e?.message || "Failed to delete note.");
          }
        },
      },
    ]);
  };

  if (loading === "loading" || !note) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!note.title && !note.content) {
    return (
      <View style={styles.centered}>
        <P>Note not found.</P>
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
        {/* Top action row with Save and Delete */}
        <View style={[styles.buttonRow, { marginBottom: 18 }]}>
          <Button
            title="Delete"
            variant="destructive"
            onPress={handleDelete}
            style={[styles.button, { marginRight: 8 }]}
            disabled={isSaving}
          />
          <Button
            title="Save"
            onPress={() => handleSave(true)}
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

export default NoteEditPage;
