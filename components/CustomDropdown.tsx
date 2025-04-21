import { Text, View, TouchableOpacity, Modal, FlatList } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
interface CustomDropdownProps {
  title: string;
  options: { label: string; value: string }[];
  selectedValue?: string;
  onSelect: (value: string) => void;
  placeholder?: string;
  [key: string]: any;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  title,
  options,
  selectedValue,
  onSelect,
  placeholder = "Select an option",
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const selectedLabel =
    options.find((opt) => opt.value === selectedValue)?.label || placeholder;

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

      <TouchableOpacity
        className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 flex flex-row items-center justify-between"
        onPress={() => setIsVisible(true)}
      >
        <Text
          className="text-white font-psemibold text-base"
          numberOfLines={1} 
          ellipsizeMode="tail"
          style={{ maxWidth: "85%" }} 
        >
          {selectedLabel}
        </Text>

        <Ionicons name="chevron-down" size={20} color="white" />
        <Modal
          visible={isVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setIsVisible(false)}
        >
          <TouchableOpacity
            className="flex-1 bg-black/50 justify-center items-center"
            activeOpacity={1}
            onPress={() => setIsVisible(false)}
          >
            <View className="w-4/5 bg-black-100 rounded-2xl border-2 border-black-200 max-h-[60%]">
              <FlatList
                data={options}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    className={`px-4 py-3 ${
                      selectedValue === item.value ? "bg-secondary/20" : ""
                    }`}
                    onPress={() => {
                      onSelect(item.value);
                      setIsVisible(false);
                    }}
                  >
                    <Text className="text-white font-psemibold text-base">
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => (
                  <View className="h-px bg-black-200" />
                )}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </TouchableOpacity>
    </View>
  );
};

export default CustomDropdown;
