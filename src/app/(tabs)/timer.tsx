import {
  BottomTabInset,
  Colors,
  FontSize,
  MaxContentWidth,
  Spacing,
} from "@/constants/theme";
import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ScrollViewInstance,
} from "react-native";

export default function Timer() {
  const [timer, setTimer] = React.useState<number>(0);
  const [timerStarted, setTimerStarted] = React.useState<boolean>(false);
  const [intervals, setIntervals] = React.useState<number[]>([]);
  const [overallTime, setOverallTime] = React.useState<number>(0);
  const [overallTimeAtLastInterval, setOverallTimeAtLastInterval] =
    React.useState(0);
  const [intervalsHistory, setIntervalsHistory] = React.useState<
    { intervals: number[]; overallTime: number }[]
  >([]);

  const intervalRef = useRef<ScrollViewInstance>(null);
  const bgAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (timerStarted) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 10);
        setOverallTime((prevOverallTime) => prevOverallTime + 10);
      }, 10);

      return () => clearInterval(interval);
    }
  }, [timerStarted]);

  const resetTimer = () => {
    setTimerStarted(false);

    if (intervals.length > 0) {
      setIntervalsHistory((prev) => [
        ...prev,
        {
          intervals: [...intervals],
          overallTime: overallTimeAtLastInterval,
        },
      ]);
    }

    setTimer(0);
    setOverallTime(0);
    setIntervals([]);
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

  useEffect(() => {
    console.log(
      "Intervals history:",
      JSON.stringify(intervalsHistory, null, 2),
    );
  }, [intervalsHistory]);

  const markInterval = () => {
    if (timer > 0) {
      setIntervals([...intervals, timer]);
      setOverallTimeAtLastInterval(overallTime);
      setTimer(0);
      intervalRef.current?.scrollToEnd({ animated: true });
      flashIntervals();
    }
  };

  const flashIntervals = () => {
    Animated.parallel([
      Animated.sequence([
        Animated.timing(bgAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(bgAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
      ]),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.intervalsTitle}>Intervals</Text>
      <Animated.ScrollView
        ref={intervalRef}
        contentContainerStyle={styles.intervalsContent}
        showsVerticalScrollIndicator
        style={[
          styles.intervalsContainer,
          {
            backgroundColor: bgAnim.interpolate({
              inputRange: [0, 2],
              outputRange: [Colors.surface, Colors.background],
            }),
          },
        ]}
      >
        {intervals.map((interval, index) => (
          <Text key={index} style={styles.timer}>
            {`${index + 1}). ${formatTime(interval)}`}
          </Text>
        ))}
        {timerStarted || intervals.length > 0 ? (
          <Text style={styles.timer}>
            <Text style={styles.smallNumber}> Overall: </Text>
            {formatTime(overallTime)}
          </Text>
        ) : (
          ""
        )}
      </Animated.ScrollView>

      {intervalsHistory.length > 0 && (
        <Pressable
          style={styles.showIntervalsHistoryBtn}
          onPress={() => router.push("/intervals-history")}
        >
          <Text style={styles.buttonText}>
            Intervals history ({intervalsHistory.length})
          </Text>
        </Pressable>
      )}
      <View style={styles.timerContainer}>
        <Text style={styles.title}>Timer</Text>
        <Text style={styles.timer}>
          <Text style={styles.smallNumber}>Interval: </Text>
          {formatTime(timer)}
        </Text>

        <View style={styles.center}>
          {!timerStarted ? (
            <Pressable
              style={styles.button}
              onPress={() => setTimerStarted(true)}
            >
              <Text style={styles.buttonText}>Start</Text>
            </Pressable>
          ) : (
            <Pressable style={styles.button} onPress={markInterval}>
              <Text style={styles.buttonText}>Interval</Text>
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
    justifyContent: "flex-end",
    alignItems: "center",
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
  timerContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: Spacing.two,
    gap: Spacing.two,
    maxHeight: "25%",
    width: "100%",
    borderTopWidth: 1,
    borderColor: Colors.border,
  },
  intervalsContainer: {
    flex: 1,
    paddingHorizontal: Spacing.two,
    maxHeight: "65%",
    width: "100%",
  },
  intervalsContent: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Spacing.two,
    paddingBottom: Spacing.six,
  },
  smallNumber: {
    fontSize: 14,
  },
  showIntervalsHistoryBtn: {
    position: "absolute",
    bottom: "26%",
    right: "5%",
    padding: Spacing.two,
    backgroundColor: Colors.accent,
    borderRadius: 8,
  },
  title: {
    textAlign: "center",
    color: Colors.textPrimary,
    fontSize: FontSize.title,
  },
  intervalsTitle: {
    textAlign: "center",
    color: Colors.textPrimary,
    fontSize: FontSize.title,
    marginBottom: Spacing.one,
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
