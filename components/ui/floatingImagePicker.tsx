import React, { useState } from 'react';
import { TouchableOpacity, Text, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ImagePickerAssetWithBase64 } from '@utils/types';
import { historyService } from '@data/repository/historyService';
import { ClarifaiService } from '@data/services/apiAI';
import { OpenFoodService } from '@data/services/apiOpenFood';
import { HistoryItem } from '@data/models/foodHistory';

interface FloatingImagePickerProps {
  onImageSelected: (uri: string) => void;
  onNutritionalInfo: (info: Record<string, string>) => void;
}

export default function FloatingImagePicker({
  onImageSelected,
  onNutritionalInfo,
}: FloatingImagePickerProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission to access media library is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      base64: true,
    });

    if (
      !pickerResult.canceled &&
      pickerResult.assets &&
      pickerResult.assets.length > 0
    ) {
      const asset = pickerResult.assets[0] as ImagePickerAssetWithBase64;

      if (asset.uri && asset.base64) {
        onImageSelected(asset.uri);
        analyzeImage(asset);
      } else {
        Alert.alert('Could not retrieve image data.');
      }
    }
  };

  const analyzeImage = async (asset: ImagePickerAssetWithBase64) => {
    setLoading(true);
    try {
      const clarifaiService = new ClarifaiService();
      const concepts = await clarifaiService.analyzeImage(asset.base64!);
      if (concepts && concepts.size > 0) {
        const topConcept = concepts.get('concepts')[0];
        const foodName = topConcept.name;
        const openFoodService = new OpenFoodService();
        const nutritionalData = await openFoodService.getNutritionalInfo(
          foodName
        );
        if (nutritionalData) {
          onNutritionalInfo(nutritionalData);
          const newHistoryItem = new HistoryItem(
            Date.now(),
            new Date(),
            nutritionalData,
            asset.uri
          );
          await historyService.addHistory(newHistoryItem);
        } else {
          Alert.alert('Nutritional information not found.');
        }
      } else {
        Alert.alert('No concepts found.');
      }
    } catch (error) {
      Alert.alert('Error analyzing image.');
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <TouchableOpacity
      className="absolute bottom-4 right-4 w-16 h-16 bg-blue-500 rounded-full justify-center items-center shadow-lg"
      onPress={pickImage}
      disabled={loading}
    >
      <Text className="text-white text-3xl">+</Text>
    </TouchableOpacity>
  );
}
