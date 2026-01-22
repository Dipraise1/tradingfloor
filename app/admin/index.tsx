import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

export default function AdminDashboard() {
  const router = useRouter();

  const MenuCard = ({ title, icon, route, color }: any) => (
    <TouchableOpacity 
      onPress={() => router.push(route)}
      className="bg-surface p-6 rounded-3xl border border-white/5 mb-4 flex-row items-center justify-between"
    >
      <View className="flex-row items-center gap-4">
        <View className={`w-12 h-12 rounded-2xl items-center justify-center ${color}`}>
          <Ionicons name={icon} size={24} color="white" />
        </View>
        <View>
           <Text className="text-white font-bold text-xl">{title}</Text>
           <Text className="text-textMuted text-sm">Manage {title.toLowerCase()}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#71717A" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-background px-6">
      <StatusBar style="light" />
      <View className="mt-6">
        <Text className="text-textMuted font-bold uppercase tracking-widest mb-6">Control Center</Text>
        
        <MenuCard 
          title="Signals" 
          icon="pulse" 
          route="/admin/post-signal" 
          color="bg-primary"
        />
        
        <MenuCard 
          title="News" 
          icon="newspaper" 
          route="/admin/post-news" 
          color="bg-danger"
        />

        <MenuCard 
          title="Users" 
          icon="people" 
          route="/admin/users" 
          color="bg-accent"
        />
      </View>
    </SafeAreaView>
  );
}
