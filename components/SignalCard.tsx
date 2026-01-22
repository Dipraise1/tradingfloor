import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export interface Signal {
  id: string;
  pair: string;
  type: 'BUY' | 'SELL';
  style: 'SCALP' | 'DAY' | 'SWING';
  entry: number;
  tp: number;
  sl: number;
  risk: 'LOW' | 'MID' | 'HIGH';
  status: 'ACTIVE' | 'PENDING' | 'CLOSED';
  notes: string;
  timestamp: number;
}

interface SignalCardProps {
  signal: Signal;
}

export default function SignalCard({ signal }: SignalCardProps) {
  const isBuy = signal.type === 'BUY';
  const riskColors = {
    LOW: 'text-accent bg-accent/10',
    MID: 'text-yellow-500 bg-yellow-500/10',
    HIGH: 'text-danger bg-danger/10',
  };

  return (
    <View className="bg-surface rounded-3xl p-5 mb-4 border border-white/5">
      {/* Header: Pair & Status */}
      <View className="flex-row justify-between items-start mb-4">
        <View className="flex-row items-center gap-3">
          {/* Icon Box */}
          <View className={`w-12 h-12 rounded-2xl items-center justify-center ${isBuy ? 'bg-primary' : 'bg-surfaceHighlight'}`}>
             <Ionicons name={isBuy ? "arrow-up" : "arrow-down"} size={24} color={isBuy ? "white" : "#F92F60"} />
          </View>
          
          <View>
            <Text className="text-white font-bold text-xl tracking-tight">{signal.pair}</Text>
            <View className="flex-row items-center gap-2 mt-0.5">
               <View className={`px-2 py-0.5 rounded-md ${isBuy ? 'bg-primary/20' : 'bg-danger/10'}`}>
                 <Text className={`text-[10px] font-bold ${isBuy ? 'text-primary' : 'text-danger'}`}>{signal.type}</Text>
               </View>
               <Text className="text-textMuted text-xs font-semibold">{signal.style}</Text>
            </View>
          </View>
        </View>

        <View className={`px-3 py-1.5 rounded-full ${riskColors[signal.risk]}`}>
          <Text className="text-xs font-bold">{signal.risk} RISK</Text>
        </View>
      </View>

      {/* Data Grid - Bento Style */}
      <View className="flex-row gap-2 mb-4">
        {/* Entry */}
        <View className="flex-1 bg-surfaceHighlight rounded-2xl p-3 items-center">
            <Text className="text-textMuted text-[10px] font-bold uppercase tracking-wider mb-1">Entry</Text>
            <Text className="text-white font-bold text-base">{signal.entry}</Text>
        </View>
        
        {/* TP */}
        <View className="flex-1 bg-accent/10 rounded-2xl p-3 items-center border border-accent/20">
            <Text className="text-accent/80 text-[10px] font-bold uppercase tracking-wider mb-1">Target</Text>
            <Text className="text-accent font-bold text-base">{signal.tp}</Text>
        </View>

        {/* SL */}
        <View className="flex-1 bg-surfaceHighlight rounded-2xl p-3 items-center">
             <Text className="text-textMuted text-[10px] font-bold uppercase tracking-wider mb-1">Stop</Text>
             <Text className="text-textMuted font-bold text-base">{signal.sl}</Text>
        </View>
      </View>

      {/* Footer */}
      <View className="flex-row items-center justify-between pt-2">
         <Text className="text-textMuted text-xs font-medium flex-1 mr-4" numberOfLines={1}>
           {signal.notes}
         </Text>
         <TouchableOpacity 
            className="flex-row items-center justify-center bg-white px-4 py-2.5 rounded-xl"
            activeOpacity={0.8}
         >
           <Text className="text-black font-bold text-xs mr-1">COPY</Text>
           <Ionicons name="copy-outline" size={14} color="black" />
         </TouchableOpacity>
      </View>
    </View>
  );
}
