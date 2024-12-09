import * as ImagePicker from 'expo-image-picker';

export type ImagePickerAssetWithBase64 = ImagePicker.ImagePickerAsset & {
  base64?: string;
};
