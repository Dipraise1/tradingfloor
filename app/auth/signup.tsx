import { useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, Alert } from "react-native";
import { useRouter, Link } from "expo-router";
import { useAuthStore } from "../../store/authStore";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function SignupScreen() {
  const router = useRouter();
  const { signup, isLoading } = useAuthStore();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Missing Fields", "Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    const success = await signup(email, password);
    if (success) {
      router.replace("/setup"); // Go to Setup Wizard after signup
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background justify-center px-6">
      <StatusBar style="light" />
      
      <Animated.View entering={FadeInDown.delay(200).duration(500)}>
        <Text className="text-4xl font-extrabold text-white text-center mb-2">Join The Floor</Text>
        <Text className="text-textMuted text-center mb-10">Start your journey to funding.</Text>

        <Input 
          label="Email" 
          placeholder="trader@example.com"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Input 
          label="Password" 
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Input 
          label="Confirm Password" 
          placeholder="••••••••"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <Button 
          title={isLoading ? "Creating Account..." : "Create Account"} 
          onPress={handleSignup} 
          disabled={isLoading}
          className="mt-4"
        />

        <View className="flex-row justify-center mt-6">
          <Text className="text-textMuted">Already have an account? </Text>
          <Link href="/auth/login" asChild>
            <TouchableOpacity>
              <Text className="text-primary font-bold">Login</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}
