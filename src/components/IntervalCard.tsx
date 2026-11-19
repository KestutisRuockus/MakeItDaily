import { Colors, Spacing } from "@/constants/theme";
import { IntervalHistoryItem } from "@/context/IntervalsHistoryContext";
import { formatTime } from "@/utils/formatTime";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

type IntervalCardProps = {
  item: IntervalHistoryItem;
};

export default function IntervalCard({ item }: IntervalCardProps) {
  const router = useRouter();
  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        router.push({
          pathname: "/intervals-history/[id]",
          params: { id: item.id },
        })
      }
    >
      <View style={styles.heading}>
        <Text style={styles.headingText}>{item.date}</Text>
        <Text style={styles.headingText}>
          {item.intervals.length} intervals
        </Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.body}>
        <Text style={styles.bodyText}>Overall time:</Text>
        <Text style={styles.bodyText}>{formatTime(item.overallTime)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: Colors.background,
    width: "100%",
    padding: Spacing.four,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  heading: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  headingText: {
    color: Colors.textPrimary,
    fontSize: 16,
  },
  body: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: Spacing.four,
  },
  bodyText: {
    color: Colors.textPrimary,
    fontSize: 20,
  },
  divider: {
    borderColor: Colors.border,
    borderWidth: 1,
    marginVertical: Spacing.two,
  },
});
