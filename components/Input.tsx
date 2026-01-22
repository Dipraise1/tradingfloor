import { TextInput as RNTextInput, View, Text, TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export default function Input({ label, error, className = "", ...props }: InputProps) {
  return (
    <View className="mb-5 w-full">
      {label && <Text className="text-textMuted mb-2 font-medium text-sm uppercase tracking-wider">{label}</Text>}
      <RNTextInput
        className={`bg-surface/50 p-4 rounded-xl border border-white/10 text-text placeholder:text-textMuted/50 ${className}`}
        placeholderTextColor="#52525b"
        {...props}
      />
      {error && <Text className="text-danger text-sm mt-1 ml-1">{error}</Text>}
    </View>
  );
}
