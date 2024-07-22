import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, TouchableOpacity } from 'react-native'
import { Card, Layout, Text } from '@ui-kitten/components'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import {useNavigation, useRoute} from '@react-navigation/native'
import { NetworkCheckScreens } from '../../components/NetworkCheckScreens'
import { homeStyle } from '../../themes/homeTheme'
import { MyIcon } from '../../components/ui/MyIcon'
import { doctoresApi } from '../../api/doctoresApi'
import { Badge, ListItem } from 'react-native-elements'
import { CheckVersionAppScreens } from '../../components/CheckVersionAppScreens'

export const DetalleEstudioScreens = () => {
  const navigator = useNavigation()
  const route = useRoute();
  const [estudioDetalleOrden, setEstudioDetalleOrden] = useState([]);
  const [isLoading,setIsLoading] = useState(true)

  const getAllEstudiosPaciente = async() =>{
    try {
      const {ordenId}:any = route.params
     
      const resp = await doctoresApi.get(`/paciente/ordenes/${ordenId}/detalle`)
      const estudios = resp.data.data
      setIsLoading(false)
      setEstudioDetalleOrden(estudios)
    } catch (error) {
      console.log(error)
      setIsLoading(true)
    }
  }


  useEffect(() => {
   getAllEstudiosPaciente()
  }, [])


  const refreshDetailsOrder = () =>{
    setIsLoading(true)
    setEstudioDetalleOrden([])
    getAllEstudiosPaciente()
  }
  

  return (
    <Layout style={{
      flex: 1,
      backgroundColor: '#fff'
    }}>
       <ScrollView>
          <NetworkCheckScreens/>
          <CheckVersionAppScreens/>
          <Layout style={homeStyle.headerContainer}>
            <Layout style={{
              margin: 10
            }}>
              <TouchableOpacity 
              onPress={() =>navigator.goBack()}
              >
                  <MyIcon  name="arrow-back-outline" 
                  />
              </TouchableOpacity>
            </Layout>
            <Layout style={{...homeStyle.headerTextContainer, margin: 10}}>
              <Text style={homeStyle.headerText}>Estudios Realizados</Text>
            </Layout>
          </Layout>

          {/* Inicio del listado de los estudios realizados por el paciente */}
            <Layout >
                <Card>
                  <Layout>
                  <FlatList
                        refreshing={isLoading}
                        onRefresh={() => refreshDetailsOrder()}
                        data={estudioDetalleOrden}
                        renderItem={({ item }) => <ItemList estudio={item} />}
                        ListFooterComponent={<FooterList isLoading={isLoading} />}
                        keyExtractor={(item) => item.id}
                    />
                  </Layout>
                </Card>
            </Layout>
          {/* Fin del listado de los estudios realizados por el paciente */}
        </ScrollView>
    </Layout>
  )
}

function ItemList(props: any) {
  const { estudio } = props
  const navigator = useNavigation()
  const route = useRoute()
  let routeSelected = estudio.tipo_estudio.includes('Modelo') ? 'ListadoArchivoScreens' : 'VerEstudioScreens'
  return (
      <>
        <ListItem key={estudio.id}  bottomDivider onPress={()=>navigator.navigate(routeSelected,{detalleOrdenId:estudio.id,ordenId:route.params.ordenId})}>
            <ListItem.Content>
                <ListItem.Title>{estudio.estudio}</ListItem.Title>
                <ListItem.Subtitle>{estudio.tipo_estudio}</ListItem.Subtitle>
            </ListItem.Content>
            <Badge value={estudio.archivos} status="primary" />
            <MyIcon name="eye-outline"/>
        </ListItem>
      </>
  )
}

function FooterList(props: any) {
  const { isLoading } = props
  return (
      <Layout style={{ marginTop: 15 }}>
          {
              isLoading
                  ? <ActivityIndicator size="large" color="blue" />
                  : <Text style={{ textAlign: 'center' }}>No hay mas estudios</Text>
          }
      </Layout>
  )
}
