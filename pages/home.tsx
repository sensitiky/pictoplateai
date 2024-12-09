import React, { useContext, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { UserContext } from '@utils/helpers';
import FloatingImagePicker from '@components/ui/floatingImagePicker';
import { NutritionalCard } from '@components/ui/nutritionalCard';
import { ImageDisplay } from '@components/ui/imageDisplay';

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [nutritionalInfo, setNutritionalInfo] = useState<Record<
    string,
    string
  > | null>(null);
  const { user } = useContext(UserContext);

  const handleImageSelected = (uri: string) => {
    setSelectedImage(uri);
  };

  const handleNutritionalInfo = (info: Record<string, string>) => {
    setNutritionalInfo(info);
  };

  return (
    <View className="flex-1 bg-white">
      <Text className="text-3xl text-center mt-20 text-gray-400">
        Welcome {user?.name}
      </Text>
      <View className="flex-1 justify-center items-center">
        <ImageDisplay uri={selectedImage as string} />
        {nutritionalInfo ? (
          <ScrollView className="flex-1 w-full">
            {Object.entries(nutritionalInfo).map(([key, value]) => (
              <NutritionalCard key={key} value={value} title={key} />
            ))}
          </ScrollView>
        ) : null}
      </View>

      <FloatingImagePicker
        onImageSelected={handleImageSelected}
        onNutritionalInfo={handleNutritionalInfo}
      />
    </View>
  );
}
