import { useRef, useState } from 'react';
import { FlatList, View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const slides = [
  {
    key: 1,
    title: 'Welcome',
    description: 'Pic to Plate AI will manage your intake with just pictures',
    img: require('../assets/logo.webp'),
  },
  {
    key: 2,
    title: 'Just one pic',
    description: 'Pic to Plate AI will manage your intake with just pictures',
    img: require('../assets/logo.webp'),
  },
];

const Slide = ({
  item,
}: {
  item: { key: number; title: string; description: string; img: any };
}) => {
  return (
    <View className="justify-center items-center p-6">
      <Image source={item.img} className="size-64 mb-6" />
      <Text className="text-3xl font-bold text-center mb-4">{item.title}</Text>
      <Text className="text-base text-center px-8">{item.description}</Text>
    </View>
  );
};
//TODO: fix styles in the initial cards
export default function Welcome() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const navigation = useNavigation();

  const handleNextSlide = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < slides.length) {
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex });
    } else {
      navigation.navigate('Authentication' as never);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={slides}
        renderItem={({ item }) => <Slide item={item} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(
            event.nativeEvent.contentOffset.x /
              event.nativeEvent.layoutMeasurement.width
          );
          setCurrentIndex(index);
        }}
        keyExtractor={(item) => item.key.toString()}
        ref={flatListRef}
        className="self-center"
      />
      <View className="flex-row justify-center space-x-2">
        {slides.map((_, index) => (
          <View
            key={index}
            className={`size-3 rounded-full ${
              index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </View>
      <TouchableOpacity
        onPress={handleNextSlide}
        className="bg-black self-center m-2 rounded-full px-6 py-3"
      >
        <Text className="text-white text-lg">
          {currentIndex === slides.length - 1 ? 'Comenzar' : 'Siguiente'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
