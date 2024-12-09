import React from 'react';
import { Image, Text } from 'react-native';

export const ImageDisplay = ({ uri }: { uri: string }) => {
  return uri ? (
    <Image source={{ uri }} className="size-60 self-center rounded-lg m-20" />
  ) : (
    <Text className="text-gray-500 text-lg mb-5">
      Select an image to analyze
    </Text>
  );
};
