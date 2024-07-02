import { Button, Input, Layout, Text } from '@ui-kitten/components'
import React, { useState } from 'react'
import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { NetworkCheckScreens } from '../../components/NetworkCheckScreens'
import { CheckVersionAppScreens } from '../../components/CheckVersionAppScreens'
import { MyIcon } from '../../components/ui/MyIcon'
import { isEmpty } from 'lodash'
import { doctoresApi } from '../../api/doctoresApi'
import { Popup, Root } from 'popup-ui'
import LinearGradient from 'react-native-linear-gradient'

export const SugerenciaScreens = () => {
  const [mensaje, setMensaje] = useState("")


  const enviarSugerenciaDoctor = () => {
    if(isEmpty(mensaje)){
      Popup.show({
        type: 'Warning',
        title: 'Error',
        textBody: 'Debe escribir una sugerencia',
        callback: () => {
          Popup.hide()
        }
      })
    }else{

      let formData = new FormData()
      formData.append('mensaje', mensaje)
      doctoresApi.post(`/auth/doctores/sugerencia`, formData).then((response) => {
       Popup.show({
        type: 'Success',
        title: 'Exito!',
        textBody: 'Sugerencia enviada correctamente',
        callback: () => {
          Popup.hide()
        }
      })
      }).catch((error) => {
        Popup.show({
          type: 'Success',
          title: 'Exito!',
          textBody: 'Sugerencia enviada correctamente',
          callback: () => {
            Popup.hide()
          }
        })
      })
    }
  }

  return (
    <Root>
      <LinearGradient
        style={{ flex: 1 }}
        colors={['#7FDFF0', '#fff', '#fff', '#91E4F2']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
      >
        <ScrollView>
          <Layout style={styles.container}>
            <NetworkCheckScreens />
            <CheckVersionAppScreens />
            <Layout style={styles.headerContainer}>
              <Layout style={{ margin: 10, backgroundColor: 'transparent', }}>
                <TouchableOpacity
                >
                  <MyIcon name="message-square-outline"
                  />
                </TouchableOpacity>
              </Layout>
              <Layout style={styles.headerTextContainer}>
                <Text style={styles.headerText}>Sugerencias</Text>
              </Layout>
            </Layout>
            <Layout style={styles.observacionContainer}>
              <Image
                style={styles.imagen}
                source={require('../../assets/images/sugerencias.png')}
              />
              <Text style={styles.titulo}>Escriba una Sugerencia :</Text>
              <Input
                style={styles.input}
                onChangeText={(text) => setMensaje(text)}
                value={mensaje}
                multiline
                numberOfLines={9}
                editable
              />
              <Button
                style={styles.button}
                onPress={enviarSugerenciaDoctor}
                accessoryRight={<MyIcon name='arrow-ios-forward-outline' />}
              >
                <Text>Enviar</Text>
              </Button>
            </Layout>
          </Layout>
        </ScrollView>
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
    marginBottom: 15

  },



  headerTextContainer: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    marginHorizontal: 50,
    marginBottom: 5

  },

  headerText: {
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 900,

  },

  observacionContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    marginHorizontal: 20

  },

  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },

  imagen: {
    width: 350,
    height: 300
  },

  input: {
    borderColor: 'black',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15
  },

  button: {
    width: 250,

  }


})

