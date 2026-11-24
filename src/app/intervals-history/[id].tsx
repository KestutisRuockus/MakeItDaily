import { FormattedTime } from "@/components/ui/FormattedTime";
import { ScrollContainer } from "@/components/ui/ScrollContainer";
import { Colors, Spacing } from "@/constants/theme";
import { useIntervalsHistory } from "@/context/IntervalsHistoryContext";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function IntervalDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { intervalsHistory } = useIntervalsHistory();

  const item = intervalsHistory.find((item) => item.id === id);
  const { setIntervalsHistory } = useIntervalsHistory();
  const router = useRouter();

  const deleteInterval = () => {
    const filteredHistory = intervalsHistory.filter((item) => item.id !== id);
    setIntervalsHistory(filteredHistory);
    router.back();
  };

  const confirmDelete = () => {
    Alert.alert(
      "Delete interval history?",
      "Are you sure you want to delete this history? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: deleteInterval,
        },
      ],
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: item ? item.date : "Interval Details",
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerTintColor: Colors.accent,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
        <ScrollContainer>
          {item?.intervals.map((interval, index) => (
            <FormattedTime
              key={index}
              label={`${index + 1}).`}
              time={interval}
            />
          ))}
          <View style={styles.bottomSection}>
            {item?.overallTime ? (
              <FormattedTime
                label={"Overall time : "}
                time={item?.overallTime}
              />
            ) : (
              <Text>"00:00"</Text>
            )}
            <Pressable style={styles.deleteBtn} onPress={confirmDelete}>
              <Text style={styles.buttonText}>Delete</Text>
            </Pressable>
          </View>
        </ScrollContainer>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  bottomSection: {
    marginTop: Spacing.three,
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.three,
    width: "100%",
    borderTopWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.three,
  },
  deleteBtn: {
    backgroundColor: Colors.accent,
    padding: Spacing.three,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: Colors.textAccent,
    fontWeight: "600",
  },
});
