import { Text, View } from "react-native";
import CardQuizzVerify from "../../components/CardQuizzVerify";

export default function MakeQuizzVerifyScreen({questions, answersUsers, score}) {
    console.log(score)
    return (
        <View>
            <Text>Résultat : { score.score }</Text>
            <View>
                {questions.map((question, index) => 
                    <CardQuizzVerify
                        key={index}
                        question={question.question.texte}
                        answers={question.question.reponses}
                        answersUsers={answersUsers.answers[index]}
                        id={question.question.id}
                    />
                )}
            </View>
        </View>
    )
}