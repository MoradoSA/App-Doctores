import { useState } from 'react'
import { Alert, Keyboard, useWindowDimensions } from "react-native"
import { Button, Input, Layout, Text } from '@ui-kitten/components'
import { ScrollView } from 'react-native-gesture-handler'
import { loginStyle } from '../themes/loginTheme'
import { WhiteLogo } from '../components/logoLogin'
import { StackScreenProps } from "@react-navigation/stack"
import { RootStackParams } from "../routes/StackNavigation"
import { MyIcon } from "../components/ui/MyIcon"
import { useAuthStore } from '../store/auth/useAuthStore'




interface Props extends StackScreenProps<RootStackParams, 'LoginScreens'>{}

export const LoginScreens = () => {
  
  const {login } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  const { height } = useWindowDimensions();
  const [form, setForm] = useState({
    cedula: '', password: ''
  })



  const onLogin = async() => {
    if( form.cedula.length === 0 || form.password.length === 0){
      Alert.alert('Error!', 'Todos los campos son obligatorios')
      
    }else{
     // setIsLoading(true)
      
      const wasSuccessfull = await login(form.cedula, form.password)
      if( wasSuccessfull ) {
        Alert.alert('Bienvenido', 'Ingreso exitoso');
        //setIsLoading(false)
      }else{
        Alert.alert('Error', 'Usuario o contraseña incorrectos');

      }

    }
   
}

  return (
    <Layout style={ loginStyle.body }
    
    >
        <ScrollView style={ loginStyle.contenido }>
          <Layout style={{
            paddingTop: height * 0.07,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <WhiteLogo />
              <Text category="h1">Arco Doctores</Text>
            </Layout>

          {/* TODO: Inicio del formulario de login */}
            <Layout>
              <Input style={ loginStyle.campos }
              keyboardType="number-pad"
              autoCapitalize="none"
              selectionColor='white'
              onChangeText={ cedula => setForm({ ...form, cedula: cedula})} 
              value={ form.cedula }
              placeholder="Ingrese su Cedula"
              underlineColorAndroid='white'
              autoCorrect={false}
              accessoryLeft={<MyIcon  name="credit-card-outline"/>}
              onSubmitEditing={ onLogin }
              />
            </Layout>
           
            <Layout>
              <Input style={ loginStyle.campos }
               keyboardType="number-pad"
               autoCapitalize="none"
               selectionColor='white'
               onChangeText={ password => setForm({ ...form, password: password})} 
               value={ form.password }
               secureTextEntry
               placeholder="Ingrese su nro de Registro"
               accessoryLeft={<MyIcon  name="lock-outline"/>}
               onSubmitEditing={ onLogin }
              />
            </Layout>
           
            <Layout style={ loginStyle.campos }>
              <Button 
              //disabled={isLoading}
              onPress={ onLogin }
              >Ingresar</Button>
            </Layout>
        </ScrollView>
    </Layout>
  )
}

 