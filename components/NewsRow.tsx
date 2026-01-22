import { View, Text } from "react-native";

export interface NewsEvent {
  id: string;
  time: string;
  currency: string;
  impact: 'HIGH' | 'MEDIUM' | 'LOW';
  title: string;
}

export default function NewsRow({ event }: { event: NewsEvent }) {
  const impactColor = event.impact === 'HIGH' ? 'bg-red-500' : event.impact === 'MEDIUM' ? 'bg-yellow-500' : 'bg-gray-500';

  return (
    <View className="flex-row items-center py-4 border-b border-white/5">
      <View className="w-16">
        <Text className="text-white font-bold">{event.time}</Text>
        <Text className="text-textMuted text-xs">{event.currency}</Text>
      </View>
      
      <View className={`w-1 h-8 rounded-full mr-4 ${impactColor}`} />
      
      <View className="flex-1">
        <Text className="text-white font-medium text-sm" numberOfLines={2}>{event.title}</Text>
      </View>
    </View>
  );
}
