import React, { useEffect } from 'react'
import { Layout, Text, Avatar, Icon, IconElement, Menu, MenuItem } from '@ui-kitten/components'
import { NetworkCheckScreens } from '../../components/NetworkCheckScreens'
import { CheckVersionAppScreens } from '../../components/CheckVersionAppScreens'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useAuthStore } from '../../store/auth/useAuthStore'
import { MyIcon } from '../../components/ui/MyIcon'



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
      <Layout style={{
        flex: 1,
        backgroundColor: 'white',
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
          >Dr/a: {usuario?.nombre}</Text>
        </Layout>
        <Layout style={ style.navContainer }>
        <Menu style={ style.menu}>
        <MenuItem
          style={style.subMenu }
          title='Datos para la Orden'
          accessoryLeft={fileIcon}
          accessoryRight={ForwardIcon}
          onPress={()=>navigation.navigate('DatosOrdenDoctorScreens' as never)}
        />
        <MenuItem
        style={style.subMenu }
          title='Firma Digital'
          accessoryLeft={lockIcon}
          accessoryRight={ForwardIcon}
          onPress={()=> navigation.navigate('FirmaDigitalScreens' as never)}
        />
        <MenuItem
          style={style.subMenu }
          title='Cerrar Sesión'
          accessoryLeft={logOutIcon}
          accessoryRight={ForwardIcon}
          onPress={logout}
        />
      </Menu>
        </Layout>
      </Layout>
    </>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',

  },

  headerContainer: {
    flexDirection: 'row',
    marginHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginBottom: 15,
    backgroundColor: '#fff'

  },

  headerIcon: {
    margin: 10
  },

  headerTextContainer: {
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
    alignItems: 'center',
    marginVertical: 4,
  },

  title: {
    marginHorizontal: 8,
  },

  navContainer: {
    flex: 1,
    width: 350,
  },

  menu: {
    backgroundColor: 'white',
    marginTop: 15,
    fontSize: 20
    
  },

  subMenu:{
    height: 70,
    marginBottom: 5,
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.50,
    shadowRadius: 12.35,
    elevation: 10,
  }


})



