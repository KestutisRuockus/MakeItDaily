import {
  BottomTabInset,
  Colors,
  FontSize,
  MaxContentWidth,
  Spacing,
} from "@/constants/theme";
import { useIntervalsHistory } from "@/context/IntervalsHistoryContext";
import { useEffect } from "react";

import { FlatList, StyleSheet, Text, View } from "react-native";

export default function IntervalsHistory() {
  const { intervalsHistory } = useIntervalsHistory();
  useEffect(() => {
    console.log(
      "Intervals history:",
      JSON.stringify(intervalsHistory, null, 2),
    );
  }, [intervalsHistory]);

  const formatTime = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const ms = milliseconds % 1000;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0",
    )}:${String(ms).padStart(3, "0")}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.safeArea}>
        <Text style={styles.title}>Make It Daily</Text>
        {intervalsHistory.length === 0 ? (
          <Text style={{ color: Colors.accent, textAlign: "center" }}>
            No intervals history yet. Start a timer to create some history!
          </Text>
        ) : (
          <FlatList
            data={intervalsHistory}
            renderItem={({ item, index }) => (
              <Text style={styles.interval}>
                {`${index + 1} list has ${item.intervals.length} Total intervals`}
              </Text>
            )}
            keyExtractor={(_, index) => index.toString()}
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
});
