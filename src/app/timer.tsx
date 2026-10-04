import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import React, { useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Timer() {
  const [timer, setTimer] = React.useState(0);
  const [timerStarted, setTimerStarted] = React.useState(false);

  useEffect(() => {
    if (timerStarted) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 10);
      }, 10);

      return () => clearInterval(interval);
    }
  }, [timerStarted]);

  const resetTimer = () => {
    setTimerStarted(false);
    setTimer(0);
  };

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
      <View style={styles.heroSection}>
        <Text>Timer</Text>
        <Text>{formatTime(timer)}</Text>
        <View style={styles.center}>
          <Button title="Start" onPress={() => setTimerStarted(true)} />
          {timer > 0 && !timerStarted ? (
            <Button title="Reset" onPress={resetTimer} />
          ) : timer > 0 && timerStarted ? (
            <Button title="Pause" onPress={() => setTimerStarted(false)} />
          ) : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: "center",
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  heroSection: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  title: {
    textAlign: "center",
  },
  code: {
    textTransform: "uppercase",
  },
  stepContainer: {
    gap: Spacing.three,
    alignSelf: "stretch",
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
  center: {
    justifyContent: "center",
    flexDirection: "row",
    gap: Spacing.four,
  },
});
