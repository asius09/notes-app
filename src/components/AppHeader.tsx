import { View } from "react-native";
import { H2, H3 } from "./ui/Typography";
import { Avatar } from "./ui/Avatar";

export const AppHeader = () => {
  const user: string = "Adiba";

  const greetings = (user: string) => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return `Good morning ${user}`;
    } else if (hour >= 12 && hour < 18) {
      return `Good afternoon ${user}`;
    } else if (hour >= 18 && hour < 22) {
      return `Good evening ${user}`;
    } else {
      return `Good night ${user}`;
    }
  };
  return (
    <View
      style={{
        width: "100%",
        paddingHorizontal: 16,
        minHeight: 60,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <H3>{greetings(user)}</H3>
      <Avatar />
    </View>
  );
};
