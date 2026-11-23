import { Colors, FontSize } from "@/constants/theme";
import { formatTime } from "@/utils/formatTime";
import { StyleSheet, Text } from "react-native";

type Props = {
  label?: string;
  time: number;
};

export function FormattedTime({ label, time }: Props) {
  return (
    <Text style={styles.timer}>
      <Text style={styles.smallNumber}>{label} </Text>
      {formatTime(time)}
    </Text>
  );
}

const styles = StyleSheet.create({
  timer: {
    textTransform: "uppercase",
    color: Colors.textPrimary,
    fontSize: FontSize.subTitle,
  },
  smallNumber: {
    fontSize: 16,
  },
});
