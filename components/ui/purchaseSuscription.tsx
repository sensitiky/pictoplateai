import { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, Alert, Modal } from 'react-native';
import * as RNIap from 'react-native-iap';
import { itemSkus } from '@utils/helpers';
import { UserContext } from '@utils/helpers';
import { updateUser } from '@data/services/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PurchaseSubscriptionProps } from '@utils/interfaces';
import type {
  Product,
  ProductPurchase,
  PurchaseError,
  Subscription,
} from 'react-native-iap';

const itemSkusArray: string[] = itemSkus || [];

export default function PurchaseSubscription({
  visible,
  onClose,
}: PurchaseSubscriptionProps) {
  const { user, setUser } = useContext(UserContext);
  const [products, setProducts] = useState<(Product | Subscription)[]>([]);

  useEffect(() => {
    const initializeIAP = async () => {
      try {
        await RNIap.initConnection();
        console.log('IAP Connection initialized');
      } catch (err) {
        console.error('Failed to initialize IAP connection:', err);
      }
    };

    const getProducts = async () => {
      try {
        const subscriptions = await RNIap.getSubscriptions({
          skus: itemSkusArray,
        });
        setProducts(subscriptions as (Product | Subscription)[]);
      } catch (err) {
        console.error('Failed to fetch subscriptions:', err);
      }
    };

    initializeIAP();
    getProducts();

    const purchaseUpdateSubscription = RNIap.purchaseUpdatedListener(
      async (purchase: ProductPurchase) => {
        const receipt = purchase.transactionReceipt;
        if (receipt) {
          if (user) {
            const updatedUser = { ...user, isPremium: true };
            setUser(updatedUser);
            await AsyncStorage.setItem(
              '@userData',
              JSON.stringify(updatedUser)
            );
            const updateSuccess = await updateUser(user.id, {
              isPremium: true,
            });

            if (updateSuccess) {
              Alert.alert('Success', 'You are now a premium user!');
              onClose();
            } else {
              Alert.alert('Error', 'Failed to update user data.');
            }
          }

          try {
            await RNIap.finishTransaction({ purchase });
            console.log('Transaction finished:', purchase.transactionId);
          } catch (ackErr) {
            console.warn('Error finishing transaction:', ackErr);
          }
        }
      }
    );

    const purchaseErrorSubscription = RNIap.purchaseErrorListener(
      (error: PurchaseError) => {
        console.warn('purchaseErrorListener:', error);
        Alert.alert('Purchase Error', error.message);
      }
    );

    return () => {
      purchaseUpdateSubscription?.remove();
      purchaseErrorSubscription?.remove();
      RNIap.endConnection();
    };
  }, [user, setUser, onClose]);

  const requestSubscription = async (sku: string) => {
    try {
      await RNIap.requestSubscription({ sku });
    } catch (err) {
      console.error('Failed to request subscription:', err);
      Alert.alert('Purchase Error', 'Failed to initiate purchase.');
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 bg-black bg-opacity-50 justify-center items-center">
        <View className="w-4/5 bg-white rounded-lg p-5 items-center">
          <Text className="text-lg mb-5">Upgrade to Premium</Text>
          {products.length > 0 ? (
            products.map((product) => (
              <TouchableOpacity
                key={product.productId}
                onPress={() => requestSubscription(product.productId)}
                className="w-full py-4 bg-blue-600 rounded-lg my-2 items-center"
              >
                <Text className="text-white text-base">{product.title}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text className="text-base text-gray-500 my-2 text-center">
              No subscriptions available.
            </Text>
          )}
          <TouchableOpacity onPress={onClose} className="mt-4 py-2">
            <Text className="text-blue-600 text-base">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
