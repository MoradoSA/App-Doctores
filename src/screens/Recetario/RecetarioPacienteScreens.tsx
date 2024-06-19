import React, { useState } from 'react'
import { Image, StyleSheet } from 'react-native'
import { Layout, Text, Input, Button } from '@ui-kitten/components'
import { NetworkCheckScreens } from '../../components/NetworkCheckScreens'
import { CheckVersionAppScreens } from '../../components/CheckVersionAppScreens'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { MyIcon } from '../../components/ui/MyIcon'
import { useNavigation } from '@react-navigation/native'
import { isEmpty } from 'lodash'
import { Popup, Root } from 'popup-ui'
import LinearGradient from 'react-native-linear-gradient'

export const RecetarioPacienteScreens = () => {
  const navigation = useNavigation()
  const [dataPaciente, setDataPaciente] = useState({
    nombre: '',
    edad: ''
  })


  const handleSubmitPacienteData = () => {
    if (isEmpty(dataPaciente.nombre) || isEmpty(dataPaciente.edad)) {
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
    } else {
      navigation.navigate("RecetarioListadoEstudiosScreens", { paciente: { ...dataPaciente } })
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
        <NetworkCheckScreens />
        <ScrollView>
          <Layout style={{ backgroundColor: 'transparent'}}>
            <Layout style={styles.headerContainer}>
              <Layout style={{ margin: 10,  backgroundColor: 'transparent', }}>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                >
                  <MyIcon name="arrow-back-outline"
                  />
                </TouchableOpacity>
              </Layout>
              <Layout style={styles.headerTextContainer}>
                <Text style={styles.headerText}>Datos del Paciente</Text>
              </Layout>
            </Layout>
            <Layout style={styles.continerRegistro}>
              <Layout style={styles.containerImage}>
                <Image source={require('../../assets/images/registro.png')} style={styles.image} />
              </Layout>
              <Layout style={styles.containerInputs}>
                <Text style={styles.label}>Nombre del Paciente:</Text>
                <Input
                  onChangeText={(nombre) => setDataPaciente({ ...dataPaciente, nombre: nombre })}
                  value={dataPaciente.nombre}
                  style={styles.input}
                  keyboardType="default"
                  autoCapitalize="none"
                  selectionColor='white'
                  placeholder="Ingrese el nombre del Paciente"
                  accessoryLeft={<MyIcon name="person-outline" />}
                />

              </Layout>
              <Layout style={styles.containerInputs}>
                <Text style={styles.label} >Nro de Cedula:</Text>
                <Input
                  onChangeText={(edad) => setDataPaciente({ ...dataPaciente, edad: edad })}
                  value={dataPaciente.edad}
                  style={styles.input}
                  keyboardType="default"
                  autoCapitalize="none"
                  selectionColor='white'
                  placeholder="Ingrese la cedula"
                  accessoryLeft={<MyIcon name="calendar-outline" />}
                />

              </Layout>
              <Layout style={styles.containerInputs}>
                <Button
                  style= { styles.button }
                  onPress={handleSubmitPacienteData}
                  accessoryRight={<MyIcon name='arrow-ios-forward-outline' />}
                >
                  <Text>Siguiente </Text>
                </Button>
              </Layout>
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
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginBottom: 2

  },

  headerTextContainer: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    marginHorizontal: 40,

  },
  headerText: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 900,

  },

  continerRegistro: {
    backgroundColor: 'transparent',
    justifyContent: 'center'
  },

  containerInputs: {
    marginHorizontal: 20,
    marginBottom: 15,
  },

  

  label: {
    backgroundColor: 'none',
    fontSize: 18,
    margin: 5,
    color: '#616A6B'
  },

  input: {
    backgroundColor: 'white',
    fontSize: 18,
    borderWidth: 2,
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.10,
    shadowRadius: 9,

    elevation: 0.9,
  },

  containerImage: {
    backgroundColor: 'none',
    justifyContent: 'center',
    alignItems: 'center',


  },

  image: {
    width: 350,
    height: 300,

  },

  button: {
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.10,
    shadowRadius: 9,

    elevation: 2,
  },


})
