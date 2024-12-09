import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ClarifaiService } from '@data/services/apiAI';
import { OpenFoodService } from '@data/services/apiOpenFood';
import { logoutUser } from '@data/services/firebase';
import { UserContext } from '@utils/helpers';
import { ImagePickerAssetWithBase64 } from '@utils/types';
import { NutritionalCard } from '@components/ui/nutritionalCard';
import { HistoryItem } from '@data/models/foodHistory';
import { historyService } from '@data/repository/historyService';

//TODO: modularizar todo esto amén, si alguien lee este código y no le da un algo, me alegra saber que estamos en el mismo barco
export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useContext(UserContext);
  const [nutritionalInfo, setNutritionalInfo] = useState<Record<
    string,
    string
  > | null>(null);

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
        setSelectedImage(asset.uri);
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
          setNutritionalInfo(nutritionalData);
          const newHistoryItem = new HistoryItem(
            Date.now(),
            new Date(),
            nutritionalData,
            asset.uri
          );
          console.log('Creating new history item:', newHistoryItem);
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
  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (e) {
      console.error(e);
      Alert.alert('Error in logout');
    }
  };
  return (
    <View className="flex-1 p-5 bg-white justify-center items-center">
      {selectedImage ? (
        <Image
          source={{ uri: selectedImage }}
          style={{
            width: 200,
            height: 200,
            borderRadius: 10,
            marginBottom: 20,
          }}
        />
      ) : (
        <Text className="text-gray-500 text-lg mb-5">
          Select an image to analyze
        </Text>
      )}
      <TouchableOpacity
        className={`bg-gray-500 py-4 rounded-full items-center self-center mt-2 w-48 ${
          loading ? 'opacity-50' : ''
        }`}
        onPress={pickImage}
        disabled={loading}
      >
        <Text className="text-white text-lg font-semibold">
          {loading ? <ActivityIndicator /> : 'Pick an Image'}
        </Text>
      </TouchableOpacity>
      {nutritionalInfo && (
        <View className="mt-5 w-full">
          <Text className="text-xl font-bold text-center mb-3">
            Nutritional Information
          </Text>
          {Object.entries(nutritionalInfo).map(([key, value]) => (
            <NutritionalCard
              key={key}
              title={key.charAt(0).toUpperCase() + key.slice(1)}
              value={value}
            />
          ))}
        </View>
      )}
      <Text className="p-4">
        {user?.name} {user?.lastName}
      </Text>
      {/*Snippet for logout button */}
      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
