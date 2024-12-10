import { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { NutritionalCard } from '@components/ui/nutritionalCard';
import { HistoryItem } from '@data/models/foodHistory';
import { historyService } from '@data/repository/historyService';
import { parseISO } from 'date-fns';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function HistoryList() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await historyService.getHistory();
        setHistory(data);
      } catch (error) {
        console.error('Error fetching history:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const handleDelete = (itemId: string) => {
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this item from the history?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await historyService.deleteItem(itemId);
              setHistory((prevHistory) =>
                prevHistory.filter((item) => item.id !== itemId)
              );
              Alert.alert('Success', 'Item deleted from history.');
            } catch (error) {
              Alert.alert('Error', 'Could not delete the item.');
              console.error('Error deleting item:', error);
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: HistoryItem }) => {
    const date = parseISO(item.dateTime);

    return (
      <View className="bg-black/10  rounded-xl p-4 my-2 ">
        <Image
          source={{ uri: item.imagePath }}
          className="w-full h-48 rounded-lg"
        />
        <Text className="text-gray-500 mt-2">{date.toLocaleString()}</Text>
        <View className="mt-2">
          {item.nutritionalInfo &&
            Object.entries(item.nutritionalInfo).map(([key, value]) => (
              <NutritionalCard key={key} title={key} value={value} />
            ))}
        </View>
        <TouchableOpacity
          className="mt-2 self-end"
          onPress={() => handleDelete(item.id)}
        >
          <Ionicons name="trash-outline" size={24} color="#f87171" />
        </TouchableOpacity>
      </View>
    );
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View className="flex-1 p-5 bg-white">
      {history.length === 0 ? (
        <Text className="text-center text-gray-500">No history to show.</Text>
      ) : (
        <FlatList
          data={history}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}
