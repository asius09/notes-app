import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { P, Muted } from "../../src/components/ui/Typography";
import { useTheme } from "../../src/hooks/useTheme";

export default function ProfilePage() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.container}>
        <Image
          source={{
            uri: "https://ui-avatars.com/api/?name=User&background=007AFF&color=fff&size=128",
          }}
          style={styles.avatar}
        />
        <P size="lg" style={{ marginTop: 16, color: colors.text }}>
          John Doe
        </P>
        <Muted size="md" style={{ marginTop: 4 }}>
          johndoe@email.com
        </Muted>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#eee",
  },
});
