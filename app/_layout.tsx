import { Slot, useRouter, useSegments, useRootNavigationState } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import "../global.css";

export default function RootLayout() {
  const { user } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    if (!navigationState?.key || segments.length === 0) return;

    // Check if navigation is ready (segments is safe to use)
    // Note: "auth" is not a route group, so it's just "auth" not "(auth)"
    const inAuthGroup = segments[0] === "auth";
    
    // Use requestAnimationFrame to ensure Slot is mounted
    requestAnimationFrame(() => {
      try {
        if (!user && !inAuthGroup) {
          // Only navigate if not already on login page
          if (segments[0] !== "auth" || segments[1] !== "login") {
            router.replace("/auth/login");
          }
        } else if (user && inAuthGroup) {
          // If logged in and trying to access auth screens -> Redirect to Home
          router.replace("/(tabs)");
        }
      } catch (error) {
        // Navigation not ready yet, will retry on next render
        // Silently fail - navigation will happen on next effect run
      }
    });
  }, [user, segments, navigationState?.key, router]);

  return (
    <>
      <Slot />
      <StatusBar style="light" />
    </>
  );
}
