import { StackCardStyleInterpolator, createStackNavigator } from '@react-navigation/stack';
import { NetworkCheckScreens } from '../components/NetworkCheckScreens';
import { CheckVersionAppScreens } from '../components/CheckVersionAppScreens';
import { DatosOrdenDoctorScreens } from '../screens/Configuracion/DatosOrdenDoctorScreens';
import { PerfilDoctorScreens } from '../screens/Configuracion/PerfilDoctorScreens';
import { CuentaScreens } from '../screens/Configuracion/CuentaScreens';
import { FirmaDigitalScreens } from '../screens/Configuracion/FirmaDigitalScreens';
import { RecetarioListadoEstudiosScreens } from '../screens/Recetario/RecetarioListadoEstudiosScreens';
import { RecetarioModeloScreens } from '../screens/Configuracion/RecetarioModeloScreens';



export type RootStackParams = {

    CuentaScreens: undefined;
    DatosOrdenDoctorScreens: undefined;
    PerfilDoctorScreens: undefined;
    FirmaDigitalScreens: undefined;
    RecetarioListadoEstudiosScreens: undefined;
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

export const CuentaStackNavigation = () => {
  return (
    <Stack.Navigator 
    initialRouteName='CuentaScreens'
    screenOptions={{
      headerShown: false,
    }}>

      <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="CuentaScreens" component={CuentaScreens} />
      <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="DatosOrdenDoctorScreens" component={DatosOrdenDoctorScreens} />
      <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="PerfilDoctorScreens" component={PerfilDoctorScreens} />
      <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="RecetarioListadoEstudiosScreens" component={RecetarioListadoEstudiosScreens} />
      <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="FirmaDigitalScreens" component={FirmaDigitalScreens} />
      <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="CheckVersionAppScreens" component={CheckVersionAppScreens} />
      <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="NetworkCheckScreens" component={NetworkCheckScreens} />

    </Stack.Navigator>
  );
}