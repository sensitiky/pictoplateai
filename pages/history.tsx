import { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator } from 'react-native';
import { NutritionalCard } from '@components/ui/nutritionalCard';
import { HistoryItem } from '@data/models/foodHistory';
import { historyService } from '@data/repository/historyService';

export default function History() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchHistory = async () => {
      const data = await historyService.getHistory();
      console.log('Fetched history:', data); // Logging para depuración
      setHistory(data);
      setLoading(false);
    };
    fetchHistory();
  }, []);

  const renderItem = ({ item }: { item: HistoryItem }) => {
    console.log('Rendering item:', item); // Logging para depuración

    // Comprobación de `nutritionalInfo`
    if (!item.nutritionalInfo || typeof item.nutritionalInfo !== 'object') {
      return (
        <View className="bg-white rounded-xl p-4 my-2 shadow-md">
          <Image
            source={{ uri: item.imagePath }}
            className="w-full h-200 rounded-lg"
          />
          <Text className="text-gray-500 mt-2">
            {item.dateTime.toLocaleString()}
          </Text>
          <Text className="text-gray-500 mt-2">
            No hay información nutricional disponible.
          </Text>
        </View>
      );
    }

    return (
      <View className="bg-white rounded-xl p-4 my-2 shadow-md">
        <Image
          source={{ uri: item.imagePath }}
          className="w-full h-200 rounded-lg"
        />
        <Text className="text-gray-500 mt-2">
          {item.dateTime.toLocaleString()}
        </Text>
        <View className="mt-2">
          {Object.entries(item.nutritionalInfo).map(([key, value]) => (
            <NutritionalCard
              key={key}
              title={key.charAt(0).toUpperCase() + key.slice(1)}
              value={value}
            />
          ))}
        </View>
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
    <View className="flex-1 p-5 bg-gradient-to-b from-white to-gray-100">
      <Text className="text-2xl font-bold mb-4 text-center">
        Historial de Comidas
      </Text>
      {history.length === 0 ? (
        <Text className="text-center text-gray-500">
          No hay historial para mostrar.
        </Text>
      ) : (
        <FlatList
          data={history}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}
