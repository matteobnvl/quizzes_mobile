
import { createStackNavigator } from '@react-navigation/stack';
import { TabNavigator } from './TabNav';
import ModalScreen from '../components/ModalUpdateCategory';
import InfoPersonnelScreen from '../screens/App/InfoPersonnelScreen'
import UpdateInfoModal from '../components/UpdateInfoModal';
import CategoryScreen from '../screens/App/CategoryScreen';
import CreateCategory from '../components/ModalCreateCategory';
import QuizzDetailScreen from '../screens/App/QuizzDetailScreen';
import CreateQuizz from '../components/ModalCreateQuizz';
import CreateQuestionScreen from '../screens/App/CreateQuestion';
import PutQuestions from '../components/PutQuestions';
import CreateReponse from '../components/CreateReponse';
import PutReponse from '../components/PutReponse';
import QuizzPageScreen from '../screens/App/QuizzPageScreen';
import MakeQuizzScreen from '../screens/App/MakeQuizzScreen';




const Stack = createStackNavigator();

export const AppStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false}} />
            <Stack.Screen name="modal" component={ModalScreen} options={{presentation: 'modal'}} />
            <Stack.Screen 
                name="Modifier Information" 
                component={UpdateInfoModal} 
                options={{presentation: 'modal', headerShown: false}} />
            <Stack.Screen 
                name="Information Personnel" 
                component={InfoPersonnelScreen} 
                options={{presentation: 'card'}} />
            <Stack.Screen 
                name="Matière"
                component={CategoryScreen}/>
            <Stack.Screen name="Créer matière" component={CreateCategory} options={{presentation: 'modal'}} />
            <Stack.Screen name="Quizz détails" component={QuizzDetailScreen} />
            <Stack.Screen name="Quizz page" component={QuizzPageScreen} />
            <Stack.Screen name="Créer quizz" component={CreateQuizz} options={{presentation: 'modal'}} />
            <Stack.Screen name="create question" component={CreateQuestionScreen} options={{presentation: 'modal'}} />
            <Stack.Screen name="update question" component={PutQuestions} options={{presentation: 'modal'}}/>
            <Stack.Screen name="create reponse" component={CreateReponse} options={{presentation: 'modal'}} />
            <Stack.Screen name='update reponse' component={PutReponse} options={{presentation: 'modal'}}/>
            <Stack.Screen name='make qcm' component={MakeQuizzScreen} />
            
        </Stack.Navigator>
    );
};