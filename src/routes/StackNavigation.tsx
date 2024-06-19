import { StackCardStyleInterpolator, createStackNavigator } from '@react-navigation/stack';

import { LoadingSreens } from '../screens/LoadingSreens';
import { LoginScreens } from '../screens/LoginScreens';
import { NetworkCheckScreens } from '../components/NetworkCheckScreens';
import { CheckVersionAppScreens } from '../components/CheckVersionAppScreens';
import { BottonTabsNavigation } from './BottonTabsNavigation';
import { DatosOrdenDoctorScreens } from '../screens/Configuracion/DatosOrdenDoctorScreens';
import { BottonTabLoginNavigation } from './BottonTabLoginNavigation';


export type RootStackParams = {
  LoginScreens: undefined;
  LoadingSreens: undefined;
  BottonTabsNavigation: undefined;
  BottonTabLoginNavigation: undefined;
  NetworkCheckScreens: undefined;
  CheckVersionAppScreens: undefined;
  DatosOrdenDoctorScreens: undefined;

}

const Stack = createStackNavigator();


const fadeAnimation: StackCardStyleInterpolator = ({ current }) => {

  return {
    cardStyle: {
      opacity: current.progress,
    }
  }
}

export const StackNavigation = () => {
  return (
    <Stack.Navigator 
    initialRouteName='LoadingSreens'
    screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="LoadingSreens" component={LoadingSreens} />
      <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="LoginScreens" component={LoginScreens} />
 
      <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="BottonTabLoginNavigation" component={BottonTabLoginNavigation} />
      <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="BottonTabsNavigation" component={BottonTabsNavigation} />
      <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="NetworkCheckScreens" component={NetworkCheckScreens} />
      <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="CheckVersionAppScreens" component={CheckVersionAppScreens} />
      <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="DatosOrdenDoctorScreens" component={DatosOrdenDoctorScreens} />
    </Stack.Navigator>
  );
}