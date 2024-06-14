import { StackCardStyleInterpolator, createStackNavigator } from '@react-navigation/stack';
import { SugerenciaScreens } from '../screens/Sugerencia/SugerenciaScreens';
import { NetworkCheckScreens } from '../components/NetworkCheckScreens';
import { CheckVersionAppScreens } from '../components/CheckVersionAppScreens';


export type RootStackParams = {
 
  SugerenciaScreens: undefined;
  NetworkCheckScreens: undefined;
  CheckVersionAppScreens: undefined;

}

const Stack = createStackNavigator();


const fadeAnimation: StackCardStyleInterpolator = ({ current }) => {

  return {
    cardStyle: {
      opacity: current.progress,
    }
  }
}

export const SugerenciaStackNavigation = () => {
  return (
    <Stack.Navigator 
    initialRouteName='SugerenciaScreens'
    screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="LoadingSreens" component={SugerenciaScreens} />
      <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="NetworkCheckScreens" component={NetworkCheckScreens} />
      <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="CheckVersionAppScreens" component={CheckVersionAppScreens} />
    </Stack.Navigator>
  );
}