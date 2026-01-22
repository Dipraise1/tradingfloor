import { Stack } from "expo-router";

export default function AdminLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#050505", // background
        },
        headerTintColor: "#FFFFFF", // text
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerShadowVisible: false, // Flat look
        contentStyle: { backgroundColor: "#050505" }
      }}
    >
      <Stack.Screen name="index" options={{ title: "Admin Board" }} />
      <Stack.Screen name="post-signal" options={{ title: "New Signal" }} />
      <Stack.Screen name="post-news" options={{ title: "Post News" }} />
    </Stack>
  );
}
