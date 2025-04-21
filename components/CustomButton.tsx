import { Text, TouchableOpacity } from "react-native";
import React from "react";
import "../global.css";
interface CustomButtonProps {
  onPress: () => void;
}
const CustomButton: React.FC<CustomButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      className="bg-secondary p-5 rounded-full items-center justify-center w-20 h-20 absolute bottom-6 right-7"
      onPress={onPress}
    >
      <Text className="text-white text-3xl">→</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
