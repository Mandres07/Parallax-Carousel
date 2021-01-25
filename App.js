import * as React from 'react';
import { Animated, Dimensions, Image, FlatList, Text, View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { images } from './data';

const { width, height } = Dimensions.get('screen');
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.47;

const data = images.map((image, index) => ({
   key: String(index),
   photo: image,
   avatar_url: `https://randomuser.me/api/portraits/women/${Math.floor(Math.random() * 40)}.jpg`,
}));

export default function App() {
   const scrollX = React.useRef(new Animated.Value(0)).current;


   return (
      <View style={styles.container}>
         <StatusBar hidden />
         <Animated.FlatList data={data} keyExtractor={item => item.key} horizontal showsHorizontalScrollIndicator={false} pagingEnabled
            onScroll={Animated.event(
               [{ nativeEvent: { contentOffset: { x: scrollX } } }],
               { useNativeDriver: true }
            )}
            renderItem={({ item, index }) => {
               const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
               const translateX = scrollX.interpolate({
                  inputRange,
                  outputRange: [-width * 0.6, 0, width * 0.6]
               });
               return (
                  <View style={{ width, alignItems: 'center', justifyContent: 'center' }}>
                     <View style={{ padding: 12, backgroundColor: 'white', borderRadius: 18, shadowColor: '#000', shadowOpacity: 0.5, shadowRadius: 25, shadowOffset: { width: 0, height: 0 } }}>
                        <View style={{ width: ITEM_WIDTH, height: ITEM_HEIGHT, overflow: 'hidden', alignItems: 'center', borderRadius: 14 }}>
                           <Animated.Image source={{ uri: item.photo }} style={{ width: ITEM_WIDTH * 1.4, height: ITEM_HEIGHT, resizeMode: 'cover', transform: [{ translateX }] }} />
                        </View>
                        <Image source={{ uri: item.avatar_url }} style={{
                           width: 70, height: 70, borderRadius: 70, borderWidth: 4, borderColor: 'white', position: 'absolute',
                           bottom: -30, right: 60
                        }} />
                     </View>
                  </View>
               );
            }} />
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
   },
});