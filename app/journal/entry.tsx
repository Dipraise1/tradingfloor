import { useState } from "react";
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import * as ImagePicker from 'expo-image-picker';
import { useJournalStore } from "../../store/journalStore";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

export default function JournalEntryScreen() {
  const router = useRouter();
  const { strategies, sessions, pairs, addEntry } = useJournalStore();
  
  const [selectedPair, setSelectedPair] = useState(pairs[0]);
  const [selectedSession, setSelectedSession] = useState(sessions[0]);
  const [selectedStrategy, setSelectedStrategy] = useState(strategies[0]);
  const [result, setResult] = useState<'WIN' | 'LOSS' | 'BE'>('WIN');
  const [images, setImages] = useState<string[]>([]);
  const [price, setPrice] = useState("");
  const [notes, setNotes] = useState("");

  const pickImage = async () => {
    if (images.length >= 3) return;
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const handleSave = () => {
    addEntry({
      id: Date.now().toString(),
      date: Date.now(),
      pair: selectedPair,
      session: selectedSession,
      strategy: selectedStrategy,
      result: result,
      entryPrice: parseFloat(price),
      notes: notes,
      images: images
    });
    router.back();
  };

  const renderSelector = (label: string, value: string, items: string[], onSelect: (val: string) => void) => (
    <View className="mb-4">
      <Text className="text-textMuted text-xs uppercase font-bold mb-2 tracking-wider">{label}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
        {items.map(item => (
          <TouchableOpacity 
            key={item}
            onPress={() => onSelect(item)}
            className={`px-4 py-2 rounded-lg mr-2 border ${value === item ? 'bg-surfaceHighlight border-primary' : 'bg-surface border-white/5'}`}
          >
            <Text className={value === item ? 'text-primary font-bold' : 'text-textMuted'}>{item}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="light" />
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-white/5">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={24} color="#fff" />
        </TouchableOpacity>
        <Text className="text-white font-bold text-lg">New Journal</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text className="text-primary font-bold">Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="p-4">
        {/* Result Toggle */}
        <View className="mb-6 flex-row bg-surface p-1 rounded-xl">
          {['WIN', 'LOSS', 'BE'].map(r => (
            <TouchableOpacity 
              key={r}
              onPress={() => setResult(r as any)}
              className={`flex-1 py-3 items-center rounded-lg ${
                result === r 
                  ? (r === 'WIN' ? 'bg-accent/20' : r === 'LOSS' ? 'bg-danger/20' : 'bg-gray-700') 
                  : 'bg-transparent'
              }`}
            >
              <Text className={`font-black tracking-widest ${
                result === r 
                  ? (r === 'WIN' ? 'text-accent' : r === 'LOSS' ? 'text-danger' : 'text-gray-300') 
                  : 'text-textMuted'
              }`}>{r}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {renderSelector("Session", selectedSession, sessions, setSelectedSession)}
        {renderSelector("Pair", selectedPair, pairs, setSelectedPair)}
        {renderSelector("Strategy", selectedStrategy, strategies, setSelectedStrategy)}

        <View className="mt-2">
            <Input label="Entry Price" value={price} onChangeText={setPrice} keyboardType="numeric" placeholder="0.00" />
            <Input label="Notes" value={notes} onChangeText={setNotes} multiline numberOfLines={3} placeholder="What was your confluence?" />
        </View>

        <View className="mb-8">
          <Text className="text-textMuted text-xs uppercase font-bold mb-2 tracking-wider">Screenshots ({images.length}/3)</Text>
          <ScrollView horizontal className="flex-row gap-2">
            <TouchableOpacity onPress={pickImage} className="w-24 h-24 bg-surface border border-white/10 border-dashed rounded-xl justify-center items-center">
              <Ionicons name="camera-outline" size={24} color="#52525b" />
            </TouchableOpacity>
            {images.map((img, idx) => (
              <Image key={idx} source={{ uri: img }} className="w-24 h-24 rounded-xl ml-2 bg-gray-800" resizeMode="cover" />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
