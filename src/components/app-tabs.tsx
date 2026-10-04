import { NativeTabs } from "expo-router/build/native-tabs";

export default function AppTabs() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index" />
      <NativeTabs.Trigger name="timer" />
    </NativeTabs>
  );
}
