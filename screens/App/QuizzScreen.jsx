import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import CardCategory from '../../components/CardCategory';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { APP_URL } from '../../config';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

export default function QuizzScreen() {
  const [categories, setCategories] = useState([])
  const {userInfo, userToken} = useContext(AuthContext)
  const navigation = useNavigation()

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
    await getCategory();
  };

  useFocusEffect(
    React.useCallback(() => {
      handleRefresh();
    }, [])
  );
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
          showsVerticalScrollIndicator={false}
          style={{paddingHorizontal: 15, paddingVertical: 20}}
        >
          <View style={styles.container}>
            <Text style={styles.title}>
              Mes matières
            </Text>
            <Button title='ajouter une matière' onPress={() => {navigation.navigate('Créer matière')}}/>
          </View>
          <View>
            {categories.map((category, index) => <CardCategory key={index} name={category.name} id={category.id}/>)}
          </View>
          <StatusBar style="auto" />
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 25
  },
  container: {
    marginBottom: 25,
    flex:1,
    marginTop:20
  }
});