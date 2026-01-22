import { View, Text, SafeAreaView, FlatList, RefreshControl, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import SignalCard, { Signal } from "../../components/SignalCard";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../../lib/supabase";

export default function SignalsScreen() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [signals, setSignals] = useState<Signal[]>([]);

  const fetchSignals = async () => {
    try {
        const { data, error } = await supabase
            .from('signals')
            .select('*')
            .order('created_at', { ascending: false });
            
        if (error) throw error;
        setSignals(data || []);
    } catch (e) {
        console.error(e);
    } finally {
        setLoading(false);
        setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchSignals();
    
    // Realtime Subscription
    const subscription = supabase
      .channel('public:signals')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'signals' }, fetchSignals)
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchSignals();
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="light" />
      <View className="px-6 py-4 border-b border-white/5">
        <Text className="text-3xl font-extrabold text-white">Signals</Text>
        <Text className="text-textMuted">Live calls from the floor.</Text>
      </View>

      {loading ? (
        <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#2563EB" />
        </View>
      ) : (
        <FlatList
            data={signals}
            keyExtractor={item => item.id}
            contentContainerStyle={{ padding: 16 }}
            renderItem={({ item }) => <SignalCard signal={item} />}
            refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" />
            }
            ListEmptyComponent={
            <View className="items-center justify-center mt-20">
                <Ionicons name="radio-outline" size={64} color="#27272a" />
                <Text className="text-textMuted mt-4">Waiting for signals...</Text>
            </View>
            }
        />
      )}
    </SafeAreaView>
  );
}
