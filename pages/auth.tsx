import { View } from 'react-native';
import Register from '@components/auth/registerForm';
import { useState } from 'react';
import Login from '@components/auth/loginForm';
export default function Authentication() {
  const [activeTab, setActiveTab] = useState<'Login' | 'Register'>('Login');
  const renderForm = () => {
    switch (activeTab) {
      case 'Login':
        return <Login changeTab={() => setActiveTab('Login')} />;
      case 'Register':
        return <Register changeTab={() => setActiveTab('Login')} />;
      default:
        return null;
    }
  };
  return <View>{renderForm()}</View>;
}
