import React, { useContext, useState } from "react"
import { Button, Text, View } from "react-native"
import { AuthContext } from "../../context/AuthContext"
import CardQuizzDetail from "../../components/CardQuizzDetail"
import CardQuizzMake from "../../components/CardQuizzMake"

export default function MakeQuizzViergeScreen({ qcmSubmited, questions }) {
    const [answers, setAnswers] = useState([])
    const {userToken} = useContext(AuthContext)

    const handleAnswerUpdate = (questionId, selectedAnswers) => {
        setAnswers(prev => {
            if (selectedAnswers.length === 0) {
                const {[questionId]: removed, ...rest} = prev
                return rest;
            } else {
                return {
                    ...prev,
                    [questionId]: selectedAnswers
                }
            }
        })
    }

    const handleButtonClick = () => {
        const formattedAnswers = Object.entries(answers).map(([questionId, answerIds]) => ({
            questionId: parseInt(questionId),
            answerIds
        }))

        const dataToSend = {
            answers: formattedAnswers
        }
        if (questions.length != dataToSend.answers.length) {
            alert('Répondez à toutes les questions.')
            return

        }
        qcmSubmited(dataToSend)
    };


    return (
        <View>
            <View>
                {questions.map((question, index) => 
                    <CardQuizzMake 
                        key={index} 
                        question={question.question.texte} 
                        answers={question.question.reponses}
                        id={question.question.id}
                        onAnswersUpdate={handleAnswerUpdate}
                />)}
            </View>
            <Button title="soumettre" onPress={handleButtonClick} />
        </View>
    )
}