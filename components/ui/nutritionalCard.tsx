import React from 'react';
import { View, Text } from 'react-native';
import { NutritionalCardProps } from '@utils/interfaces';

export const NutritionalCard = ({ title, value }: NutritionalCardProps) => (
  <View className="rounded-lg">
    <Text className="text-gray-700 font-bold">
      🥙 {title.charAt(0).toUpperCase() + title.slice(1)}
    </Text>
    <Text className="text-gray-600">{value}</Text>
  </View>
);
