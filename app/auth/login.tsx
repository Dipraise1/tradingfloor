import { useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { useRouter, Link } from "expo-router";
import { useAuthStore } from "../../store/authStore";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function LoginScreen() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Missing Fields", "Please enter both email and password.");
      return;
    }

    const success = await login(email, password);
    // Navigation is handled by Root Layout protection usually, 
    // but explicit replace ensures distinct action
    if (success) {
      router.replace("/(tabs)"); 
    } else {
      Alert.alert("Login Failed", "Invalid credentials.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background justify-center px-6">
      <StatusBar style="light" />
      
      <Animated.View entering={FadeInDown.delay(200).duration(500)}>
        <Text className="text-4xl font-extrabold text-white text-center mb-2">Welcome Back</Text>
        <Text className="text-textMuted text-center mb-10">Enter the Floor.</Text>

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

        <Button 
          title={isLoading ? "Logging in..." : "Login"} 
          onPress={handleLogin} 
          disabled={isLoading}
          className="mt-4"
        />

        <View className="flex-row justify-center mt-6">
          <Text className="text-textMuted">Don't have an account? </Text>
          <Link href="/auth/signup" asChild>
            <TouchableOpacity>
              <Text className="text-primary font-bold">Sign Up</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}
