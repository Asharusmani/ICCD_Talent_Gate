import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function ProductSlider({ images }: any) {
  const [index, setIndex] = useState(0);
  const flatListRef = useRef(null);

  const goNext = () => {
    if (index < images.length - 1) {
      flatListRef.current.scrollToIndex({ index: index + 1 });
      setIndex(index + 1);
    }
  };

  const goBack = () => {
    if (index > 0) {
      flatListRef.current.scrollToIndex({ index: index - 1 });
      setIndex(index - 1);
    }
  };

  return (
    <View style={styles.wrapper}>
      <FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        data={images}
        keyExtractor={(_, i) => i.toString()}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const i = Math.round(
            e.nativeEvent.contentOffset.x /
              e.nativeEvent.layoutMeasurement.width
          );
          setIndex(i);
        }}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.image} />
        )}
      />

      {/* RIGHT ARROW */}
      {index < images.length - 1 && (
        <TouchableOpacity style={styles.rightArrow} onPress={goNext}>
          <Ionicons name="chevron-forward" size={22} color="#fff" />
        </TouchableOpacity>
      )}

      {/* LEFT ARROW */}
      {index > 0 && (
        <TouchableOpacity style={styles.leftArrow} onPress={goBack}>
          <Ionicons name="chevron-back" size={22} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    marginBottom: 18,
  },
  image: {
    width: 320,
    height: 220,
    borderRadius: 14,
    marginRight: 8,
  },
  rightArrow: {
    position: 'absolute',
    right: 10,
    top: '45%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 8,
    borderRadius: 20,
  },
  leftArrow: {
    position: 'absolute',
    left: 10,
    top: '45%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 8,
    borderRadius: 20,
  },
});
