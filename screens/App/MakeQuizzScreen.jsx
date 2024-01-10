import React, { useContext, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import MakeQuizzVerifyScreen from "./MakeQuizzVerifyScreen";
import MakeQuizzViergeScreen from "./MakeQuizzViergeScreen";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import axios from "axios";
import { APP_URL } from "../../config";
import { AuthContext } from "../../context/AuthContext";

export default function MakeQuizzScreen() {
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [questions, setQuestions] = useState([])
    const route = useRoute()
    const id = route.params.id
    const {userToken} = useContext(AuthContext)
    const [dataUser, setDataUser] = useState([])
    const [score, setScore] = useState([])
    

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

    const qcmSubmited = (data) => {
        
        setDataUser(data)
        const options = {
            method: 'POST',
            url: `${APP_URL}/api/quiz/${id}/correct`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userToken}`
            },
            data: data
        };

        axios.request(options).then(function (response) {
            setScore(JSON.parse(response.data))
            setIsSubmitted(true)
            console.log(response.data)
        }).catch(function (error) {
            console.error(error)
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                style={{paddinHorizontal: 15}}>
                {isSubmitted ? <MakeQuizzVerifyScreen questions={questions} answersUsers={dataUser} score={score[score.length - 1]} /> : <MakeQuizzViergeScreen qcmSubmited={qcmSubmited}  questions={questions}/>}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})