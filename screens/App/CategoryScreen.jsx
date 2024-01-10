import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView } from 'react-native';
import { APP_URL } from '../../config';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import CardQuizz from '../../components/CardQuizz';


export default function CategoryScreen() {
    const {userToken} = useContext(AuthContext)
    const navigation = useNavigation()
    const route = useRoute()
    const id = route.params.id
    const name = route.params.name
    const [quizzes, setQuizzes] = useState([])

    const getQuizzes = () => {
        const options = {
            method: 'POST',
            url: `${APP_URL}/api/category/quiz/${id}`,
            headers: {
                Authorization: `Bearer ${userToken}`,
                'Content-Type': 'application/json'
            }
        };
        
        axios.request(options).then(function (response) {
            setQuizzes(JSON.parse(response.data))
        }).catch(function (error) {
            console.error(error);
        });
    }

    const handleRefresh = async () => {
        await getQuizzes()
    }

    useFocusEffect(
        React.useCallback(() => {
            handleRefresh()
        }, [])
    )

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView 
                showsVerticalScrollIndicator={false}
                style={{paddingHorizontal: 15, paddingVertical: 20}}
                >
            <View style={styles.container}>
                <Text style={styles.title}>
                    {name}
                </Text>
                <Button title='modifier' onPress={() => {navigation.navigate('modal', {id, name})}} />
            </View>
            <View>
                <Text>Quizz :</Text>
                <Button title='ajouter quizz' onPress={() => {navigation.navigate('Créer quizz', {id})}}/>
            </View>
            <View>
                {quizzes.map((quizz, index) => <CardQuizz name={quizz.name} key={index} id={quizz.id}/>)}
            </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
      fontSize: 25,
    },
    container: {
      marginBottom: 25,
      flex: 1
    }
  });