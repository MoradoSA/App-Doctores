import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PerfilScreens } from '../screens/PerfilScreens';
import { CuentaScreens } from '../screens/Configuracion/CuentaScreens';
import { DetalleEstudioScreens } from '../screens/Estudios/DetalleEstudioScreens';

const Tab = createBottomTabNavigator();

export const BottonTabNavigation = () =>{
  return (
    <Tab.Navigator>
      <Tab.Screen name="tab1" component={DetalleEstudioScreens} />
      <Tab.Screen name="tab2" component={PerfilScreens} />
      <Tab.Screen name="tab3" component={CuentaScreens} />
    </Tab.Navigator>
  );
}