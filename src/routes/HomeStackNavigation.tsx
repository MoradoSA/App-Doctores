import { StackCardStyleInterpolator, createStackNavigator } from '@react-navigation/stack';
import { HomeScreens } from '../screens/HomeScreens';
import { NetworkCheckScreens } from '../components/NetworkCheckScreens';
import { CheckVersionAppScreens } from '../components/CheckVersionAppScreens';
import { DetalleEstudioScreens } from '../screens/Estudios/DetalleEstudioScreens';
import { VerEstudioScreens } from '../screens/Estudios/VerEstudioScreens';
import {  VerOrdenScreens } from '../screens/Estudios/VerOrdenScreens';


export type RootStackParams = {
 
  HomeScreens: undefined;
  DetalleEstudioScreens: undefined;
  VerEstudioScreens: undefined;
  VerOrdenScreens: undefined;
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

export const HomeStackNavigation = () => {
  return (
    <Stack.Navigator 
    initialRouteName='HomeScreens'
    screenOptions={{
      headerShown: false,
    }}>
     
      <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="HomeScreens" component={HomeScreens} />
      <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="DetalleEstudioScreens" component={DetalleEstudioScreens} />
      <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="VerEstudioScreens" component={VerEstudioScreens} />
      <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="VerOrdenScreens" component={VerOrdenScreens} />
      <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="NetworkCheckScreens" component={NetworkCheckScreens} />
      <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="CheckVersionAppScreens" component={CheckVersionAppScreens} />
    </Stack.Navigator>
  );
}