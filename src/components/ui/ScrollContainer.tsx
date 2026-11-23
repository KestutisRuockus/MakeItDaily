import { Colors, Spacing } from "@/constants/theme";
import { ScrollView, StyleSheet } from "react-native";

export function ScrollContainer({ children }: { children: React.ReactNode }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    alignItems: "center",
    padding: Spacing.four,
  },
});
