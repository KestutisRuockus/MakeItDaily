import {
  BottomTabInset,
  Colors,
  FontSize,
  MaxContentWidth,
  Spacing,
} from "@/constants/theme";
import React, { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

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
        <Text style={styles.title}>Timer</Text>
        <Text style={styles.timer}>{formatTime(timer)}</Text>
        <View style={styles.center}>
          {!timerStarted && (
            <Pressable
              style={styles.button}
              onPress={() => setTimerStarted(true)}
            >
              <Text style={styles.buttonText}>Start</Text>
            </Pressable>
          )}
          {timer > 0 && !timerStarted ? (
            <Pressable style={styles.button} onPress={resetTimer}>
              <Text style={styles.buttonText}>Reset</Text>
            </Pressable>
          ) : timer > 0 && timerStarted ? (
            <Pressable
              style={styles.button}
              onPress={() => setTimerStarted(false)}
            >
              <Text style={styles.buttonText}>Pause</Text>
            </Pressable>
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
    backgroundColor: Colors.background,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.two,
    alignItems: "center",
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  heroSection: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: Spacing.two,
    gap: Spacing.two,
  },
  title: {
    textAlign: "center",
    color: Colors.textPrimary,
    fontSize: FontSize.title,
  },
  timer: {
    textTransform: "uppercase",
    color: Colors.textPrimary,
    fontSize: FontSize.subTitle,
  },
  center: {
    justifyContent: "center",
    flexDirection: "row",
    gap: Spacing.two,
  },
  button: {
    backgroundColor: Colors.accent,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: 12,
  },

  buttonText: {
    color: Colors.textAccent,
    fontWeight: "600",
  },
});
