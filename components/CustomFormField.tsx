import { Text, View, TextInput } from "react-native";
import React from "react";

interface CustomFormFieldProps {
  title: string;
  value?: string;
  placeholder?: string;

  onChangeText?: (text: string) => void;
  [key: string]: any;
}

const CustomFormField: React.FC<CustomFormFieldProps> = ({
  title,
  value,
  placeholder,
  onChangeText,
  ...props
}) => {
  return (
    <View className="my-3 px-3 w-full">
      <View className="flex-row items-center mx-2 my-3">
        <Text
          className="text-base text-gray-100 font-pmedium"
          style={{ fontFamily: "Poppins-Medium" }}
        >
          {title}
        </Text>
        <Text className="text-red-500 text-base ml-1">*</Text>
      </View>
      <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#9ca3af"
          onChangeText={onChangeText}
          {...props}
        />
      </View>
    </View>
  );
};

export default CustomFormField;
