import React, { useEffect, useState } from 'react'
import { StyleSheet, useWindowDimensions, Image, ToastAndroid } from 'react-native'
import { Button, Layout, Text } from '@ui-kitten/components'
import { Popup, Root } from 'popup-ui'
import Loader from 'react-native-modal-loader'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { MyIcon } from '../../components/ui/MyIcon'
import { useLinkTo, useNavigation } from '@react-navigation/native'
import { NetworkCheckScreens } from '../../components/NetworkCheckScreens'
import { CheckVersionAppScreens } from '../../components/CheckVersionAppScreens'
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs'
import { useAuthStore } from '../../store/auth/useAuthStore'
import LinearGradient from 'react-native-linear-gradient'
import { isEmpty } from 'lodash'


export const RecetarioListadoScreens = () => {
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(false)
  const linkTo = useLinkTo()
  const { userData } = useAuthStore()
  let dataOrden = ''
  let logoClinica = ''
  let firmaDoctor = ''


  const iniciarOrdenMedica = () => {
    navigation.navigate('RecetarioPacienteScreens' as never)
  }

  const getDataOrden = async () => {
    try {
      let data = JSON.parse(await AsyncStorage.getItem("@ordenData"))
      dataOrden = data
      logoClinica = await RNFS.readFile(data.logo, "base64")
      firmaDoctor = await RNFS.readFile(data.firma, "base64")
      if (isEmpty(firmaDoctor)) {
        Popup.show({
          type: 'Warning',
          title: 'Error',
          textBody: 'No tiene la firma del doctor',
          buttontext: 'Regresar',
          callback: () => {
            Popup.hide()
            navigation.navigate('FirmaDigitalScreens' as never)
          }
        })
      } else if (isEmpty(logoClinica)) {
        Popup.show({
          type: 'Warning',
          title: 'Error',
          textBody: 'No tiene los datos de la Clinica',
          buttontext: 'Regresar',
          callback: () => {
            Popup.hide()
            navigation.navigate('DatosOrdenDoctorScreens' as never)
          }
        })
      }
    } catch (error) {
      Popup.show({
        type: 'Warning',
        title: 'Error!',
        textBody: 'No tiene, ni la firma, ni los datos de la clinica',
        buttonText: 'Ok',
        callback() {
          Popup.hide()
        }
      })
    }
  }

  const  getDataApp  = async() =>{
    try {
        let data = JSON.parse(await AsyncStorage.getItem("@ordenData"))

      //TODO: Validamos si es que existe los datos de la clinica.  
      if(isEmpty(data.logo)){
        Popup.show({
          type: 'Warning',
          title: 'Error!',
          textBody: 'No tiene los datos de la clinica',
          buttonText: 'Ok',
          callback() {
            Popup.hide()
            navigation.navigate('DatosOrdenDoctorScreens' as never)
          }
        })
      }else{
        logoClinica = await RNFS.readFile(data.logo, "base64")
      }

      //TODO: Validamos si es que el doctor ya tiene una firma.
      if(isEmpty(data.firma)){
        Popup.show({
          type: 'Warning',
          title: 'Error!',
          textBody: 'No tiene la firma del doctor',
          buttonText: 'Ok',
          callback() {
            Popup.hide()
            navigation.navigate('FirmaDigitalScreens' as never)
          }
        })
      }else{
        firmaDoctor = await RNFS.readFile(data.firma, "base64")
        console.log(firmaDoctor)
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    //getDataOrden()
    getDataApp()

  }, [])

  return (
    <Root>


      <LinearGradient
        colors={['#7FDFF0', '#fff', '#fff', '#91E4F2']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={{ flex: 1 }}
      >
        <Layout style={styles.container}>
          <NetworkCheckScreens />
          <CheckVersionAppScreens />
          <Loader loading={isLoading} size="large" title="Cargando..." color="#ff66be" />
          <Layout style={styles.headerContainer}>
            <Layout style={{ margin: 10, backgroundColor: 'transparent', }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('HomeScreens' as never)}
              >
                <MyIcon name="arrow-back-outline"
                />
              </TouchableOpacity>
            </Layout>
            <Layout style={styles.headerTextContainer}>
              <Text style={styles.headerText}>Recetario Medico</Text>
            </Layout>
          </Layout>

          <Layout style={styles.containerInfoOrden}>
            <Image source={require('../../assets/images/orden.png')} style={styles.image} />
            <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Orden medica digital</Text>
            <Text style={{ textAlign: 'center', alignSelf: 'center' }}>Aqui podemos crear la orden medica digital</Text>
            <Text style={{ textAlign: 'center', alignSelf: 'center', marginBottom: 10 }}>Debe proporcionar datos del paciente, sus estudios y alguna otra observacion para la realizacion de los    mismos</Text>
            <Button
              accessoryRight={<MyIcon name='arrow-ios-forward-outline' />}
              onPress={iniciarOrdenMedica}
            >
              Empecemos
            </Button>
          </Layout>
        </Layout>
      </LinearGradient>
    </Root>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  headerContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    marginHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: 'black',

  },

  headerTextContainer: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    marginHorizontal: 40,

  },
  headerText: {
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 900,

  },

  containerInfoOrden: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },

  image: {
    width: 270,
    height: 350,
  },

  button: {
    backgroundColor: 'blue',
  }
})