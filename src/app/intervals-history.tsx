import {
    BottomTabInset,
    Colors,
    FontSize,
    MaxContentWidth,
    Spacing,
} from "@/constants/theme";

import { StyleSheet, Text, View } from "react-native";

export default function IntervalsHistory() {
  return (
    <View style={styles.container}>
      <View style={styles.safeArea}>
        <Text style={styles.title}>Make It Daily</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: Colors.surface,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.two,
    alignItems: "center",
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  title: {
    textAlign: "center",
    color: Colors.accent,
    fontSize: FontSize.title,
  },
});
