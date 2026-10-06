import {
  BottomTabInset,
  Colors,
  FontSize,
  MaxContentWidth,
  Spacing,
} from "@/constants/theme";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Timer() {
  const [timer, setTimer] = React.useState(0);
  const [timerStarted, setTimerStarted] = React.useState(false);
  const [intervals, setIntervals] = React.useState<number[]>([]);

  const intervalRef = useRef<ScrollView>(null);
  const bgAnim = useRef(new Animated.Value(0)).current;

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

  const markInterval = () => {
    setIntervals([...intervals, timer]);
    intervalRef.current?.scrollToEnd({ animated: true });
    flashIntervals();
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
              inputRange: [0, 1],
              outputRange: [Colors.surface, "#4A4B50"],
            }),
          },
        ]}
      >
        {intervals.map((interval, index) => (
          <Text key={index} style={styles.timer}>
            {formatTime(interval)}
          </Text>
        ))}
      </Animated.ScrollView>
      <View style={styles.timerContainer}>
        <Text style={styles.title}>Timer</Text>
        <Text style={styles.timer}>{formatTime(timer)}</Text>
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
    paddingVertical: Spacing.two,
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
