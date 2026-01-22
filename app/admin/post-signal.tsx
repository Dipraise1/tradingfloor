import { useState } from "react";
import { View, Text, ScrollView, Alert, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { supabase } from "../../lib/supabase";

export default function PostSignalScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Form State
  const [pair, setPair] = useState("");
  const [type, setType] = useState<"BUY" | "SELL">("BUY");
  const [style, setStyle] = useState<"SCALP" | "DAY" | "SWING">("SCALP");
  const [entry, setEntry] = useState("");
  const [tp, setTp] = useState("");
  const [sl, setSl] = useState("");
  const [risk, setRisk] = useState<"LOW" | "MID" | "HIGH">("MID");
  const [notes, setNotes] = useState("");

  const handlePost = async () => {
    if (!pair || !entry || !tp || !sl) {
        Alert.alert("Missing Fields", "Please fill all required fields");
        return;
    }

    setLoading(true);
    
    // Insert into Supabase
    const { error } = await supabase.from('signals').insert({
        pair: pair.toUpperCase(),
        type,
        style,
        entry: parseFloat(entry),
        tp: parseFloat(tp),
        sl: parseFloat(sl),
        risk,
        status: 'ACTIVE',
        notes
    });

    setLoading(false);

    if (error) {
        Alert.alert("Error", error.message);
    } else {
        Alert.alert("Success", "Signal Posted Live!");
        router.back();
    }
  };

  const SelectionPill = ({ label, selected, onPress, color = "bg-primary" }: any) => (
    <TouchableOpacity 
        onPress={onPress}
        className={`px-4 py-2 rounded-xl border ${selected ? `${color} border-transparent` : 'bg-surface border-white/10'} mr-2`}
    >
        <Text className={`font-bold ${selected ? 'text-white' : 'text-textMuted'}`}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView className="flex-1 bg-background px-6 pt-4">
      
      {/* PAIR & TYPE */}
      <View className="mb-6">
        <Text className="text-textMuted font-bold mb-2">Metadata</Text>
        <Input placeholder="Pair (e.g. XAUUSD)" value={pair} onChangeText={setPair} autoCapitalize="characters" />
        
        <View className="flex-row mt-4">
            <SelectionPill label="BUY" selected={type === 'BUY'} onPress={() => setType('BUY')} color="bg-primary" />
            <SelectionPill label="SELL" selected={type === 'SELL'} onPress={() => setType('SELL')} color="bg-danger" />
        </View>
      </View>

      {/* NUMBERS */}
      <View className="mb-6">
        <Text className="text-textMuted font-bold mb-2">Details</Text>
        <View className="flex-row gap-2">
             <View className="flex-1">
                <Input placeholder="Entry" value={entry} onChangeText={setEntry} keyboardType="numeric" />
             </View>
             <View className="flex-1">
                <Input placeholder="TP" value={tp} onChangeText={setTp} keyboardType="numeric" />
             </View>
             <View className="flex-1">
                <Input placeholder="SL" value={sl} onChangeText={setSl} keyboardType="numeric" />
             </View>
        </View>
      </View>

      {/* STYLE & RISK */}
      <View className="mb-6">
        <Text className="text-textMuted font-bold mb-2">Strategy</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
            {['SCALP', 'DAY', 'SWING'].map((s) => (
                <SelectionPill key={s} label={s} selected={style === s} onPress={() => setStyle(s as any)} />
            ))}
        </ScrollView>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {['LOW', 'MID', 'HIGH'].map((r) => (
                <SelectionPill key={r} label={r} selected={risk === r} onPress={() => setRisk(r as any)} color="bg-accent" />
            ))}
        </ScrollView>
      </View>

      <Text className="text-textMuted font-bold mb-2">Analysis</Text>
      <Input placeholder="Notes..." value={notes} onChangeText={setNotes} multiline numberOfLines={3} style={{ height: 100 }} />

      <Button 
        title={loading ? "Posting..." : "Post Signal"} 
        onPress={handlePost} 
        disabled={loading}
        className="mt-6 mb-10"
      />

    </ScrollView>
  );
}
