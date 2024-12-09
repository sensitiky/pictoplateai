import React, { useContext, useState, useEffect } from 'react';
import { logoutUser, updateUser } from '@data/services/firebase';
import { UserContext } from '@utils/helpers';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { IUser } from '@utils/interfaces';

export default function Settings() {
  const { user, setUser } = useContext(UserContext);
  const [formData, setFormData] = useState<Partial<IUser>>(user || {});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validName = formData.name!.trim().length > 0;
    const validLastName = formData.lastName!.trim().length > 0;
    setIsValid(validName && validLastName);
  }, [formData]);

  const handleChanges = async () => {
    if (!user) {
      Alert.alert('Error', 'No user is logged in.');
      return;
    }

    const success = await updateUser(user.id, formData);
    if (success) {
      setUser({ ...user, ...formData });
      Alert.alert('Success', 'Information updated successfully.');
    } else {
      Alert.alert('Error', 'Failed to update information.');
    }
  };

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
    <ScrollView className="flex-1 bg-gray-100">
      <View className="bg-white py-5 px-4">
        <Text className="text-lg font-semibold mb-2">Account</Text>
        <View className="flex-row items-center justify-between border-b border-gray-200 py-3">
          <Text className="text-base">Name</Text>
          <TextInput
            className="flex-1 ml-4 border-b border-gray-300 text-right"
            placeholder="New Name"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
          />
        </View>
        <View className="flex-row items-center justify-between border-b border-gray-200 py-3">
          <Text className="text-base">Last Name</Text>
          <TextInput
            className="flex-1 ml-4 border-b border-gray-300 text-right"
            placeholder="New Last Name"
            value={formData.lastName}
            onChangeText={(text) =>
              setFormData({ ...formData, lastName: text })
            }
          />
        </View>
        <TouchableOpacity
          className={`mt-4 py-3 rounded-full items-center ${
            isValid ? 'bg-blue-500' : 'bg-gray-300'
          }`}
          onPress={handleChanges}
          disabled={!isValid}
        >
          <Text className="text-white font-semibold">Save Changes</Text>
        </TouchableOpacity>
      </View>

      <View className="mt-6 bg-white">
        <TouchableOpacity className="flex-row items-center justify-between py-4 px-4 border-b border-gray-200">
          <Text className="text-base">Payment Methods</Text>
          <Icon name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center justify-between py-4 px-4 border-b border-gray-200">
          <Text className="text-base">Notifications</Text>
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
    </ScrollView>
  );
}
