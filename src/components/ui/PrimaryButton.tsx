import { Colors, Spacing } from "@/constants/theme";
import {
    Pressable,
    StyleSheet,
    Text,
    type StyleProp,
    type ViewStyle,
} from "react-native";

type Props = {
  text: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

export function PrimaryButton({ text, onPress, style }: Props) {
  return (
    <Pressable style={[styles.button, style]} onPress={onPress}>
      <Text>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: Spacing.two,
    backgroundColor: Colors.accent,
    borderRadius: 8,
  },
});
