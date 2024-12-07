import * as ImagePicker from 'expo-image-picker';

export type AuthStackParameters = {
  Welcome: undefined;
};
export type AppStackParameters = {
  Home: undefined;
};
// Extend the ImagePickerAsset type to include base64
export type ImagePickerAssetWithBase64 = ImagePicker.ImagePickerAsset & {
  base64?: string;
};
