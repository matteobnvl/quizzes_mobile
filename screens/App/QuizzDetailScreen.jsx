import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { SafeAreaView, ScrollView, View, Text, StyleSheet, Button } from "react-native";
import symbolicateStackTrace from "react-native/Libraries/Core/Devtools/symbolicateStackTrace";
import { APP_URL } from "../../config";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import CardQuizzDetail from "../../components/CardQuizzDetail";


export default function QuizzDetailScreen() {
    const route = useRoute()
    const name = route.params.name
    const id = route.params.id
    const navigaton = useNavigation()
    const {userToken} = useContext(AuthContext)
    const [questions, setQuestions] = useState([])

    const getQuestions = () => {
        const options = {
            method: 'GET',
            url: `${APP_URL}/api/quiz/${id}`,
            headers: {
                Authorization: `Bearer ${userToken}`,
                'Content-Type': 'application/json'
            }
        };
        axios.request(options).then(function (response) {
            setQuestions(JSON.parse(response.data))
        }).catch(function (error) {
            console.error(error);
        });
    }

    const handleRefresh = async () => {
        await getQuestions()
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
                style={{paddingHorizontal: 15, paddingVertical: 20}}
            >
                <View>
                    <Text style={styles.title}>Quizz {name}</Text>
                    <Button title="Ajouter question" onPress={() => {navigaton.navigate('create question', {id})}} />
                </View>
                <View>
                    {questions.map((question, index) => <CardQuizzDetail 
                                                            key={index} 
                                                            question={question.question.texte} 
                                                            answers={question.question.reponses}
                                                            id={question.question.id}
                                                            />)}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        fontSize: 20,
        marginBottom: 25
    }
})