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

// Extend the ImagePickerAsset type to include base64
type ImagePickerAssetWithBase64 = ImagePicker.ImagePickerAsset & {
  base64?: string;
};

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

      // Ensure uri and base64 are available
      if (asset.uri && asset.base64) {
        setSelectedImage(asset.uri);
        analyzeImage(asset.base64);
      } else {
        Alert.alert('Could not retrieve image data.');
      }
    }
  };

  const analyzeImage = async (base64Image: string) => {
    setLoading(true);
    try {
      const clarifaiService = new ClarifaiService();
      const concepts = await clarifaiService.analyzeImage(base64Image);
      if (concepts && concepts.size > 0) {
        const topConcept = concepts.get('concepts')[0];
        const foodName = topConcept.name;
        const openFoodService = new OpenFoodService();
        const nutritionalData = await openFoodService.getNutritionalInfo(
          foodName
        );
        if (nutritionalData) {
          setNutritionalInfo(nutritionalData);
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
            <Text key={key} className="text-lg text-gray-700 text-center mb-1">
              {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
            </Text>
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
