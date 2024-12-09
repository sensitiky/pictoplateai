import React, { useContext, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { UserContext } from '@utils/helpers';
import FloatingImagePicker from '@components/ui/floatingImagePicker';
import { NutritionalCard } from '@components/ui/nutritionalCard';
import { ImageDisplay } from '@components/ui/imageDisplay';
import Icon from 'react-native-vector-icons/Entypo';

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [nutritionalInfo, setNutritionalInfo] = useState<Record<
    string,
    string
  > | null>(null);
  const { user } = useContext(UserContext);

  const handleImageSelected = (uri: string) => {
    setSelectedImage(uri);
  };

  const handleNutritionalInfo = (info: Record<string, string> | null) => {
    if (info) {
      setNutritionalInfo(info);
    } else {
      setNutritionalInfo(null);
    }
    setAnalyzing(false);
  };
  const handleStartAnalysis = () => {
    setAnalyzing(true);
  };

  return (
    <View className="flex-1 bg-white">
      <Text className="text-3xl text-center mt-20 text-gray-400">
        Welcome {user?.name}
      </Text>
      <View className="flex-1 justify-center items-center">
        <ImageDisplay uri={selectedImage as string} />
        {analyzing && (
          <View className="items-center justify-center">
            <ActivityIndicator size="large" color="#3b82f6" />
            <Text className="text-sm text-[#3b28f6]">Analyzing image</Text>
          </View>
        )}
        {nutritionalInfo ? (
          <ScrollView className="flex-1 w-full px-5">
            {Object.entries(nutritionalInfo).map(([key, value]) => (
              <NutritionalCard key={key} value={value} title={key} />
            ))}
            <View className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
              <Icon
                name="light-bulb"
                color={'#fde047'}
                className="text-[#fde047]"
              />
              <Text className="text-base text-gray-600">
                This is an approximate result and should not be considered
                definitive.
              </Text>
              <Text className="mt-2 text-sm text-blue-500">
                Tip: For more accurate results, contact with a professional.
              </Text>
            </View>
          </ScrollView>
        ) : selectedImage && !analyzing ? (
          <Text className="text-[#6b7280] text-center">
            Nutritional information not found.
          </Text>
        ) : null}
      </View>

      <FloatingImagePicker
        onImageSelected={handleImageSelected}
        onNutritionalInfo={handleNutritionalInfo}
        onStartAnalysis={handleStartAnalysis}
      />
    </View>
  );
}
