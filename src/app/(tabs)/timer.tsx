import { FormattedTime } from "@/components/ui/FormattedTime";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { Title } from "@/components/ui/Title";
import { Colors, Spacing } from "@/constants/theme";
import { useIntervalsHistory } from "@/context/IntervalsHistoryContext";
import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  StyleSheet,
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
  const { intervalsHistory, setIntervalsHistory } = useIntervalsHistory();

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
      const now = new Date();
      setIntervalsHistory((prev) => [
        ...prev,
        {
          id: now.getTime().toString(),
          intervals: [...intervals],
          overallTime: overallTimeAtLastInterval,
          date: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}.${String(now.getMinutes()).padStart(2, "0")}`,
        },
      ]);
    }

    setTimer(0);
    setOverallTime(0);
    setOverallTimeAtLastInterval(0);
    setIntervals([]);
  };

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

  const openIntervalsHistory = () => {
    router.push({
      pathname: "/intervals-history",
    });
  };

  return (
    <ScreenContainer>
      <Title>Intervals</Title>
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
          <FormattedTime key={index} label={`${index + 1})`} time={interval} />
        ))}
        {timerStarted || intervals.length > 0 ? (
          <FormattedTime label={"Overall : "} time={overallTime} />
        ) : (
          ""
        )}
      </Animated.ScrollView>

      {intervalsHistory.length > 0 && (
        <PrimaryButton
          text={`Intervals History (${intervalsHistory.length})`}
          onPress={openIntervalsHistory}
          style={styles.openHistoryBtn}
        />
      )}
      <View style={styles.timerContainer}>
        <Title>Timer</Title>
        <FormattedTime label={"Interval : "} time={timer} />

        <View style={styles.centerBtns}>
          {!timerStarted ? (
            <PrimaryButton
              text={"Start"}
              onPress={() => setTimerStarted(true)}
            />
          ) : (
            <PrimaryButton text={"Interval"} onPress={markInterval} />
          )}
          {timer > 0 && !timerStarted ? (
            <PrimaryButton text={"Reset"} onPress={resetTimer} />
          ) : timer > 0 && timerStarted ? (
            <PrimaryButton
              text={"Pause"}
              onPress={() => setTimerStarted(false)}
            />
          ) : null}
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
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
  openHistoryBtn: {
    position: "absolute",
    bottom: "28%",
    right: "3%",
  },
  centerBtns: {
    justifyContent: "center",
    flexDirection: "row",
    gap: Spacing.two,
  },
});
