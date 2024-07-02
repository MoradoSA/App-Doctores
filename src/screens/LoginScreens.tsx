import { useState } from 'react'
import { Alert, Image, StyleSheet, ToastAndroid, View, useWindowDimensions } from "react-native"
import { Button, Input, Layout, Text } from '@ui-kitten/components'
import { ScrollView } from 'react-native-gesture-handler'
import { loginStyle } from '../themes/loginTheme'
import { WhiteLogo } from '../components/logoLogin'
import { StackScreenProps } from "@react-navigation/stack"
import { RootStackParams } from "../routes/StackNavigation"
import { MyIcon } from "../components/ui/MyIcon"
import { useAuthStore } from '../store/auth/useAuthStore'
import { NetworkCheckScreens } from '../components/NetworkCheckScreens'
import Toast from 'react-native-toast-message'
import { CheckVersionAppScreens } from '../components/CheckVersionAppScreens'
import { Popup, Root } from 'popup-ui'
import LinearGradient from 'react-native-linear-gradient'





interface Props extends StackScreenProps<RootStackParams, 'LoginScreens'> { }

export const LoginScreens = () => {

  const { login, userData } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  const { height } = useWindowDimensions();
  const [form, setForm] = useState({
    cedula: '', password: ''
  })

  /*TODO:Mensajes de las acciones de la aplicacion */
  const camposVacios = () => {
    Popup.show({
      type: 'Danger',
      title: 'Error!',
      textBody: 'Debe llenar todos los campos',
      //buttonText:'Completar Ahora!',
      callback: () => {
        Popup.hide()
        //navigation.navigate('DatosOrdenDoctorScreens' as never)
      }
    })
  }

  const datosIncorrectos = () => {
    Popup.show({
      type: 'Danger',
      title: 'Error de datos',
      textBody: 'La cedula o el registro son incorrectos',
      //buttonText:'Completar Ahora!',
      callback: () => {
        Popup.hide()
        //navigation.navigate('DatosOrdenDoctorScreens' as never)
      }
    })
  }

  const ingresoCorrecto = () => {
    Popup.show({
      type: 'Success',
      title: 'Bienvenido',
      textBody: 'Estamos peparando la app para usted',
      //buttonText:'Completar Ahora!',
      callback: () => {
        Popup.hide()
        //navigation.navigate('DatosOrdenDoctorScreens' as never)
      }
    })
  }
  /*----------------------------------------------- */
  const onLogin = async () => {
    if (form.cedula.length === 0 || form.password.length === 0) {

      camposVacios()

    } else {
      // setIsLoading(true)

      const wasSuccessfull = await login( form.cedula, form.password )
      if (wasSuccessfull) {
        ingresoCorrecto()
        //setIsLoading(false)
      } else {
        datosIncorrectos();

      }

    }

  }

  return (
    <Root>
      <LinearGradient
        colors={['#7FDFF0', '#fff', '#fff', '#91E4F2']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={{ flex: 1 }}
      >
        <CheckVersionAppScreens />
        <NetworkCheckScreens />
        <ScrollView>
          <Layout style={{
            paddingTop: height * 0.13,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
            backgroundColor: 'transparent'

          }}>
            <WhiteLogo />
            <Text category="h1">Arco Doctores</Text>
          </Layout>
          <Layout style={ loginStyle.contenido}>
            <Layout>
              <Input style={loginStyle.campos}
                keyboardType="number-pad"
                autoCapitalize="none"
                selectionColor='white'
                onChangeText={cedula => setForm({ ...form, cedula: cedula })}
                value={form.cedula}
                placeholder="Ingrese su Cedula"
                underlineColorAndroid='white'
                autoCorrect={false}
                accessoryLeft={<MyIcon name="credit-card-outline" />}
                onSubmitEditing={onLogin}
              />
            </Layout>
            <Layout>
              <Input style={loginStyle.campos}
                keyboardType="number-pad"
                autoCapitalize="none"
                selectionColor='white'
                onChangeText={password => setForm({ ...form, password: password })}
                value={form.password}
                secureTextEntry
                placeholder="Ingrese su nro de Registro"
                accessoryLeft={<MyIcon name="lock-outline" />}
                onSubmitEditing={onLogin}
              />
            </Layout>

            <Layout style={loginStyle.bottonContainer}>
              <Button style={loginStyle.botton}
                disabled={isLoading}
                onPress={onLogin}
              >Ingresar</Button>
            </Layout>
          </Layout>
        </ScrollView>
      </LinearGradient>
    </Root>
  )
}

