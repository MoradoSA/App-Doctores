import { StackCardStyleInterpolator, createStackNavigator } from '@react-navigation/stack';

import { NetworkCheckScreens } from '../components/NetworkCheckScreens';
import { CheckVersionAppScreens } from '../components/CheckVersionAppScreens';
import { RecetarioListadoScreens } from '../screens/Recetario/RecetarioListadoScreens';
import { RecetarioPacienteScreens } from '../screens/Recetario/RecetarioPacienteScreens';
import { RecetarioListadoEstudiosScreens } from '../screens/Recetario/RecetarioListadoEstudiosScreens';
import { RecetarioFormaEntregaScreens } from '../screens/Recetario/RecetarioFormaEntregaScreens';
import { RecetarioSegurosListadoScreens } from '../screens/Recetario/RecetarioSegurosListadoScreens';
import { RecetarioObservacionesScreens } from '../screens/Recetario/RecetarioObservacionesScreens';
import { RecetarioGeneradorScreens } from '../screens/Recetario/RecetarioGeneradorScreens';
import { FirmaDigitalScreens } from '../screens/Configuracion/FirmaDigitalScreens';
import { CuentaScreens } from '../screens/Configuracion/CuentaScreens';



export type RootStackParams = {

    RecetarioListadoScreens: undefined;
    RecetarioPacienteScreens: undefined;
    RecetarioListadoEstudiosScreens: undefined;
    RecetarioFormaEntregaScreens: undefined;
    RecetarioSegurosListadoScreens: undefined;
    RecetarioObservacionesScreens: undefined;
    RecetarioGeneradorScreens: undefined;
    FirmaDigitalScreens: undefined;
    CuentaScreens: undefined;
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

export const RecetarioStackNavigation = () => {
  return (
    <Stack.Navigator 
    initialRouteName='RecetarioListadoScreens'
    screenOptions={{
      headerShown: false,
    }}>
      
      <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="RecetarioListadoScreens" component={RecetarioListadoScreens} />
      <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="RecetarioPacienteScreens" component={RecetarioPacienteScreens} />
      <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="RecetarioListadoEstudiosScreens" component={RecetarioListadoEstudiosScreens} />
      <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="RecetarioFormaEntregaScreens" component={RecetarioFormaEntregaScreens} />
      <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="RecetarioSegurosListadoScreens" component={RecetarioSegurosListadoScreens} />
      <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="RecetarioObservacionesScreens" component={RecetarioObservacionesScreens} />
      <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="RecetarioGeneradorScreens" component={RecetarioGeneradorScreens} />
      <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="FirmaDigitalScreens" component={FirmaDigitalScreens} />
      <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="CuentaScreens" component={CuentaScreens} />
      <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="NetworkCheckScreens" component={NetworkCheckScreens} />
      <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="CheckVersionAppScreens" component={CheckVersionAppScreens} />

    </Stack.Navigator>
  );
}