import React, { useEffect } from 'react'
import { Layout, Text, Avatar, Icon, IconElement, Menu, MenuItem } from '@ui-kitten/components'
import { NetworkCheckScreens } from '../../components/NetworkCheckScreens'
import { CheckVersionAppScreens } from '../../components/CheckVersionAppScreens'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useAuthStore } from '../../store/auth/useAuthStore'
import { MyIcon } from '../../components/ui/MyIcon'
import LinearGradient from 'react-native-linear-gradient'



export const CuentaScreens = () => {
  const navigation = useNavigation();
  const { logout, usuario, userData } = useAuthStore()



const fileIcon = (props:any): IconElement => (
  <Icon
    {...props}
    name='file-text-outline'
  />
);


const lockIcon = (props:any): IconElement => (
  <Icon
    {...props}
    name='cast-outline'
  />
);

const logOutIcon = (props:any): IconElement => (
  <Icon
    {...props}
    name='log-out-outline'
  />
);

const ForwardIcon = (props:any): IconElement => (
  <Icon
    {...props}
    name='arrow-ios-forward'
  />
);

  return (
    <>
    <LinearGradient
        style={{ flex: 1 }}
        colors={['#7FDFF0', '#fff', '#fff', '#91E4F2']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
      >
      <Layout style={{
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center'
      }}>

        <Layout style={style.headerContainer}>
          <Layout style={style.headerIcon}>
            <MyIcon name='person-outline' />
          </Layout>
          <Layout style={{ ...style.headerTextContainer, margin: 15 }}>
            <Text style={style.headerText}>Configuración</Text>
          </Layout>
        </Layout>
        <Layout style={style.details}>
          <Avatar
            size='giant'
            source={{ uri: `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${usuario?.nombre}&size=140&rounded=true` }}
          />
          <Text
            style={style.title}
            category='h5'
          >{usuario?.nombre}</Text>
        </Layout>
        <Layout style={ style.navContainer }>
        <Menu style={ style.menu}>
        <MenuItem
          style={style.subMenu }
          title={<Text style={ style.textMenu }>Datos para el Doctor</Text>}
          accessoryLeft={fileIcon}
          accessoryRight={ForwardIcon}
          onPress={()=>navigation.navigate('DatosOrdenDoctorScreens' as never)}
        />
        <MenuItem
        style={style.subMenu }
        title={<Text style={ style.textMenu }>Firma Digital</Text>}
          accessoryLeft={lockIcon}
          accessoryRight={ForwardIcon}
          onPress={()=> navigation.navigate('FirmaDigitalScreens' as never)}
        />
        <MenuItem
          style={style.subMenu }
          title={<Text style={ style.textMenu }>Cerrar Sesión</Text>}
          accessoryLeft={logOutIcon}
          accessoryRight={ForwardIcon}
          onPress={logout}
        />
      </Menu>
        </Layout>
      </Layout>
      </LinearGradient>
    </>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',

  },

  headerContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    marginHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginBottom: 15,

  },

  headerIcon: {
    backgroundColor: 'transparent',
    margin: 10,
  },

  headerTextContainer: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    marginHorizontal: 45,
    marginLeft: 25

  },

  headerText: {
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 900,

  },

  details: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
    marginVertical: 4,
  },

  title: {
    marginHorizontal: 8,
  },

  navContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    width: 350,
  },

  menu: {
    backgroundColor: 'transparent',
    marginTop: 15,
    
  },

  subMenu:{
    backgroundColor: 'transparent',
    height: 70,
    borderWidth: 0,
    borderColor: 'transparent',
    marginBottom: 5,
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.10,
    shadowRadius: 12.35,

 
  },
  
  textMenu:{
    fontSize: 21,
  },


})



