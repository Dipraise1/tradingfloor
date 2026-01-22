import { TouchableOpacity, Text, View } from "react-native";
import { clsx } from "clsx";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
}

export default function Button({ 
  title, 
  onPress, 
  variant = "primary", 
  size = "md",
  className = "",
  disabled = false
}: ButtonProps) {
  
  const baseStyle = "items-center justify-center rounded-xl flex-row";
  
  const variants = {
    primary: "bg-primary shadow-lg shadow-blue-500/20",
    secondary: "bg-surfaceHighlight border border-white/5",
    outline: "bg-transparent border border-white/20",
    ghost: "bg-transparent"
  };

  const sizes = {
    sm: "py-2 px-4",
    md: "py-4 px-6",
    lg: "py-5 px-8"
  };

  const textStyles = {
    primary: "text-white font-bold text-base",
    secondary: "text-text font-semibold text-base",
    outline: "text-text font-medium text-base",
    ghost: "text-textMuted font-medium text-sm"
  };

  return (
    <TouchableOpacity 
      activeOpacity={0.7}
      className={clsx(
        baseStyle, 
        variants[variant], 
        sizes[size], 
        disabled && "opacity-50",
        className
      )} 
      onPress={onPress}
      disabled={disabled}
    >
      <Text className={clsx(textStyles[variant])}>{title}</Text>
    </TouchableOpacity>
  );
}
