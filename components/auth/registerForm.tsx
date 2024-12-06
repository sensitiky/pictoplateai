import { IAuthenticationForms } from '@utils/interfaces';
import { TextInput, View } from 'react-native';

export default function Register({ changeTab }: IAuthenticationForms) {
  const handleRegister = async () => {
    try {
      await console.log('test');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View className="bg-gray-300 elevation-sm flex-1 flex-col">
      <TextInput placeholder="Email" keyboardType="email-address" />
      <TextInput
        className="bg-zinc-100"
        placeholder="Password"
        keyboardType="default"
        secureTextEntry
      />
      <TextInput
        className="bg-zinc-100"
        placeholder="Confirm password"
        keyboardType="default"
        secureTextEntry
      />
    </View>
  );
}
