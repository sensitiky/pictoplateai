import { faqData } from '@constants/variousData';
import { FAQProps } from '@utils/interfaces';
import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function FAQ({ visible, onClose }: FAQProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <Modal visible={visible} animationType="slide">
      <TouchableOpacity onPress={onClose} className="mt-4 py-2">
        <Ionicons className="ml-2" name="arrow-back" size={25} color="#000" />
      </TouchableOpacity>
      <ScrollView className="flex-1 bg-white p-4">
        <Text className="text-2xl font-bold text-center mb-6">
          Frequently Asked Questions
        </Text>
        {faqData.map((item, index) => (
          <View key={index} className="mb-4 bg-gray-100 rounded-lg shadow-md">
            <TouchableOpacity
              className="flex-row justify-between items-center p-4"
              onPress={() => toggleAccordion(index)}
            >
              <Text className="text-lg font-semibold">{item.question}</Text>
              <Ionicons
                name={activeIndex === index ? 'chevron-up' : 'chevron-down'}
                size={24}
                color="#4B5563"
              />
            </TouchableOpacity>
            {activeIndex === index && (
              <View className="px-4 pb-4">
                <Text className="text-gray-700">{item.answer}</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </Modal>
  );
}
