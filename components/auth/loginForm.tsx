import { loginUser } from '@data/services/firebase';
import { UserContext } from '@utils/helpers';
import { IAuthenticationForms } from '@utils/interfaces';
import { useContext, useState } from 'react';
import {
  TextInput,
  View,
  Alert,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

export default function Login({ changeTab }: IAuthenticationForms) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { setUser } = useContext(UserContext);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill all the fields.');
      return;
    }
    try {
      setLoading(true);
      const userData = await loginUser(email, password);
      if (userData) {
        setUser(userData);
      } else {
        Alert.alert('Error signing into your account');
      }
    } catch (e) {
      console.error(e);
      Alert.alert('Error signing into your account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 p-5 bg-white justify-center">
      <Text className="text-2xl text-gray-500 text-center mb-5 font-bold">
        Login
      </Text>
      <TextInput
        className="h-12 border border-gray-500 rounded-lg px-2 mb-4 text-black"
        placeholder="Email"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        className="h-12 border border-gray-500 rounded-lg px-2 mb-4 text-black"
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity
        className={`bg-gray-500 py-4 rounded-full items-center self-center mt-2 w-48 ${
          loading ? 'opacity-50' : ''
        }`}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text className="text-white text-lg font-semibold">
          {loading ? <ActivityIndicator /> : 'Login'}
        </Text>
      </TouchableOpacity>
      <Text className="text-center mt-4">Don't have an account?</Text>
      <Text className="font-bold text-black text-center" onPress={changeTab}>
        Register
      </Text>
    </View>
  );
}
