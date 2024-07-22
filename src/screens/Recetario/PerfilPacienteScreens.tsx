import React, { useEffect, useState } from 'react'
import { Button, Layout, Text } from '@ui-kitten/components'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Image, StyleSheet, useWindowDimensions } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { doctoresApi } from '../../api/doctoresApi'
import { ListItem } from 'react-native-elements'


export const PerfilPacienteScreens = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const [datosPacientes, setDatosPacientes] = useState()
  const [estudiosRealizados, setEstudiosRealizados] = useState()
  const [archivoEstudio, setArchivoEstudio] = useState()

  const ObtenerDatosPacientes = async () => {
    let searchCedula = route.params?.cedula
    await doctoresApi.get(`/auth/doctores/pacientes/info/${searchCedula}`).then((response) => {
      setDatosPacientes(response.data.data)
    }).catch((e) => {
      console.log(e)

    })
  }

  const obtenerEstudioPaciente = async () => {
    let searchCedula = route.params?.cedula
    doctoresApi.get(`auth/doctores/pacientes/${searchCedula}`).then((response) => {
      setEstudiosRealizados(response.data.data)

    }).catch((e) => {
      console.log('No se encuentra concidencias' + e)
    })
  }

  useEffect(() => {
    ObtenerDatosPacientes()
    obtenerEstudioPaciente()
  }, [])

  return (
    <ScrollView
      style={{
        backgroundColor: '#fff'
      }}
    >
      <Layout style={{
        width: useWindowDimensions().width,
        backgroundColor: 'white',
      }}>
        <Layout style={style.containerImage}>
          <Image source={require('../../assets/images/logo.png')} style={style.logo} />
        </Layout>
        <Layout style={style.divisor}>
          <Text style={style.titulo}>Datos del Paciente</Text>
        </Layout>
        <Layout style={style.containerInfo} >
          <Text style={style.text}>Cedula: {datosPacientes?.cedula}</Text>
          <Text style={style.text}>Nombre: {datosPacientes?.name}</Text>
          <Text style={style.text}>Fecha Nac: {datosPacientes?.fecha_nacimiento}</Text>
          <Text style={style.text}>Edad: {datosPacientes?.edad} años</Text>
          <Text style={style.text}>Telefono: {datosPacientes?.celular}</Text>
          <Text style={style.text}>Sexo: {datosPacientes?.sexo}</Text>
        </Layout>
        <Layout style={style.divisor}>
          <Text style={style.titulo}>Historial de Estudios</Text>
        </Layout>
        <Layout style={style.containerEstudios} >
          <FlatList
            data={estudiosRealizados}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <ItemOrdenList orden={item} />}
            horizontal

          />
        </Layout>
        <Layout style={style.divisor}>
          <Text style={style.titulo}>Historial de Consultas</Text>
        </Layout>
        <Layout style={style.containerOrdenes}>
          <FlatList
            data={estudiosRealizados}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <ItemOrdenList orden={item} />}
            horizontal

          />
        </Layout>
        <Layout style={style.containerBotones}>
          <Button 
          onPress={ navigation.navigate("RecetarioListadoEstudiosScreens", { paciente: { ...datosPacientes } })}
          >Recetario</Button>
          <Button>Recordatorio</Button>
        </Layout>
        <Layout style={{
          height: 70,
        }}>

        </Layout>
      </Layout>
    </ScrollView>
  )
}

function ItemOrdenList(props: any) {
  const navigator = useNavigation()
  const { orden } = props
  return (
    <Layout style={{
      borderColor: '#ccc',
      borderWidth: 2,
      marginHorizontal: 4,
      borderRadius: 10

    }}>
      <ListItem key={orden.id} onPress={() => navigator.navigate('DetalleEstudioScreens', { ordenId: orden.id as never })} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{orden.fecha}</ListItem.Title>
          <ListItem.Subtitle>{orden.sucursal}</ListItem.Subtitle>
          <ListItem.Subtitle>{orden.paciente}</ListItem.Subtitle>
          <ListItem.Subtitle>{orden.cedula}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </Layout>

  )
}

const style = StyleSheet.create({

  containerImage: {
    alignItems: 'center',
    marginBottom: 10

  },

  logo: {
    width: 150,
    height: 150,
    marginTop: 10,
    borderWidth: 3,
    borderColor: '#FCCC',
    borderRadius: 100,
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.50,
    shadowRadius: 9,

    elevation: 10,
  },

  containerInfo: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    marginBottom: 10

  },

  text: {
    fontSize: 20,
  },

  divisor: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 7,
    marginBottom: 10,
    borderColor: 'white',
    borderRadius: 10,
    borderWidth: 3,
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.50,
    shadowRadius: 9,
    elevation: 5,

  },

  titulo: {
    fontSize: 25,
    fontWeight: 500

  },

  containerEstudios: {
    marginHorizontal: 7,
    marginBottom: 10,

  },

  containerOrdenes: {
    marginHorizontal: 7,
    marginBottom: 10,

  },

  containerBotones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 45,
    marginBottom: 15
  },




})

