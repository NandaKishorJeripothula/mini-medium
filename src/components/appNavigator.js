
import { createStackNavigator, createAppContainer, createBottomTabNavigator, TabNavigator, StackNavigator } from 'react-navigation';

import Home from './home';
import SignUp from './signup';
import Articles from './articles';
import Profile from './profile'

const AppNavigator = createStackNavigator({
    Home: Home,
    SignUp: SignUp,
    Profile: Profile,
    Articles: Articles,

}, {
        initialRouteName: 'Home',
        /* The header config from HomeScreen is now here */
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#6b52ae',
            },
            headerTintColor: '#Efef',
            headerTitleStyle: {
                // fontWeight: 'bold',
            },
        },
    });

export default AppContainer = createAppContainer(AppNavigator);
