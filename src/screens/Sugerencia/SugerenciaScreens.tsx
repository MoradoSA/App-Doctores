import { Button, Input, Layout, Text } from '@ui-kitten/components'
import React, { useState } from 'react'
import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { NetworkCheckScreens } from '../../components/NetworkCheckScreens'
import { CheckVersionAppScreens } from '../../components/CheckVersionAppScreens'
import { MyIcon } from '../../components/ui/MyIcon'
import { isEmpty } from 'lodash'
import { doctoresApi } from '../../api/doctoresApi'
import { Popup, Root } from 'popup-ui'

export const SugerenciaScreens = () => {
  const [form, setForm] = useState({
    mensaje: ''
  })


  const enviarSugerenciaDoctor = () => {
    let formData = new FormData()
    formData.append('mensaje',form.mensaje)
    if (isEmpty(form.mensaje)) {
      Popup.show({
        type: 'Danger',
        title: 'Error!',
        textBody: 'Por favor, carge la sugerencia',
        //buttonText:'Completar Ahora!',
        callback: () => {
          Popup.hide()
          //navigation.navigate('DatosOrdenDoctorScreens' as never)
        }
      })
    } else {
      doctoresApi.post(`/auth/doctores/sugerencia,${formData}`).then((result) => {
        Popup.show({
          type: 'Success',
          title: 'Exito!',
          textBody: 'Sugerencia enviada con exito',
          //buttonText:'Completar Ahora!',
          callback: () => {
            Popup.hide()
            //navigation.navigate('DatosOrdenDoctorScreens' as never)
          }
        })
      }).catch((error) => {
        console.log(error)
        Popup.show({
          type: 'Danger',
          title: 'Error!',
          textBody: 'Error al enviar la sugerencia',
          //buttonText:'Completar Ahora!',
          callback: () => {
            Popup.hide()
            //navigation.navigate('DatosOrdenDoctorScreens' as never)
          }
        })
      })
    }
  }
  return (
    <Root>
      <ScrollView>
        <Layout style={styles.container}>
          <NetworkCheckScreens />
          <CheckVersionAppScreens />
          <Layout style={styles.headerContainer}>
            <Layout style={{ margin: 10 }}>
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
              onChangeText={ mensaje => setForm({ ...form, mensaje: mensaje})} 
              value={ form.mensaje }
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
    </Root>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },

  headerContainer: {
    flexDirection: 'row',
    marginHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginBottom: 15

  },



  headerTextContainer: {
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

