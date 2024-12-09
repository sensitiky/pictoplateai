import { UserContext } from '@utils/helpers';
import { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function Settings() {
  const { user, setUser } = useContext(UserContext);

  const handleUpgradeToPremium = () => {
    // TODO: agregar la validación de pagos mediante google play billing
    setUser({ ...user, isPremium: true });
  };

  return (
    <View className="flex-1 p-11  bg-white">
      <Text className="text-xl sm:text-2xl font-bold mb-5">Settings</Text>
      <View className="mb-4">
        <Text className="text-base sm:text-lg font-semibold">
          Name: {user?.name} {user?.lastName}
        </Text>
        <Text className="text-base sm:text-lg font-semibold">
          Email: {user?.email}
        </Text>
        <Text className="text-base sm:text-lg font-semibold">
          Premium Status: {user?.isPremium ? 'Active' : 'Inactive'}
        </Text>
      </View>
      {!user?.isPremium && (
        <TouchableOpacity
          className="bg-blue-500 py-2 sm:py-3 rounded-full items-center mt-4"
          onPress={handleUpgradeToPremium}
        >
          <Text className="text-white text-base sm:text-lg font-semibold">
            Upgrade to Premium
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
