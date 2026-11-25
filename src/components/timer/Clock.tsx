import { Colors } from "@/constants/theme";
import { StyleSheet, Text, View } from "react-native";

type ClockProps = {
  timer: number;
};

export function Clock({ timer }: ClockProps) {
  return (
    <View style={styles.clock}>
      <View style={styles.clockBody}>
        {Array.from({ length: 60 }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.clockMark,
              {
                height: index % 15 === 0 ? 30 : index % 5 ? 10 : 20,
                backgroundColor:
                  index % 15 === 0
                    ? Colors.accent
                    : index % 5
                      ? "white"
                      : "brown",
                transform: [{ rotate: `${index * 6}deg` }],
              },
            ]}
          />
        ))}
        {[0, 15, 30, 45].map((value) => (
          <View
            key={value}
            style={[
              styles.clockNumber,
              {
                transform: [
                  { rotate: `${value * 6}deg` },
                  { translateY: -65 },
                  { rotate: `${-value * 6}deg` },
                ],
              },
            ]}
          >
            <Text style={styles.clockNumberText}>
              {value === 0 ? "60" : value}
            </Text>
          </View>
        ))}
        <View style={styles.clockCenter} />
        <View
          style={[
            styles.clockHand,
            {
              transform: [{ rotate: `${(timer / 1000) * 6}deg` }],
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  clock: {
    height: "60%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  clockBody: {
    borderColor: Colors.accent,
    backgroundColor: Colors.surface,
    borderWidth: 4,
    borderRadius: 120,
    width: 240,
    height: 240,
    justifyContent: "center",
    alignItems: "center",
  },
  clockNumber: {
    position: "absolute",
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  clockNumberText: {
    color: "white",
    fontSize: 16,
  },
  clockCenter: {
    position: "absolute",
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.accent,
  },
  clockMark: {
    position: "absolute",
    width: 2,
    backgroundColor: "#FFF",
    top: 4,
    transformOrigin: "center 112px",
  },
  clockHand: {
    position: "absolute",
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 100,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: Colors.accent,
    bottom: "50%",
    transformOrigin: "center bottom",
  },
});
