import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, RefreshControl, StyleSheet, ToastAndroid } from 'react-native'
import { Input, Layout, Text } from '@ui-kitten/components'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { homeStyle } from '../themes/homeTheme'
import { SearchBar, Icon } from '@rneui/themed';
import { doctoresApi } from '../api/doctoresApi'
import { isEmpty } from 'lodash'
import { useNavigation } from '@react-navigation/native'
import { ListItem } from 'react-native-elements'
import { MyIcon } from '../components/ui/MyIcon'
import { NetworkCheckScreens } from '../components/NetworkCheckScreens'
import { CheckVersionAppScreens } from '../components/CheckVersionAppScreens'
import { Popup, Root } from 'popup-ui'



export const HomeScreens = () => {

  const [searchCedula, setSearchCedula] = useState('')
  const [isSearch, setIsSearch] = useState(false)
  const [ordenesPaciente, setOrdenesPaciente] = useState([])
  const [currentEndpoint, setCurrentEndpoint] = useState(`${doctoresApi}/auth/doctores/pacientes/all?page=1`)
  const [ordenesFiltradas, setOrdenesFiltradas] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [dataPaginador, setDataPaginador] = useState({
    first: '',
    last: '',
    prev: '',
    next: ''
  })

  /*TODO: Mensajes de la acciones de la aplicacion */
  const pacientesNoFound = () => {
    Popup.show({
      type: 'Warning',
      title: 'Error de conexion !',
      textBody: 'Revise su conexión a internet',
      callback: () => {
        Popup.hide()

      }
    })
  }

  /*---------------------------------------------- */

  const getAllOrdenesPacientes = async () => {
    try {

      const resp = await doctoresApi.get('auth/doctores/pacientes/all?page=1')
      const ordenes = resp.data.data
      if (isEmpty(ordenes)) {
        setOrdenesPaciente([])
        setIsLoading(true)
        pacientesNoFound()
      } else {
        setOrdenesPaciente([...ordenesPaciente, ...ordenes] as never)
        setDataPaginador(resp.data.links)
        setIsLoading(false)

      }
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  const getAllOrdenesFromPaciente = function () {
    doctoresApi.get(`auth/doctores/pacientes/${searchCedula}`).then((response) => {
      setOrdenesFiltradas(response.data.data)
      setIsLoading(false)
    }).catch((e) => {
      setIsLoading(false)
      console.log('No se encuentra concidencias' + e)
    })
  }

  const refreshListadoOrdenes = () => {
    setIsLoading(true)
    setOrdenesPaciente([])
    getAllOrdenesPacientes()
  }

  const refreshFooterList = () => {

    setIsLoading(true)
    setCurrentEndpoint(dataPaginador.next && dataPaginador.next)

    if (currentEndpoint == dataPaginador.next) {
      if (!isEmpty(dataPaginador.next)) {
        getAllOrdenesPacientes()
      } else {

        setIsLoading(false)
      }
    } else if (isEmpty(dataPaginador.next)) {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isEmpty(searchCedula)) {
      !isSearch ? getAllOrdenesPacientes() : setIsSearch(false)
    } else {
      getAllOrdenesFromPaciente()
    }
  }, [searchCedula])

  const handleOnChangeTextSearchBar = (text: any) => {
    setSearchCedula(text)
    setIsSearch(true)
    setIsLoading(false)
  }

  const handleClearSearch = () => {
    setIsSearch(false)
  }
  return (
    <>
      <Root>
        <Layout style={homeStyle.Panel}>
          <CheckVersionAppScreens />
          <NetworkCheckScreens /> 
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={refreshListadoOrdenes}
                progressViewOffset={20}
                colors={['#33CAFF', '#22CAFF']}
              />
            }>
            {/*TODO: Inicio de la estructura del header*/}
            <Layout style={homeStyle.headerContainer}>
              <Layout>
               <Image  source={require('../assets/images/logo.png')} style={homeStyle.headerImage} />
              </Layout>
              <Layout style={homeStyle.headerTextContainer}>
                <Text style={homeStyle.headerText}>Tus Pacientes</Text>
              </Layout>
            </Layout>
            {/*TODO: Fin de la estructura del header*/}

            {/*TODO: Inicio del panel contenedor del buscador y listado de Pacientes */}
            <Layout style={homeStyle.containerListado}>
              <Layout  style={ style.containerSeach }>
                <Input 
                  style={ style.seachBar }
                  placeholder="Ingrese los datos del paciente"
                  accessoryRight={<MyIcon name='search-outline' />}
                  onChangeText={handleOnChangeTextSearchBar}
                  value={searchCedula}
                  keyboardType="default"
                  onTouchCancel={() => handleClearSearch()}
                />
              </Layout>
              
              <Layout style={homeStyle.listado}>
                {
                  !isSearch ? (
                    <FlatList
                      data={ordenesPaciente}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({ item }) => <ItemOrdenList orden={item} />}
                      onEndReachedThreshold={0.5}
                      onEndReached={refreshFooterList}
                      ListFooterComponent={<LoadingFooterList loading={isLoading} />}

                    />
                  ) : (
                    <FlatList
                      data={ordenesFiltradas}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({ item }) => <ItemOrdenList orden={item} />}
                      ListFooterComponent={<LoadingFooterList loading={isLoading} />}
                    />
                  )
                }
              </Layout>
            </Layout>
            {/*TODO: Fin del panel contenedor del buscador y listado de Pacientes */}
          </ScrollView>
        </Layout>
      </Root>
    </>
  )
}

function LoadingFooterList(props: any) {
  const { loading } = props
  return (
    <>
      {
        loading ? (<ActivityIndicator size="large" color="blue" />) : (<Text style={homeStyle.footerText}>No hay mas ordenes</Text>)
      }
    </>
  )
}

function ItemOrdenList(props: any) {
  const navigator = useNavigation()
  const { orden } = props
  return (
    <Layout>
      <ListItem key={orden.id} onPress={() => navigator.navigate('DetalleEstudioScreens', { ordenId: orden.id as never })} bottomDivider>
        <Image source={require('../assets/images/logo.png')} style={ style.image }/>
        <ListItem.Content>
          <ListItem.Title>{orden.fecha}</ListItem.Title>
          <ListItem.Subtitle>{orden.sucursal}</ListItem.Subtitle>
          <ListItem.Subtitle>{orden.paciente}</ListItem.Subtitle>
          <ListItem.Subtitle>{orden.cedula}</ListItem.Subtitle>
        </ListItem.Content>
        <MyIcon name="arrow-ios-forward-outline" />
      </ListItem>
    </Layout>

  )
}

const style =  StyleSheet.create({
  containerSeach: {
   backgroundColor: 'white',
   borderColor: '#ccc',
   borderWidth: 2,
   borderRadius: 10,
    
  },

  seachBar: {
    width: '100%',
    borderColor: 'transparent'
    
  },

  image: {
    width: 50,
    height: 50,
  }
})
