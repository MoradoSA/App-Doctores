import {  StyleSheet, TouchableOpacity } from 'react-native';
import { Layout, Text, Icon } from '@ui-kitten/components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStackNavigation } from './HomeStackNavigation';
import { RecetarioStackNavigation } from './RecetarioStackNavigation';
import { SugerenciaStackNavigation } from './SugerenciaStackNavigation';
import { CuentaStackNavigation } from './CuentaStackNavigation';


const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress}: any) =>{
  <TouchableOpacity style={{
    top: -30,
  }}>
    <Layout>
      {children}
    </Layout>
  </TouchableOpacity>
}

export const  BottonTabsNavigation = () => {
  return (
    <Tab.Navigator 
    initialRouteName='HomeScreens'
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: 'tomato',
      tabBarShowLabel: false,
      tabBarStyle: {
        position: 'absolute',
        bottom: 5,
        left: 20,
        right: 20,
        backgroundColor: '#fff',
        borderRadius: 15,
        height: 70,
       ...styles.shadow
      }

    }}
    >
      <Tab.Screen name="Home" component={HomeStackNavigation} options={{
        tabBarIcon: ({focused}) =>(
          <Layout>
            <Icon name='home-outline' style={{
              with: 28,
              height: 28,
              resizeMode: 'contain',
              tintColor: focused ? '#1A4ADF' : 'black',
              
            }}/>
            <Text style={{
              fontSize: 12,
              color: focused ? '#1A4ADF' : 'black',
            }}>Panel</Text>
          </Layout>
        )
      }}/>
      <Tab.Screen name="Recetario" component={RecetarioStackNavigation} options={{
        tabBarIcon: ({focused}) =>(
          <Layout>
            <Icon name='file-text-outline' style={{
              with: 28,
              height: 28,
              resizeMode: 'contain',
              tintColor: focused ? '#1A4ADF' : 'black',
              
            }}/>
            <Text style={{
              fontSize: 12,
              color: focused ? '#1A4ADF' : 'black',
            }}>Recetario</Text>
          </Layout>
        )
      }}/>
      <Tab.Screen name="Sugerencia" component={SugerenciaStackNavigation} options={{
        tabBarIcon: ({focused}) =>(
          <Layout>
            <Icon name='message-circle-outline' style={{
              with: 28,
              height: 28,
              resizeMode: 'contain',
              tintColor: focused ? '#1A4ADF' : 'black',
              
            }}/>
            <Text style={{
              fontSize: 12,
              color: focused ? '#1A4ADF' : 'black',
            }}>Sugerencia</Text>
          </Layout>
        )
      }} />

      <Tab.Screen name="Settings" component={CuentaStackNavigation} options={{
        tabBarIcon: ({focused}) =>(
          <Layout>
            <Icon name='clipboard-outline' style={{
              with: 28,
              height: 28,
              resizeMode: 'contain',
              tintColor: focused ? '#1A4ADF' : 'black',
              
            }}/>
            <Text style={{
              fontSize: 12,
              color: focused ? '#1A4ADF' : 'black',
            }}>Clinica</Text>
          </Layout>
        )
      }} />
      

    </Tab.Navigator>
  );
}


const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },

 


})
