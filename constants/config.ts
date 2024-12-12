const {
  EXPO_PUBLIC_PAT_KEY: pat,
  EXPO_PUBLIC_USER_ID: userID,
  EXPO_PUBLIC_CLARIFAI_APP_ID: appID,
  EXPO_PUBLIC_MODEL_ID: modelID,
  EXPO_PUBLIC_MODEL_VERSION_ID: modelVersionID,
  EXPO_PUBLIC_API_KEY: apiKey,
  EXPO_PUBLIC_AUTH_DOMAIN: authDomain,
  EXPO_PUBLIC_DATABASE_URL: databaseURL,
  EXPO_PUBLIC_PROJECT_ID: projectId,
  EXPO_PUBLIC_STORAGE_BUCKET: storageBucket,
  EXPO_PUBLIC_MESSAGING_SENDER_ID: messagingSenderId,
  EXPO_PUBLIC_APP_ID: appId,
} = process.env;

export const clarifai = {
  pat,
  userID,
  appID,
  modelID,
  modelVersionID,
};

export const firebaseConfig = {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
};
