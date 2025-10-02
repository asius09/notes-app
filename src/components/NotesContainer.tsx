import { StyleSheet, View } from "react-native";
import { H3 } from "./ui/Typography";
import { useTheme } from "../hooks/useTheme";
import { NoteType } from "../types/noteType";
import { NoteCard } from "./NoteCard";

type NotesContainerProps = {
  notes: NoteType[];
};

export const NotesContainer = ({ notes }: NotesContainerProps) => {
  //   const { colors } = useTheme();
  return (
    <View style={[styles.container]}>
      {notes.map((note) => (
        <NoteCard key={note.id} {...note} />
      ))}
    </View>
  );
};

export const NoNotes = ({ message }: { message?: string }) => {
  const { colors } = useTheme();
  return (
    <H3 style={{ color: colors.muted }}>
      {message || "No notes yet. Create one!"}
    </H3>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 16,
    marginTop: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 10, // optional, for spacing between cards if supported
  },
});
