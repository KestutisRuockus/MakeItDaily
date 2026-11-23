import { Colors, FontSize, Spacing } from "@/constants/theme";
import { StyleSheet, Text } from "react-native";

export function Title({ children }: { children: string }) {
  return <Text style={styles.title}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    color: Colors.textPrimary,
    fontSize: FontSize.title,
    marginBottom: Spacing.one,
  },
});
