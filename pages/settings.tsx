import { useContext, useState } from 'react';
import { logoutUser } from '@data/services/firebase';
import { UserContext } from '@utils/helpers';
import { View, Text, TouchableOpacity, Alert, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesignIcon from 'react-native-vector-icons/FontAwesome5';
import Constants from 'expo-constants';
import PurchaseSubscription from '@components/ui/purchaseSuscription';

export default function Settings() {
  const { setUser } = useContext(UserContext);
  const appVersion =
    Constants.manifest2?.version || Constants.expoConfig?.version;
  const [isPurchaseModalVisible, setPurchaseModalVisible] =
    useState<boolean>(false);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'destructive' },
      {
        text: 'Logout',
        onPress: async () => {
          try {
            setUser(null);
            await logoutUser();
          } catch (e) {
            console.error(e);
          }
        },
      },
    ]);
  };

  return (
    <Modal className="flex-1 bg-white" animationType="slide">
      <TouchableOpacity
        className="bg-blue-500 mt-8 gap-2 p-3 rounded-3xl items-center justify-evenly self-center flex-row"
        onPress={() => setPurchaseModalVisible(true)}
      >
        <AntDesignIcon
          name="crown"
          size={30}
          className="bg-white rounded-md"
          color={'#fde047'}
        />
        <Text className="text-center text-white font-bold">
          Unlock Premium Features
        </Text>
      </TouchableOpacity>
      <View className="mt-6 bg-blue-50 rounded-md m-4">
        <TouchableOpacity className="flex-row items-center justify-between py-4 px-4 border-b border-gray-200">
          <Text className="text-base">Rate App</Text>
          <Icon name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center justify-between py-4 px-4 border-b border-gray-200">
          <Text className="text-base">FAQ</Text>
          <Icon name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center justify-between py-4 px-4 border-b border-gray-200">
          <Text className="text-base">Privacy</Text>
          <Icon name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row items-center justify-between py-4 px-4"
          onPress={handleLogout}
        >
          <Text className="text-base text-red-500">Logout</Text>
          <Icon name="log-out-outline" size={20} color="#f87171" />
        </TouchableOpacity>
      </View>
      <Text className="ml-4 text-gray-500">App version {appVersion}</Text>
      <PurchaseSubscription
        visible={isPurchaseModalVisible}
        onClose={() => setPurchaseModalVisible(false)}
      />
    </Modal>
  );
}
