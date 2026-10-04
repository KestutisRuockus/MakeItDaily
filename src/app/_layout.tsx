import { NativeTabs } from "expo-router/build/native-tabs";
// import { NativeTabs } from "expo-router/unstable-native-tabs";

export default function TabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index" />
      <NativeTabs.Trigger name="timer" />
    </NativeTabs>
  );
}
