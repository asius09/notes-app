import { useEffect, useState, useMemo } from "react";
import { Muted, P } from "./ui/Typography";
import { Card, CardHeader, CardContent, CardFooter } from "./ui/Card";
import { useTheme } from "../hooks/useTheme";
import { NoteType } from "../types/noteType";
import { StyleSheet, Dimensions, Pressable } from "react-native";
import { formatDate } from "../utils/formatDate";
import { useRouter } from "expo-router";

const CARD_GAP = 10;
const CONTAINER_PADDING = 16 * 2;
const SCREEN_WIDTH = Dimensions.get("window").width;
const CARD_WIDTH = (SCREEN_WIDTH - CONTAINER_PADDING - CARD_GAP) / 2;

const CARD_COLORS = [
  { bg: "#F9E5E5", text: "#3A2C2C" },
  { bg: "#E5F6F9", text: "#2C3A3A" },
  { bg: "#F9F6E5", text: "#3A392C" },
  { bg: "#E5F9E7", text: "#2C3A2C" },
  { bg: "#F3E5F9", text: "#3A2C3A" },
  { bg: "#E5E9F9", text: "#2C2F3A" },
  { bg: "#F9EFE5", text: "#3A352C" },
  { bg: "#E5F9F2", text: "#2C3A36" },
];

function getCardColor(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  const idx = Math.abs(hash) % CARD_COLORS.length;
  return CARD_COLORS[idx];
}


export const NoteCard = ({
  title,
  content,
  createdAt,
  updatedAt,
  id,
}: NoteType) => {
  const { colors, mode } = useTheme();
  const router = useRouter();

  const cardColor = useMemo(() => getCardColor(id), [id]);
  const backgroundColor = mode === "dark" ? colors.card : cardColor.bg;
  const textColor = mode === "dark" ? colors.text : cardColor.text;

  const [footerLabel, setFooterLabel] = useState<string>("");
  const [footerDate, setFooterDate] = useState<string>("");

  useEffect(() => {
    const isUpdated = updatedAt && updatedAt !== createdAt;
    setFooterLabel(isUpdated ? "Updated" : "Created");
    setFooterDate(formatDate(isUpdated ? updatedAt : createdAt));
  }, [createdAt, updatedAt]);

  const truncateText = (text: string) => {
    return text.length > 200 ? text.slice(0, 197) + "..." : text;
  };

  const handlePress = () => {
    router.push(`/note/${id}`);
  };

  return (
    <Pressable onPress={handlePress} style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}>
      <Card style={[styles.notesCard, { backgroundColor }]}>
        <CardHeader title={title} />
        <CardContent>
          <P style={{ color: textColor }} size="sm">
            {truncateText(content)}
          </P>
        </CardContent>
        <CardFooter>
          <Muted
            size="xs"
            style={{ color: textColor, opacity: 0.7 }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {footerLabel}: {footerDate}
          </Muted>
        </CardFooter>
      </Card>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  notesCard: {
    width: CARD_WIDTH,
    minHeight: 140,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    overflow: "hidden",
  },
});
