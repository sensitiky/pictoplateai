import { IAuthenticationForms } from '@utils/interfaces';
import { TextInput, View } from 'react-native';

export default function Login({ changeTab }: IAuthenticationForms) {
  return (
    <View>
      <TextInput placeholder="Email" keyboardType="email-address" />
      <TextInput
        className="bg-zinc-100"
        placeholder="Password"
        keyboardType="default"
        secureTextEntry
        value=""
      />
    </View>
  );
}
