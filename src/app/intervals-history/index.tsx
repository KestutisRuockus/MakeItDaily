import IntervalCard from "@/components/IntervalCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import {
  BottomTabInset,
  Colors,
  MaxContentWidth,
  Spacing,
} from "@/constants/theme";
import { useIntervalsHistory } from "@/context/IntervalsHistoryContext";
import { useRouter } from "expo-router";

import { FlatList, StyleSheet, Text, View } from "react-native";

export default function IntervalsHistory() {
  const { intervalsHistory } = useIntervalsHistory();
  const router = useRouter();

  return (
    <ScreenContainer>
      <View style={styles.content}>
        {intervalsHistory.length === 0 ? (
          <>
            <Text style={styles.bodyText}>
              No intervals history yet. Start a timer to create some history!
            </Text>
            <PrimaryButton
              text={"Open Timer"}
              onPress={() => router.push("/(tabs)/timer")}
            />
          </>
        ) : (
          <FlatList
            contentContainerStyle={styles.list}
            data={intervalsHistory}
            renderItem={({ item }) => <IntervalCard item={item} />}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: Spacing.two,
    alignItems: "center",
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  list: {
    width: "100%",
    gap: Spacing.three,
  },
  bodyText: {
    color: Colors.textPrimary,
    fontSize: 20,
    textAlign: "center",
    padding: Spacing.three,
  },
});
