import { registerUser } from '@data/services/firebase';
import { UserContext } from '@utils/helpers';
import { IAuthenticationForms, IUser } from '@utils/interfaces';
import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';

export default function Register({ changeTab }: IAuthenticationForms) {
  const [name, setName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { setUser } = useContext(UserContext);

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }
    setLoading(true);
    const userData: IUser = {
      id: '',
      name,
      lastName,
      email,
      isPremium: false,
    };
    const registeredUser = await registerUser(userData, password);
    if (registeredUser) {
      setUser(registeredUser);
    } else {
      Alert.alert('Error registering your account');
    }
    setLoading(false);
  };

  return (
    <View className="flex-1 p-5 bg-white justify-center">
      <Text className="text-2xl text-gray-500 text-center mb-5 font-bold">
        Register
      </Text>
      <TextInput
        className="h-12 border border-gray-500 rounded-lg px-2 mb-4 text-black"
        placeholder="Name"
        placeholderTextColor="#aaa"
        keyboardType="default"
        autoCapitalize="none"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        className="h-12 border border-gray-500 rounded-lg px-2 mb-4 text-black"
        placeholder="Last Name"
        placeholderTextColor="#aaa"
        keyboardType="default"
        autoCapitalize="none"
        value={lastName}
        onChangeText={setLastName}
      />
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
      <TextInput
        className="h-12 border border-gray-500 rounded-lg px-2 mb-4 text-black"
        placeholder="Confirm password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity
        className={`bg-gray-500 py-4 rounded-full items-center self-center mt-2 w-48 ${
          loading ? 'opacity-50' : ''
        }`}
        onPress={handleRegister}
        disabled={loading}
      >
        <Text className="text-white text-lg font-semibold">
          {loading ? <ActivityIndicator /> : 'Register'}
        </Text>
      </TouchableOpacity>
      <Text className="text-center mt-4">Already have an account? </Text>
      <Text className="font-bold text-black text-center" onPress={changeTab}>
        Login
      </Text>
    </View>
  );
}
