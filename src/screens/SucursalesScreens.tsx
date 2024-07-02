import React, { useEffect, useState } from 'react'
import { Layout, Text, Icon, IconElement, Menu, MenuItem, MenuGroup } from '@ui-kitten/components'
import { Linking, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { MyIcon } from '../components/ui/MyIcon'
import LinearGradient from 'react-native-linear-gradient'
import UrlHandler from 'react-native-url-handler'
import { ScrollView } from 'react-native-gesture-handler'




export const SucursalesScreens = () => {
  const navigation = useNavigation();
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const [message, setMessage] = useState('');
  const horaActual = new Date().toTimeString()
  const horaInicio = 8
  const horaCierre = 18
  const diaActual = new Date().getDay()
  const mensaje = 'Hola, Como esta? Tengo una consulta'
  const nemby = '0985677912'
  const mariano = '0982100609'
  const azara = '0984557644'
  const itaugua = '0981636301'
  const luque = '0984557179'
  const km5 = '0985464550'
  const Sloren = '0984560367'
  const lambare = '0986227216'
  const capiata = '0984589232'
  const carape = '0984389512'

  
  
  useEffect(() => {
    if( diaActual === 0 && horaActual === '7:00:00' && horaActual >= '18:00:00' ){
        console.log('La sucursal esta abierta')
        console.log(diaActual)
    }else{
      console.log('La sucursal esta cerrada')
      //console.log(diaActual)
    }
  }, [])


  const sendMensajeNemby = async () => {
    const text = encodeURIComponent(mensaje)
    const url = `https://api.whatsapp.com/send?phone=595${nemby}&text=${text}`

    try {
      await Linking.openURL(url)
    } catch (error) {
      console.log(error)
    }

  }

  const sendMensajeMariano = async () => {
    const text = encodeURIComponent(mensaje)
    const url = `https://api.whatsapp.com/send?phone=595${mariano}&text=${text}`

    try {
      await Linking.openURL(url)
    } catch (error) {
      console.log(error)
    }

  }

  const sendMensajeAzara = async () => {
    const text = encodeURIComponent(mensaje)
    const url = `https://api.whatsapp.com/send?phone=595${azara}&text=${text}`

    try {
      await Linking.openURL(url)
    } catch (error) {
      console.log(error)
    }

  }

  const sendMensajeItaugua = async () => {
    const text = encodeURIComponent(mensaje)
    const url = `https://api.whatsapp.com/send?phone=595${itaugua}&text=${text}`

    try {
      await Linking.openURL(url)
    } catch (error) {
      console.log(error)
    }

  }

  const sendMensajeLuque = async () => {
    const text = encodeURIComponent(mensaje)
    const url = `https://api.whatsapp.com/send?phone=595${luque}&text=${text}`

    try {
      await Linking.openURL(url)
    } catch (error) {
      console.log(error)
    }

  }

  const sendMensajeKM5 = async () => {
    const text = encodeURIComponent(mensaje)
    const url = `https://api.whatsapp.com/send?phone=595${km5}&text=${text}`

    try {
      await Linking.openURL(url)
    } catch (error) {
      console.log(error)
    }

  }


  const sendMensajeSanLorenzo = async () => {
    const text = encodeURIComponent(mensaje)
    const url = `https://api.whatsapp.com/send?phone=595${Sloren}&text=${text}`

    try {
      await Linking.openURL(url)
    } catch (error) {
      console.log(error)
    }

  }

  const sendMensajeLambare = async () => {
    const text = encodeURIComponent(mensaje)
    const url = `https://api.whatsapp.com/send?phone=595${lambare}&text=${text}`

    try {
      await Linking.openURL(url)
    } catch (error) {
      console.log(error)
    }

  }


  const sendMensajeCapiata = async () => {
    const text = encodeURIComponent(mensaje)
    const url = `https://api.whatsapp.com/send?phone=595${capiata}&text=${text}`

    try {
      await Linking.openURL(url)
    } catch (error) {
      console.log(error)
    }

  }



  const sendMensajeCarapegua = async () => {
    const text = encodeURIComponent(mensaje)
    const url = `https://api.whatsapp.com/send?phone=595${carape}&text=${text}`

    try {
      await Linking.openURL(url)
    } catch (error) {
      console.log(error)
    }

  }

  const sucursalIcon = (props: any): IconElement => (
    <Icon
      {...props}
      name='home-outline'
    />
  );




  const directionIcon = (props: any): IconElement => (
    <Icon
      {...props}
      name='arrow-ios-forward-outline'
    />

  );

  const locationIcon = (props: any): IconElement => (
    <Icon
      {...props}
      name='navigation-2-outline'
    />
  )

  const phoneIcon = (props: any): IconElement => (
    <Icon
      {...props}
      name='smartphone-outline'
    />
  )



 
  return (
    <LinearGradient
      colors={['#7FDFF0', '#fff', '#fff', '#91E4F2']}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={{ flex: 1 }}
    >
      <Layout style={{
        flex: 1,
        alignItems: 'center'
      }}>

        <Layout style={style.headerContainer}>
          <Layout style={style.headerIcon}>
            <MyIcon name='home-outline' />
          </Layout>
          <Layout style={{ ...style.headerTextContainer, margin: 15 }}>
            <Text style={style.headerText}>Sucursales Arco</Text>
          </Layout>
        </Layout>
        <Layout style={style.navContainer}>
          <Menu
            style={style.menu}
            selectedIndex={selectedIndex}
            onSelect={index => setSelectedIndex(index)}
          >
            <MenuGroup
              style={{
                height: 80,
              }} 
              title={ diaActual === 0 && horaActual === '8:00:00' && horaActual >= '18:00:00' ? <Text>Arco Ñemby: <Text style={style.infoCerrado}>Cerrado</Text></Text> : <Text>Arco Ñemby:<Text style={style.infoAbierto}> Abierto</Text></Text>}
              accessoryLeft={sucursalIcon}
            >
              <MenuItem
                style={style.subMenu}
                title={<Text>Whatsapp</Text>}
                accessoryLeft={phoneIcon}
                accessoryRight={directionIcon}
                onPress={sendMensajeNemby}
              />
              <MenuItem
                style={style.subMenu}
                title={<Text>Ubicacion de la clinica</Text>}
                accessoryLeft={locationIcon}
                accessoryRight={directionIcon}
                onPress={() => Linking.openURL(`https://www.google.com/maps?q=-25.3971358,-57.5434319`)}
              />

            </MenuGroup>

            <MenuGroup
              style={{
                height: 80,
              }}
              title={ diaActual === 0 && horaActual === '8:00:00' && horaActual >= '18:00:00' ? <Text>Arco Mariano: <Text style={style.infoCerrado}>Cerrado</Text></Text> : <Text>Arco Mariano:<Text style={style.infoAbierto}> Abierto</Text></Text>}
              accessoryLeft={sucursalIcon}
            >
              <MenuItem
                style={style.subMenu}
                title={<Text>Whatsapp</Text>}
                accessoryLeft={phoneIcon}
                accessoryRight={directionIcon}
                onPress={sendMensajeMariano}
              />
              <MenuItem
                style={style.subMenu}
                title={<Text>Ubicacion de la clinica</Text>}
                accessoryLeft={locationIcon}
                accessoryRight={directionIcon}
                onPress={() => Linking.openURL(`https://www.google.com/maps?q=-25.2119731,-57.5298478`)}
              />
            </MenuGroup>

            <MenuGroup
              style={{
                height: 80,
              }}
              title={ diaActual === 0 && horaActual === '8:00:00' && horaActual >= '18:00:00' ? <Text>Arco Azara: <Text style={style.infoCerrado}>Cerrado</Text></Text> : <Text>Arco Azara:<Text style={style.infoAbierto}> Abierto</Text></Text>}
              accessoryLeft={sucursalIcon}
            >
              <MenuItem
                style={style.subMenu}
                title={<Text>Whatsapp</Text>}
                accessoryLeft={phoneIcon}
                accessoryRight={directionIcon}
                onPress={sendMensajeAzara}
              />
              <MenuItem
                style={style.subMenu}
                title={<Text>Ubicacion de la clinica</Text>}
                accessoryLeft={locationIcon}
                accessoryRight={directionIcon}
                onPress={() => Linking.openURL(`https://www.google.com/maps/search/Clinica%20A.R.C.O%20Centro/@-25.292122,-57.621994,17z`)}
              />
            </MenuGroup>

            <MenuGroup
              style={{
                height: 80,
              }}
              title={ diaActual === 0 && horaActual === '8:00:00' && horaActual >= '18:00:00' ? <Text>Arco Itaugua: <Text style={style.infoCerrado}>Cerrado</Text></Text> : <Text>Arco Itaugua:<Text style={style.infoAbierto}> Abierto</Text></Text>}
              accessoryLeft={sucursalIcon}
            >
              <MenuItem
                style={style.subMenu}
                title={<Text>Whatsapp</Text>}
                accessoryLeft={phoneIcon}
                accessoryRight={directionIcon}
                onPress={sendMensajeItaugua}
              />
              <MenuItem
                style={style.subMenu}
                title={<Text>Ubicacion de la clinica</Text>}
                accessoryLeft={locationIcon}
                accessoryRight={directionIcon}
                onPress={() => Linking.openURL(`https://www.google.com/maps?q=-25.3928939,-57.3521956`)}
              />
            </MenuGroup>

            <MenuGroup
              style={{
                height: 80,
              }}
              title={ diaActual === 0 && horaActual === '8:00:00' && horaActual >= '18:00:00' ? <Text>Arco Luque: <Text style={style.infoCerrado}>Cerrado</Text></Text> : <Text>Arco Luque:<Text style={style.infoAbierto}> Abierto</Text></Text>}
              accessoryLeft={sucursalIcon}
            >
              <MenuItem
                style={style.subMenu}
                title={<Text>Whatsapp</Text>}
                accessoryLeft={phoneIcon}
                accessoryRight={directionIcon}
                onPress={sendMensajeLuque}
              />
              <MenuItem
                style={style.subMenu}
                title={<Text>Ubicacion de la clinica</Text>}
                accessoryLeft={locationIcon}
                accessoryRight={directionIcon}
                onPress={() => Linking.openURL(`https://www.google.com/maps/search/Cl%C3%ADnica%20Arco%20Luque/@-25.261,-57.4902,17z`)}
              />
            </MenuGroup>

            <MenuGroup
              style={{
                height: 80,
              }}
              title={ diaActual === 0 && horaActual === '8:00:00' && horaActual >= '18:00:00' ? <Text>Arco Km5: <Text style={style.infoCerrado}>Cerrado</Text></Text> : <Text>Arco Km5:<Text style={style.infoAbierto}> Abierto</Text></Text>}
              accessoryLeft={sucursalIcon}
            >
              <MenuItem
                style={style.subMenu}
                title={<Text>Whatsapp</Text>}
                accessoryLeft={phoneIcon}
                accessoryRight={directionIcon}
                onPress={sendMensajeKM5}
              />
              <MenuItem
                style={style.subMenu}
                title={<Text>Ubicacion de la clinica</Text>}
                accessoryLeft={locationIcon}
                accessoryRight={directionIcon}
                onPress={() => Linking.openURL(`https://www.google.com/maps?q=-25.3183551,-57.5736967`)}
              />
            </MenuGroup>

            <MenuGroup
              style={{
                height: 80,
              }}
              title={ diaActual === 0 && horaActual === '7:00:00' && horaActual >= '18:00:00' ? <Text>Arco San Lorenzo: <Text style={style.infoCerrado}>Cerrado</Text></Text> : <Text>Arco San Lorenzo:<Text style={style.infoAbierto}> Abierto</Text></Text>}
              accessoryLeft={sucursalIcon}
            >
              <MenuItem
                style={style.subMenu}
                title={<Text>Whatsapp</Text>}
                accessoryLeft={phoneIcon}
                accessoryRight={directionIcon}
                onPress={sendMensajeSanLorenzo}
              />
              <MenuItem
                style={style.subMenu}
                title={<Text>Ubicacion de la clinica</Text>}
                accessoryLeft={locationIcon}
                accessoryRight={directionIcon}
                onPress={() => Linking.openURL(`https://www.google.com/maps?q=-25.3459817,-57.5060017`)}
              />
            </MenuGroup>

            <MenuGroup
              style={{
                height: 80,
              }}
              title={ diaActual === 0 && horaActual === '8:00:00' && horaActual >= '18:00:00' ? <Text>Arco Lambare: <Text style={style.infoCerrado}>Cerrado</Text></Text> : <Text>Arco Lambare:<Text style={style.infoAbierto}> Abierto</Text></Text>}
              accessoryLeft={sucursalIcon}
            >
              <MenuItem
                style={style.subMenu}
                title={<Text>Whatsapp</Text>}
                accessoryLeft={phoneIcon}
                accessoryRight={directionIcon}
                onPress={sendMensajeLambare}
              />
              <MenuItem
                style={style.subMenu}
                title={<Text>Ubicacion de la clinica</Text>}
                accessoryLeft={locationIcon}
                accessoryRight={directionIcon}
                onPress={() => Linking.openURL(`https://www.google.com/maps?q=-25.3341489,-57.6210606`)}
              />
            </MenuGroup>
            <MenuGroup
              style={{
                height: 80,
              }}
              title={diaActual === 0 && horaActual === '8:00:00' && horaActual >= '18:00:00' ? <Text>Arco Capiata: <Text style={style.infoCerrado}>Cerrado</Text></Text> : <Text>Arco Capiata:<Text style={style.infoAbierto}> Abierto</Text></Text>}
              accessoryLeft={sucursalIcon}
            >
              <MenuItem
                style={style.subMenu}
                title={<Text>Whatsapp</Text>}
                accessoryLeft={phoneIcon}
                accessoryRight={directionIcon}
                onPress={sendMensajeCapiata}
              />
              <MenuItem
                style={style.subMenu}
                title={<Text>Ubicacion de la clinica</Text>}
                accessoryLeft={locationIcon}
                accessoryRight={directionIcon}
                onPress={() => Linking.openURL(`https://www.google.com/maps?q=-25.3506835,-57.4393642`)}
              />
            </MenuGroup>

            <MenuGroup
              style={{
                height: 80,
              }}
              title={ diaActual === 0 && horaActual === '8:00:00' && horaActual >= '18:00:00' ? <Text>Arco Carapegua: <Text style={style.infoCerrado}>Cerrado</Text></Text> : <Text>Arco Carapegua:<Text style={style.infoAbierto}> Abierto</Text></Text>}
              accessoryLeft={sucursalIcon}
            >
              <MenuItem
                style={style.subMenu}
                title={<Text>Whatsapp</Text>}
                accessoryLeft={phoneIcon}
                accessoryRight={directionIcon}
                onPress={sendMensajeCarapegua}
              />
              <MenuItem
                style={style.subMenu}
                title={<Text>Ubicacion de la clinica</Text>}
                accessoryLeft={locationIcon}
                accessoryRight={directionIcon}
                onPress={() => Linking.openURL(`https://www.google.com/maps?q=-25.7680108,-57.2405996`)}
              />
            </MenuGroup>

            <MenuGroup

            >
              <MenuItem

              />
              <MenuItem

              />
            </MenuGroup>
          </Menu>
        </Layout>
      </Layout>
    </LinearGradient>
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
    marginHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginBottom: 15,
    backgroundColor: 'transparent'

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
    backgroundColor: 'transparent',
    marginTop: 15,
    fontSize: 25,

  },

  subMenu: {
    height: 70,
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.50,
    shadowRadius: 12.35,
    elevation: 10,
    marginBottom: 10,
  },

  infoCerrado: {
    color: '#E01909',
    fontWeight: 900,
  },

  infoAbierto: {
    color: '#11C232',
    fontWeight: 900,
  },



})




