import React from 'react';
import { View, Text } from 'react-native';
import { NutritionalCardProps } from '@utils/interfaces';

export const NutritionalCard = ({ title, value }: NutritionalCardProps) => (
  <View className="bg-gray-50 rounded-lg p-2 my-1">
    <Text className="text-gray-700 font-medium">{title}</Text>
    <Text className="text-gray-600">{value}</Text>
  </View>
);
