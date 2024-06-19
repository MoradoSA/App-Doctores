import { StackCardStyleInterpolator, createStackNavigator } from '@react-navigation/stack';
import { HomeScreens } from '../screens/HomeScreens';
import {  VerOrdenScreens } from '../screens/Estudios/VerOrdenScreens';
import { VerEstudioScreens } from '../screens/Estudios/VerEstudioScreens';
import { DetalleEstudioScreens } from '../screens/Estudios/DetalleEstudioScreens';
import { NetworkCheckScreens } from '../components/NetworkCheckScreens';
import { CheckVersionAppScreens } from '../components/CheckVersionAppScreens';
import { InicioBienvenidoScreens } from '../screens/Estudios/InicioBienvenidoScreens';

export type RootStackParams = {
 
  HomeScreens: undefined;
  InicioBienvenidoScreens: undefined;
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
    initialRouteName='InicioBienvenidoScreens'
    screenOptions={{
      headerShown: false,
    }}>
     
      <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="HomeScreens" component={HomeScreens} />
      <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="InicioBienvenidoScreens" component={InicioBienvenidoScreens} />
      <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="DetalleEstudioScreens" component={DetalleEstudioScreens} />
      <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="VerEstudioScreens" component={VerEstudioScreens} />
      <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="VerOrdenScreens" component={VerOrdenScreens} />
      <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="NetworkCheckScreens" component={NetworkCheckScreens} />
      <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="CheckVersionAppScreens" component={CheckVersionAppScreens} />
    </Stack.Navigator>
  );
}