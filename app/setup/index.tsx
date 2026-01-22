import { useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { useJournalStore } from "../../store/journalStore";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeIn, SlideInRight, SlideOutLeft } from "react-native-reanimated";

const STEPS = ["Welcome", "Risk", "Strategies", "Focus"];
const { width } = Dimensions.get('window');

export default function SetupScreen() {
  const router = useRouter();
  const { addStrategy, addSession, addPair, setMaxRisk } = useJournalStore();
  
  const [step, setStep] = useState(0);
  
  // State for inputs
  const [risk, setRiskInput] = useState("2");
  
  // Tag Inputs
  const [newStrategy, setNewStrategy] = useState("");
  const [strategies, setStrategies] = useState<string[]>([]);
  
  const [newPair, setNewPair] = useState("");
  const [pairs, setPairs] = useState<string[]>(["EURUSD", "XAUUSD"]); // Defaults

  const [newSession, setNewSession] = useState("");
  const [sessions, setSessions] = useState<string[]>(["London", "New York"]); // Defaults

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      finishSetup();
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const finishSetup = () => {
    // Save all data to store
    setMaxRisk(parseFloat(risk) || 2);
    strategies.forEach(s => addStrategy(s));
    sessions.forEach(s => addSession(s));
    pairs.forEach(p => addPair(p));
    
    // Navigate to dashboard
    router.replace("/(tabs)");
  };

  // Helpers for tags
  const addTag = (text: string, list: string[], setList: (l: string[]) => void, clearInput: () => void) => {
    if (text.trim().length > 0 && !list.includes(text.trim())) {
      setList([...list, text.trim()]);
    }
    clearInput();
  };

  const removeTag = (text: string, list: string[], setList: (l: string[]) => void) => {
    setList(list.filter(item => item !== text));
  };

  const renderWelcome = () => (
    <View className="flex-1 justify-center items-center">
      <Text className="text-4xl font-bold text-white text-center mb-2">Welcome to</Text>
      <Text className="text-5xl font-extrabold text-primary text-center mb-6">The Floor</Text>
      <Text className="text-textMuted text-center text-lg max-w-[80%]">
        Build your edge. Journal your trades in 60 seconds. Master your psychology.
      </Text>
    </View>
  );

  const renderRisk = () => (
    <View className="flex-1 justify-center">
      <Text className="text-3xl font-bold text-white mb-2">Rule #1</Text>
      <Text className="text-xl text-textMuted mb-8">What is your Max Risk per day?</Text>
      
      <View className="flex-row items-center justify-center">
        <Input 
          value={risk}
          onChangeText={setRiskInput}
          keyboardType="numeric"
          className="text-center text-3xl font-bold w-32"
          maxLength={3}
        />
        <Text className="text-3xl font-bold text-white ml-2">%</Text>
      </View>
      
      <Text className="text-center text-textMuted mt-4">
        We will remind you if you breach this.
      </Text>
    </View>
  );

  const renderStrategies = () => (
    <View className="flex-1">
      <Text className="text-3xl font-bold text-white mb-2">Your Playbook</Text>
      <Text className="text-textMuted mb-6">What setups do you trade?</Text>
      
      <View className="flex-row items-end gap-2 mb-6">
        <View className="flex-1">
          <Input 
            placeholder="e.g. Pullback, Break & Retest" 
            value={newStrategy}
            onChangeText={setNewStrategy}
            onSubmitEditing={() => addTag(newStrategy, strategies, setStrategies, () => setNewStrategy(""))}
          />
        </View>
        <Button 
          title="+" 
          onPress={() => addTag(newStrategy, strategies, setStrategies, () => setNewStrategy(""))} 
          variant="secondary"
          className="mb-5 h-[58px]" // Align with input
        />
      </View>

      <View className="flex-row flex-wrap gap-2">
        {strategies.map(s => (
          <TouchableOpacity 
            key={s} 
            onPress={() => removeTag(s, strategies, setStrategies)}
            className="bg-surfaceHighlight px-4 py-2 rounded-full border border-white/10 flex-row items-center"
          >
            <Text className="text-white font-medium mr-2">{s}</Text>
            <Text className="text-textMuted text-xs">✕</Text>
          </TouchableOpacity>
        ))}
        {strategies.length === 0 && <Text className="text-textMuted italic">No strategies added yet.</Text>}
      </View>
    </View>
  );

  const renderFocus = () => (
    <View className="flex-1">
      <Text className="text-3xl font-bold text-white mb-2">Your Focus</Text>
      <Text className="text-textMuted mb-6">What do you trade and when?</Text>
      
      {/* Sessions */}
      <Text className="text-white font-semibold mb-2">Sessions</Text>
      <View className="flex-row flex-wrap gap-2 mb-6">
        {["London", "New York", "Asian"].map(s => {
          const isSelected = sessions.includes(s);
          return (
            <TouchableOpacity 
              key={s}
              onPress={() => isSelected ? removeTag(s, sessions, setSessions) : addTag(s, sessions, setSessions, () => {})}
              className={`px-4 py-2 rounded-full border ${isSelected ? 'bg-primary border-primary' : 'bg-surface border-white/10'}`}
            >
              <Text className={isSelected ? "text-white font-bold" : "text-textMuted"}>{s}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Pairs */}
      <Text className="text-white font-semibold mb-2 mt-4">Pairs / Assets</Text>
      <View className="flex-row items-center gap-2 mb-4">
        <Input 
            placeholder="e.g. US30, BTCUSD" 
            value={newPair}
            onChangeText={setNewPair}
            onSubmitEditing={() => addTag(newPair, pairs, setPairs, () => setNewPair(""))}
            className="flex-1"
          />
        <Button 
          title="+" 
          onPress={() => addTag(newPair, pairs, setPairs, () => setNewPair(""))} 
          variant="secondary"
          className="mb-5 h-[58px]"
        />
      </View>
      <View className="flex-row flex-wrap gap-2">
        {pairs.map(p => (
          <TouchableOpacity 
            key={p}
            onPress={() => removeTag(p, pairs, setPairs)}
            className="bg-surfaceHighlight px-3 py-1 rounded-md border border-white/10"
          >
            <Text className="text-white text-sm">{p}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="light" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <View className="flex-1 px-6 pt-10">
          
          {/* Progress Bar */}
          <View className="h-1 bg-surfaceHighlight w-full rounded-full mb-10 overflow-hidden">
            <View 
              className="h-full bg-primary" 
              style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} 
            />
          </View>
          
          <Animated.View exiting={SlideOutLeft} entering={FadeIn} className="flex-1" key={step}>
            {step === 0 && renderWelcome()}
            {step === 1 && renderRisk()}
            {step === 2 && renderStrategies()}
            {step === 3 && renderFocus()}
          </Animated.View>

          <View className="mb-6 flex-row gap-4">
            {step > 0 && (
               <Button title="Back" onPress={handleBack} variant="ghost" className="flex-1" />
            )}
            <Button 
              title={step === STEPS.length - 1 ? "Start Trading" : "Next"} 
              onPress={handleNext} 
              variant="primary" 
              className="flex-1"
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
