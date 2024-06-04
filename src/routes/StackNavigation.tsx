import { StackCardStyleInterpolator, createStackNavigator } from '@react-navigation/stack';
import { HomeScreens } from '../screens/HomeScreens';
import { LoadingSreens } from '../screens/LoadingSreens';
import { LoginScreens } from '../screens/LoginScreens';
import { PerfilScreens } from '../screens/PerfilScreens';
import { BottonTabNavigation } from './BottonTabNavigation';


export type RootStackParams = {
    LoginScreens: undefined;
    LoadingSreens: undefined;
    HomeScreens: undefined;
    PerfilScreens: undefined;
}

const Stack = createStackNavigator();

const fadeAnimation: StackCardStyleInterpolator = ({ current}) => {
  
    return {
      cardStyle: {
        opacity: current.progress,
      }
    }
  }

export const StackNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}
            initialRouteName='LoadingSreens'>
            <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="LoadingSreens" component={LoadingSreens} />
            <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="LoginScreens" component={LoginScreens} />
            <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="HomeScreens" component={HomeScreens} />
            <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="PerfilScreens" component={PerfilScreens} />
            
        </Stack.Navigator>
    );
}