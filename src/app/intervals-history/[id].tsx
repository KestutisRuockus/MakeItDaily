import { Colors, FontSize, Spacing } from "@/constants/theme";
import { useIntervalsHistory } from "@/context/IntervalsHistoryContext";
import { formatTime } from "@/utils/formatTime";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
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
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.content}
        >
          {item?.intervals.map((interval, index) => (
            <Text key={index} style={styles.timer}>
              {`${index + 1}). ${formatTime(interval)}`}
            </Text>
          ))}
          <View style={styles.bottomSection}>
            <Text style={styles.headingText}>
              {`Overall time: ${item?.overallTime ? formatTime(item.overallTime) : "00:00"}`}
            </Text>
            <Pressable style={styles.deleteBtn} onPress={confirmDelete}>
              <Text style={styles.buttonText}>Delete</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
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
  heading: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  headingText: {
    color: Colors.textPrimary,
    fontSize: 24,
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
    width: "100%",
    marginVertical: Spacing.two,
  },
  timer: {
    textTransform: "uppercase",
    color: Colors.textPrimary,
    fontSize: FontSize.subTitle,
  },
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
