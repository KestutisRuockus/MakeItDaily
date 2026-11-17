import IntervalCard from "@/components/IntervalCard";
import {
  BottomTabInset,
  Colors,
  FontSize,
  MaxContentWidth,
  Spacing,
} from "@/constants/theme";
import { useIntervalsHistory } from "@/context/IntervalsHistoryContext";

import { FlatList, StyleSheet, Text, View } from "react-native";

export default function IntervalsHistory() {
  const { intervalsHistory } = useIntervalsHistory();

  return (
    <View style={styles.container}>
      <View style={styles.safeArea}>
        {intervalsHistory.length === 0 ? (
          <Text style={{ color: Colors.accent, textAlign: "center" }}>
            No intervals history yet. Start a timer to create some history!
          </Text>
        ) : (
          <FlatList
            contentContainerStyle={styles.list}
            data={intervalsHistory}
            renderItem={({ item }) => <IntervalCard item={item} />}
            keyExtractor={(item) => item.id}
          />
        )}
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
    paddingTop: Spacing.three,
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
    fontSize: FontSize.body,
  },
  interval: {
    textTransform: "uppercase",
    color: Colors.textPrimary,
    fontSize: FontSize.subTitle,
  },
  list: {
    width: "100%",
    gap: Spacing.three,
  },
});
