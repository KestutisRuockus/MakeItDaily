import { Colors, Spacing } from "@/constants/theme";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { FormattedTime } from "../ui/FormattedTime";
import { PrimaryButton } from "../ui/PrimaryButton";
import { ScreenContainer } from "../ui/ScreenContainer";
import { Title } from "../ui/Title";
import { Clock } from "./Clock";

export function Stopwatch() {
  const [timer, setTimer] = useState<number>(0);
  const [timeStopped, setTimeStopped] = useState<boolean>(true);

  useEffect(() => {
    if (!timeStopped) {
      const startTime = Date.now() - timer;

      const interval = setInterval(() => {
        setTimer(Date.now() - startTime);
      }, 10);

      return () => clearInterval(interval);
    }
  }, [timeStopped]);

  const resetTimer = () => {
    setTimer(0);
  };

  const saveTime = () => {
    console.log("Stopwatch saved");
    setTimer(0);
  };

  return (
    <ScreenContainer>
      <Clock timer={timer} />
      <View style={styles.timerContainer}>
        <Title>Stopwatch</Title>
        <FormattedTime time={timer} />
        <View style={styles.centerBtns}>
          {timeStopped ? (
            <PrimaryButton text="Start" onPress={() => setTimeStopped(false)} />
          ) : (
            <PrimaryButton text="Pause" onPress={() => setTimeStopped(true)} />
          )}
          {timer > 0 && timeStopped && (
            <>
              <PrimaryButton text="Reset" onPress={resetTimer} />
              <PrimaryButton text="Save" onPress={saveTime} />
            </>
          )}
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
  centerBtns: {
    justifyContent: "center",
    flexDirection: "row",
    gap: Spacing.three,
  },
});
