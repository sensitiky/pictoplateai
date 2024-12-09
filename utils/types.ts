import * as ImagePicker from 'expo-image-picker';

export type AuthStackParameters = {
  Welcome: undefined;
};
export type AppStackParameters = {
  History: undefined;
  Onboarding: undefined;
  Home: undefined;
  Settings: undefined;
};
export type ImagePickerAssetWithBase64 = ImagePicker.ImagePickerAsset & {
  base64?: string;
};
