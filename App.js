import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import AccountScreen from './src/screens/AccountScreen';
import EmailSentScreen from './src/screens/EmailSentScreen';
import EmailArchive from './src/screens/EmailArchive';
import EmailDetailScreen from './src/screens/EmailDetailScreen';
import SignupScreen from './src/screens/SignupScreen';
import SigninScreen from './src/screens/SigninScreen';
import {Provider as AuthProvider} from './src/context/AuthContext';
import {setNavigator} from './src/navigationRef';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import { Provider as EmailProvider } from './src/context/EmailContext';



const switchNavigator = createSwitchNavigator({
  ResolveAuthScreen: ResolveAuthScreen,
  loginFlow: stackNavigator = createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen
    
  }),
  mainFlow: createBottomTabNavigator({
    EmailSend: EmailSentScreen,
    EmailListFlow: createStackNavigator({
      EmailArchive: EmailArchive,
      EmailDetail: EmailDetailScreen
          
    }),
    Account: AccountScreen

  })
});

const App = createAppContainer(switchNavigator);

export default () =>{
  return (
    <EmailProvider>
      <AuthProvider>
        <App ref={(navigator) => {setNavigator(navigator)}}/>
      </AuthProvider>
    </EmailProvider>
  );
};