import { Colors } from "@/constants/theme";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="intervals-history"
        options={{
          title: "Intervals History",
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerTintColor: Colors.accent,
          headerTitleStyle: {
            color: Colors.accent,
          },
        }}
      />
    </Stack>
  );
}
