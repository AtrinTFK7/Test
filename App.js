import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator, SafeAreaView, Animated  } from 'react-native';

import useHttp from './hooks/http';

const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING + 3;

export default function App() {
  const { isLoading, data, error, sendRequest, clear } = useHttp();
  const [dataList, setDataList] = useState([]);
  const [dataListSec, setDataListSec] = useState([]);

  useEffect(() => {
    
      const url = 'https://jsonplaceholder.typicode.com/users';
      sendRequest(url, 'GET', null, null);
    
  }, []);

  useEffect(() => {
    if (!isLoading && !error && data) {
      console.log(data);

      setDataList(data);

      console.log('dataList',dataList);

      clear();
    }
  }, [error, isLoading, data, dataList, setDataList]);

  const scrollY = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={{flex: 1}}>
  

      <Animated.FlatList
        data={dataList}
        keyExtractor={item => item.id}
        contentContainerStyle={{ 
          padding: SPACING,
          paddingTop: StatusBar.currentHeight || 42,
        }}
        onScroll= { Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
        )}
        renderItem={({item, index}) => {

            const inputRange= [
                -1,
                0,
                ITEM_SIZE * index,
                ITEM_SIZE * (index + 2),
            ]
            const opacityInputRange= [
              -1,
              0,
              ITEM_SIZE * index,
              ITEM_SIZE * (index + 0.5),
          ]

            const scale = scrollY.interpolate({
                inputRange,
                outputRange: [1, 1, 1, 0],
            })

            const opacity = scrollY.interpolate({
              inputRange: opacityInputRange,
              outputRange: [1, 1, 1, 0],
          })

         return <Animated.View style={{flexDirection: 'row', padding: SPACING, marginBottom: SPACING, backgroundColor:'rgba( 224, 243, 135, 1)', borderRadius: 20,
         borderColor: 'rgba(0,0,0,0.2)', borderWidth: 1, 
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 1,
          shadowRadius: 20,
          elevation: 30,
          opacity,
          transform: [{scale}]
         }}>
          <View>
            <Text style={{fontWeight:'bold'}} >Name  : {item.name} </Text>
            <Text style={{fontWeight:'bold'}} >Username  : {item.username} </Text>
            <Text style={{fontWeight:'bold'}} >Email  : {item.email} </Text>
            <Text style={{fontWeight:'bold'}} >Phone  : {item.phone} </Text>
          </View>
        </Animated.View>

        }}
      />

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
