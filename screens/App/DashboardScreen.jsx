import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { APP_URL } from '../../config';
import CardCategory from '../../components/CardCategory';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export default function DashboardScreen() {
  const {logout, userInfo, setUserInfo, userToken} = useContext(AuthContext)
  const [categories, setCategories] = useState([])
  const navigation = useNavigation()

  const getUserInfo = async () => {
    const userInfoString = await AsyncStorage.getItem('userInfo');
    if (userInfoString) {
        const userInfo = JSON.parse(userInfoString);
    } else {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
            throw new Error('Token non trouvé dans AsyncStorage');
        }
        const options = {
            method: 'POST',
            url: `${APP_URL}/api/user`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                token: token
            }
        };
        
        axios.request(options).then(function (response) {
            data = JSON.parse(response.data)
            setUserInfo(data)
            console.log('je dois pas y passer')
            AsyncStorage.setItem('userInfo', JSON.stringify(data))
        }).catch(function (error) {
            console.error(error);
        });
    }
  }

  const getCategory = async () => {
    const options = {
      method: 'GET',
      url: `${APP_URL}/api/category/${userInfo.id}`,
      headers: {
        Authorization: `Bearer ${userToken}` 
      }
    };

    axios.request(options).then(function (response) {
      const categories = JSON.parse(response.data)
      setCategories(categories)
    }).catch(function (error) {
      console.error(error);
    });
  }

  const handleRefresh = async () => {
    await getUserInfo();
    await getCategory();
  };

  useFocusEffect(
    React.useCallback(() => {
      handleRefresh()
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: 15, paddingVertical: 20}}>

        <View style={styles.box}>
          <Text style={{fontSize:25}}>
            Hello {userInfo?.name}
          </Text>
          <Text style={{fontSize:15, paddingTop:20}}>Mes matières :</Text>
          <View>
            {categories.map((category, index) => <CardCategory key={index} name={category.name} id={category.id}/>)}
          </View>
          
          <StatusBar style="auto" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color:'white',
    paddingTop: 20
  },
  button: {
    textAlign:'right',
    marginBottom:40
  },
  box: {
    color:'white'
  }
});