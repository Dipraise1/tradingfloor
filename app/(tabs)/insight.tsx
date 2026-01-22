import { View, Text, SafeAreaView, ScrollView, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import NewsRow, { NewsEvent } from "../../components/NewsRow";

// Mock Data
const WEEKLY_BIAS = {
  title: "Bearish Dollar, Bullish Gold",
  description: "DXY is approaching a key monthly resistance. We expect a rejection this week leading to a rally in XAUUSD and major pairs. Keep an eye on the 103.500 level.",
  imageUrl: "https://images.unsplash.com/photo-1611974765270-ca12586343bb?q=80&w=3000&auto=format&fit=crop"
};

const NEWS_EVENTS: NewsEvent[] = [
  { id: '1', time: '13:30', currency: 'USD', impact: 'HIGH', title: 'Core PPI m/m' },
  { id: '2', time: '13:30', currency: 'USD', impact: 'HIGH', title: 'Unemployment Claims' },
  { id: '3', time: '15:00', currency: 'USD', impact: 'MEDIUM', title: 'Existing Home Sales' },
  { id: '4', time: '07:00', currency: 'GBP', impact: 'HIGH', title: 'CPI y/y' },
];

export default function InsightScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="light" />
      <ScrollView>
        <View className="px-6 py-4">
          <Text className="text-3xl font-extrabold text-white mb-6">Insight</Text>
          
          {/* Weekly Bias Hero */}
          <View className="mb-8">
            <Text className="text-textMuted uppercase text-xs font-bold tracking-widest mb-3">Weekly Bias</Text>
            <View className="bg-surface rounded-2xl overflow-hidden border border-white/5">
              <Image 
                source={{ uri: WEEKLY_BIAS.imageUrl }} 
                className="w-full h-40 bg-surfaceHighlight"
                resizeMode="cover"
              />
              <View className="p-4">
                <Text className="text-white font-bold text-xl mb-2">{WEEKLY_BIAS.title}</Text>
                <Text className="text-textMuted leading-5">{WEEKLY_BIAS.description}</Text>
              </View>
            </View>
          </View>

          {/* Impact News */}
          <View>
            <Text className="text-textMuted uppercase text-xs font-bold tracking-widest mb-3">High Impact News</Text>
            <View className="bg-surface rounded-xl border border-white/5 px-4">
              {NEWS_EVENTS.map(event => (
                <NewsRow key={event.id} event={event} />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
