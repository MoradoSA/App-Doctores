import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, RefreshControl } from 'react-native'
import { Layout, Text } from '@ui-kitten/components'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { homeStyle } from '../themes/homeTheme'
import { SearchBar, Icon } from '@rneui/themed';
import { doctoresApi } from '../api/doctoresApi'
import {isEmpty} from 'lodash'
import {useNavigation} from '@react-navigation/native'
import { ListItem } from 'react-native-elements'
import { MyIcon } from '../components/ui/MyIcon'



export const HomeScreens = () => {
  const [searchCedula,setSearchCedula] = useState('')
  const [isSearch,setIsSearch] = useState(false)
  const [ordenesPaciente,setOrdenesPaciente] = useState([])
  const [currentEndpoint,setCurrentEndpoint] = useState(`${doctoresApi}/auth/doctores/pacientes/all?page=1`)
  const [isLoading,setIsLoading] = useState(true)
  const [dataPaginador,setDataPaginador] = useState({
    first:'',
    last:'',
    prev:'',
    next:''
})


  const getAllOrdenesPacientes = async() =>{
    try {
     const resp = await doctoresApi.get('auth/doctores/pacientes/all?page=1')
     const ordenes =  resp.data.data
     setOrdenesPaciente([...ordenesPaciente, ...ordenes])
     setDataPaginador(resp.data.links)
     console.log(ordenes)
     setIsLoading(false)
    

    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  const refreshListadoOrdenes = () => {
    setIsLoading(true)
    setOrdenesPaciente([])
    getAllOrdenesPacientes()
  }

  const refreshFooterList = ()=>{
    setIsLoading(true)
    setCurrentEndpoint(dataPaginador.next && dataPaginador.next)
    if(currentEndpoint == dataPaginador.next){
        if(!isEmpty(dataPaginador.next)){
          getAllOrdenesPacientes()
        }else{
            setIsLoading(false)
        }
    }else if(isEmpty(dataPaginador.next)){
        setIsLoading(false)
    }
}

  useEffect(()=>{
    if(isEmpty(searchCedula)){
        getAllOrdenesPacientes()
    }else{
        //getAllOrdenesFromPaciente(getUserCredentials())
    }
},[searchCedula])
  return (
    <Layout style={homeStyle.Panel}>
      <ScrollView 
      refreshControl={
        <RefreshControl
        refreshing={isLoading}
        onRefresh={refreshListadoOrdenes}
        progressViewOffset={20}
        colors={['#33CAFF', '#22CAFF']}
        />
      }
      >
        {/*TODO: Inicio de la estructura del header*/}
        <Layout style={homeStyle.headerContainer}>
          <Layout>
            <Image source={require('../assets/images/logo.png')} style={homeStyle.headerImage} />
          </Layout>
          <Layout style={homeStyle.headerTextContainer}>
            <Text style={homeStyle.headerText}>Tus Pacientes</Text>
          </Layout>
        </Layout>
        {/*TODO: Fin de la estructura del header*/}

        {/*Inicio del panel contenedor del buscador y listado de Pacientes */}
        <Layout style={ homeStyle.containerListado }>
          <SearchBar
              placeholder='Ingrese el nro de cedula'
              lightTheme={true}
              keyboardType='number-pad'
          />
          <Layout style={ homeStyle.listado}>
             {
              !isSearch ?(
                <FlatList 
                data={ordenesPaciente}
                keyExtractor={(item,index)=>index.toString()}
                renderItem={({item})=><ItemOrdenList orden={item}/>}
                onEndReachedThreshold={0.5}
                onEndReached={refreshFooterList}
                ListFooterComponent={<LoadingFooterList loading={isLoading}/>}
                
                />
              ): (
                <FlatList 
                data={ordenesPaciente}
                keyExtractor={(item,index)=>index.toString()}
                renderItem={({item})=><ItemOrdenList orden={item}/>}
                onEndReachedThreshold={0.5}
                onEndReached={refreshFooterList}
                ListFooterComponent={<LoadingFooterList loading={isLoading}
              
                
                />}
                
                />
              )
             }
          </Layout>
        </Layout>
        {/*Fin del panel contenedor del buscador y listado de Pacientes */}

      </ScrollView>
    </Layout>
  )
}

function LoadingFooterList(props:any){
  const {loading} = props
  return(
      <>
      {
          loading ? (<ActivityIndicator size="large" color="blue"/>) : (<Text style={ homeStyle.footerText }>No hay mas ordenes</Text>)
      }
      </>
  )
}

function ItemOrdenList(props:any){
  const navigator = useNavigation()
  const {orden} = props
  return(
    <Layout>
         <ListItem key={orden.id} onLongPress={()=> navigator.navigate('ver-orden',{ordenId:orden.id})} 
      onPress={()=>navigator.navigate('orden-detalle-estudios',{ordenId:orden.id})} bottomDivider>
          <ListItem.Content>
              <ListItem.Title>{orden.fecha}</ListItem.Title>
              <ListItem.Subtitle>{orden.sucursal}</ListItem.Subtitle>
              <ListItem.Subtitle>{orden.paciente}</ListItem.Subtitle>
              <ListItem.Subtitle>{orden.cedula}</ListItem.Subtitle>
          </ListItem.Content>
          <MyIcon  name="arrow-ios-forward-outline"/>
      </ListItem>
    </Layout>
      
  )
}
