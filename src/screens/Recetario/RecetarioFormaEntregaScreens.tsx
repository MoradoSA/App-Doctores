import React, { useEffect, useState } from 'react'
import { StyleSheet, Image, TouchableOpacity, useWindowDimensions } from 'react-native'
import { Button, Layout, Text, CheckBox, CheckBoxProps } from '@ui-kitten/components'
import { Popup, Root } from 'popup-ui'
import Loader from "react-native-modal-loader"
import { NetworkCheckScreens } from '../../components/NetworkCheckScreens'
import { CheckVersionAppScreens } from '../../components/CheckVersionAppScreens'
import { useNavigation, useRoute } from '@react-navigation/native'
import { MyIcon } from '../../components/ui/MyIcon'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { includes, isEmpty } from 'lodash'
import { doctoresApi } from '../../api/doctoresApi'
import { ListItem } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'

export const RecetarioFormaEntregaScreens = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const [formatosEntrega, setFormatosEntrega] = useState([])
  const [formatoEntregaSeleccionado, setFormatoEntregaSeleccionada] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const useCheckboxState = (initialCheck = false): CheckBoxProps => {
    const [checked, setChecked] = React.useState(initialCheck);
    return { checked, onChange: setChecked };
  };

  const primaryCheckboxState = useCheckboxState();

  const handleRequestAPI = () => {
    doctoresApi.get('/auth/doctores/formatos-entrega').then((response:any)=>{
        setFormatosEntrega(response.data)
        storeItemDataFormatosEntrega(response.data)
        setIsLoading(!isLoading)
    }).catch((e)=>{
        setIsLoading(!isLoading)
        Popup.show({
          type: 'Danger',
          title: 'Error de conexion',
          textBody: 'No se pudo obtener las forma de entrega',
          //buttonText:'Completar Ahora!',
          callback: () => {
            Popup.hide()
            //navigation.navigate('DatosOrdenDoctorScreens' as never)
          }
        })
    })
}
const storeItemDataFormatosEntrega = async (data:any)=>{
    try{
        await AsyncStorage.setItem("@formatosEntrega",JSON.stringify(data))
    }catch(e){

    }
}
const handleGetAllFormatosDeEntrega = async () => {
    try{
        let formatosEntregaTMP = JSON.parse(await AsyncStorage.getItem("@formatosEntrega"))
        if(isEmpty(formatosEntregaTMP)){
            handleRequestAPI()
        }else{
            setFormatosEntrega(formatosEntregaTMP)
            setIsLoading(!isLoading)
        }
    }catch(e){
        handleRequestAPI()
    }
}

useEffect(()=>{
    handleGetAllFormatosDeEntrega()
},[])

const handleSubmitFormatoEntrega = ()=>{
    if(isEmpty(formatoEntregaSeleccionado)){
      Popup.show({
        type: 'Danger',
        title: 'Error!',
        textBody: 'Debe seleccionar una forma de entrega',
        //buttonText:'Completar Ahora!',
        callback: () => {
          Popup.hide()
          //navigation.navigate('DatosOrdenDoctorScreens' as never)
        }
      })
    }else{
        navigation.navigate("RecetarioSegurosListadoScreens",{...route.params,formatoEntrega:formatoEntregaSeleccionado.tipo})
    }
}

const handleCheckedFormato = (formatoId:any) => {
    return includes(formatoEntregaSeleccionado,formatoId)
}
  return (
    <Root>
      <LinearGradient 
        style={{ flex: 1 }}
        colors={['#7FDFF0', '#fff', '#fff', '#91E4F2']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
      >

     
        <Layout style={ styles.container }>
          <NetworkCheckScreens />
          <CheckVersionAppScreens />
          <Loader loading={isLoading} size="large" title="Cargando..." color="#ff66be" />
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
              <Text style={styles.headerText}>Formas de Entrega</Text>
            </Layout>
          </Layout>
          <Layout style={ styles.containerEntrega }>
            <Image 
            style={styles.imagen }
            source={require('../../assets/images/entrega.png')}/>
            <Text style={ styles.titulo }>Presiona sobre la forma de entrega:</Text>
            {
                formatosEntrega.map((formato,index)=>{
                    return(
                        <ListItem key={index} onPress={() => setFormatoEntregaSeleccionada(formato)} bottomDivider style={{ backgroundColor: 'transparent'}}>
                            <ListItem.Title>{formato.tipo}</ListItem.Title>
                            <CheckBox 
                            style={styles.checkbox}
                            status='primary'
                            {...primaryCheckboxState}
                            checked={ handleCheckedFormato(formato.id) } 
                            onPress={() => setFormatoEntregaSeleccionada(formato)}>
                            </CheckBox>
                        </ListItem>
                    )
                })
            }
             <Button
                onPress={handleSubmitFormatoEntrega}
                accessoryRight={<MyIcon name='arrow-ios-forward-outline' />}
              >
                <Text>Siguiente </Text>
              </Button>
          </Layout>
        </Layout>
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
    marginHorizontal: 40,

  },
  headerText: {
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 900,

  },

  checkbox: {
    margin: 2,
  },

  containerEntrega: {
    backgroundColor: 'transparent',
    height: 590,
    borderRadius: 15,
    alignItems: 'center',
    marginHorizontal: 20,
    
  },

  imagen:{
    //backgroundColor: 'transparent',
    width: 300,
    height: 350,
    marginBottom: -40
  },

  titulo: {
    fontSize: 20,
    color: 'black'
  },

  button: {
    marginBottom: 10,
  },
})
