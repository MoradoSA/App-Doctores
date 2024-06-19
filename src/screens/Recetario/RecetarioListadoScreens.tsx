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
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAuthStore } from '../../store/auth/useAuthStore'
import LinearGradient from 'react-native-linear-gradient'


export const RecetarioListadoScreens = () => {
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(true)
  const linkTo = useLinkTo()
  const { userData } = useAuthStore()


  const iniciarOrdenMedica = () => {
    navigation.navigate('RecetarioPacienteScreens' as never)
  }

  const validarDatosDoctor = () => {
    AsyncStorage.getItem("@ordenData").then((data) => {
      return JSON.stringify(data)

    }).then((value) => {
      if (!value.hasOwnProperty('nombre', 'telefono', 'direccion', 'logo')) {
        setIsLoading(false)
        Popup.show({
          type: 'Danger',
          title: 'Error!',
          textBody: 'No posee datos para la orden, por favor complete dichos datos',
          buttonText: 'Completar Ahora!',
          callback: () => {
            Popup.hide()
            navigation.navigate('DatosOrdenDoctorScreens' as never)
          }
        })
      }
      if (!value.hasOwnProperty("firma")) {
        setIsLoading(false)
        Popup.show({
          type: 'Danger',
          title: 'Error!',
          textBody: 'Necesita un firma digital, para crear una orden',
          buttonText: 'Cree Ahora!',
          callback: () => {
            Popup.hide()
            navigation.navigate('FirmaDigitalScreens' as never)
          }
        })
      }
      setIsLoading(false)
    }).catch((ex) => {
      Popup.show({
        type: 'Danger',
        title: 'Error!',
        textBody: 'No se puede generar la orden, verifique sus datos',
        buttonText: 'Completar Ahora!',
        callback: () => {
          Popup.hide()
          navigation.navigate('CuentaScreens' as never)
        }
      })
      setIsLoading(false)
    })
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      validarDatosDoctor()
      console.log(JSON.stringify(userData))
    });
    return unsubscribe;
  }, [navigation])

  return (
    <Root>



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
        <LinearGradient
          colors={['#7FDFF0', '#fff', '#fff', '#91E4F2']}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1 }}
        >
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
        </LinearGradient>
      </Layout>
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