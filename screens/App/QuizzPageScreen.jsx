import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native"
import { Button, SafeAreaView, ScrollView, StyleSheet, View, Text } from "react-native"
import axios from "axios"
import { APP_URL } from "../../config";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function QuizzPageScreen() {
    const route = useRoute()
    const name = route.params.name
    const id = route.params.id
    const navigation = useNavigation()
    const {userToken} = useContext(AuthContext)
    const [data, setData] = useState([])
    const [qcm, setQcm] = useState([])

    const getQuizPageInformation = () => {

        const options = {
            method: 'GET',
            url: `${APP_URL}/api/quiz/page/${id}`,
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        };

        axios.request(options).then(function (response) {
            const json = JSON.parse(response.data)
            setData(json)
            setQcm(json.quizAttempts)
        }).catch(function (error) {
            console.error(error);
        });
    }

    const handleRefresh = async () => {
        await getQuizPageInformation()
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
                    <View>
                        <Text>QCM {name}</Text>
                    </View>
                    <View>
                        <Button title="voir détails" onPress={() => navigation.navigate('Quizz détails', {name, id})} />
                        <Button title="faire quizz" onPress={() => navigation.navigate('make qcm', {id})} />
                        <Text>Nombre de questions : {data.nbQuestions}</Text>
                        <Text>Taux de réussite : {data.tauxCorrectQuiz != null ? data.tauxCorrectQuiz : 'aucun'} %</Text>
                    </View>
                    <View>
                        <Text>Liste QCM effectué :</Text>
                        <Text>{ qcm.length == 0 ? 'aucun essai' : 'plein' }</Text>
                    </View>
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