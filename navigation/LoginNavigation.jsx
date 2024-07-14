import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginPage from "../Components/LoginPage";
import CreateAccountPage from "../Components/CreateAccountPage";
import QuizContainer from "../Components/QuizContainer";

const Stack = createNativeStackNavigator();

export default function LoginNavigation({setIsLoggedIn}) {
  return (

      <Stack.Navigator screenOptions={{headerShown: false, animation:"none"}}  >
         <Stack.Screen name='LogIn'>
        {props => <LoginPage {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
        <Stack.Screen name="CreateAccount" component={CreateAccountPage} />
        <Stack.Screen name="Play" component={QuizContainer} />
      </Stack.Navigator>

  );
}
