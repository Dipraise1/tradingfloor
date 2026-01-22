import { View, Text, SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useJournalStore } from "../../store/journalStore";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

export default function JournalScreen() {
  const { entries } = useJournalStore();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="light" />
      <View className="p-6 pt-2 border-b border-white/5 bg-background">
        <View className="flex-row justify-between items-start mb-6">
           <Text className="text-3xl font-extrabold text-white">Journal</Text>
           <TouchableOpacity onPress={() => router.push("/admin")}>
             <Ionicons name="shield-checkmark" size={24} color="#27272a" />
           </TouchableOpacity>
        </View>

        <View className="flex-row justify-between items-end mb-4">
          <View>
            <Text className="text-textMuted text-xs uppercase tracking-widest font-bold mb-1">Total Journaled</Text>
            <Text className="text-4xl font-extrabold text-white">{entries.length}</Text>
          </View>
          <View className="items-end">
            <Text className="text-textMuted text-xs uppercase tracking-widest font-bold mb-1">Win Rate</Text>
            <Text className="text-2xl font-bold text-accent">--%</Text>
          </View>
        </View>
      </View>

      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View className="bg-surface p-4 rounded-xl mb-3 border border-white/5 flex-row justify-between items-center shadow-lg">
            <View>
              <View className="flex-row items-center mb-1">
                <Text className="font-bold text-lg text-white mr-2">{item.pair}</Text>
                <View className="bg-surfaceHighlight px-2 rounded-md">
                  <Text className="text-[10px] text-textMuted font-bold uppercase">{item.session}</Text>
                </View>
              </View>
              <Text className="text-textMuted text-xs mb-2">{new Date(item.date).toLocaleDateString()}</Text>
              <View className="flex-row gap-2">
                 <Text className="text-xs text-primary font-medium">#{item.strategy}</Text>
              </View>
            </View>
            
            <View className={`w-12 h-12 rounded-full items-center justify-center ${
                item.result === 'WIN' ? 'bg-accent/10' : item.result === 'LOSS' ? 'bg-danger/10' : 'bg-gray-700/50'
              }`}>
              <Ionicons 
                name={item.result === 'WIN' ? 'arrow-up' : item.result === 'LOSS' ? 'arrow-down' : 'remove'} 
                size={20} 
                color={item.result === 'WIN' ? '#10b981' : item.result === 'LOSS' ? '#ef4444' : '#a1a1aa'} 
              />
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View className="items-center justify-center mt-20">
            <Ionicons name="journal-outline" size={64} color="#27272a" />
            <Text className="text-textMuted mt-4 font-medium">Your edge starts here.</Text>
            <Text className="text-textMuted/50 text-sm">Tap + to journal a trade.</Text>
          </View>
        }
      />

      {/* FAB */}
      <TouchableOpacity 
        onPress={() => router.push('/journal/entry')}
        className="absolute bottom-6 right-6 w-16 h-16 bg-primary rounded-full items-center justify-center shadow-2xl shadow-blue-500/30"
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
