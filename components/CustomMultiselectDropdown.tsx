import { Text, View, TouchableOpacity, Modal, FlatList } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

interface CustomMultiselectDropdownProps {
  title: string;
  options: { label: string; value: string }[];
  selectedValues: string[];
  onSelect: (values: string[]) => void;
  placeholder?: string;
  required?: boolean;
  [key: string]: any;
}

const CustomMultiselectDropdown: React.FC<CustomMultiselectDropdownProps> = ({
  title,
  options,
  selectedValues = [],
  onSelect,
  placeholder = "Select options",
  required = false,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleItem = (value: string) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value) 
      : [...selectedValues, value]; 
    onSelect(newValues);
  };

  const displayText =
    selectedValues.length > 0
      ? options
          .filter((opt) => selectedValues.includes(opt.value))
          .map((opt) => opt.label)
          .join(", ")
      : placeholder;

  return (
    <View className="my-3 px-3 w-full">
      <View className="flex-row items-center mx-2 my-3">
        <Text
          className="text-base text-gray-100 font-pmedium"
          style={{ fontFamily: "Poppins-Medium" }}
        >
          {title}
        </Text>
        {<Text className="text-red-500 text-base ml-1">*</Text>}
      </View>

      <TouchableOpacity
        className="w-full min-h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 flex flex-row items-center justify-between"
        onPress={() => setIsVisible(true)}
      >
        <Text
          className="text-white font-psemibold text-base flex-1"
          numberOfLines={1}
        >
          {displayText}
        </Text>
        <Ionicons name="chevron-down" size={20} color="white" />
      </TouchableOpacity>

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
                  className={`px-4 py-3 flex-row items-center ${
                    selectedValues.includes(item.value) ? "bg-secondary/20" : ""
                  }`}
                  onPress={() => toggleItem(item.value)}
                >
                  <View
                    className={`w-5 h-5 rounded-md mr-3 border-2 ${
                      selectedValues.includes(item.value)
                        ? "bg-secondary border-secondary"
                        : "border-gray-400"
                    }`}
                  />
                  <Text className="text-white font-psemibold text-base">
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => (
                <View className="h-px bg-black-200" />
              )}
            />
            <TouchableOpacity
              className="p-4 bg-secondary items-center rounded-b-xl"
              onPress={() => setIsVisible(false)}
            >
              <Text className="text-white font-psemibold">Done</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default CustomMultiselectDropdown;
