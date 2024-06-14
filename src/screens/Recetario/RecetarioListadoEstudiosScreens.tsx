import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableHighlight, TouchableOpacity, SectionList } from 'react-native'
import {Card } from 'react-native-elements'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Button, Layout, Text, CheckBox, CheckBoxProps } from '@ui-kitten/components'
import { Popup, Root } from 'popup-ui'
import Loader from "react-native-modal-loader"
import { NetworkCheckScreens } from '../../components/NetworkCheckScreens'
import { CheckVersionAppScreens } from '../../components/CheckVersionAppScreens'
import { MyIcon } from '../../components/ui/MyIcon'
import { filter, isEmpty, pull, size } from 'lodash'
import { doctoresApi } from '../../api/doctoresApi'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const RecetarioListadoEstudiosScreens = () => {
    const route = useRoute()
    const navigation = useNavigation()
    const [isLoading,setIsLoading] = useState(true)
    const [listadoEstudios, setListadoEstudios] = useState([])
    const [estudiosTmp,setEstudiosTmp] = useState([])
    const [estudiosSeleccionados,setEstudiosSeleccionados] = useState([])
    

    const useCheckboxState = (initialCheck = false): CheckBoxProps => {
        const [checked, setChecked] = React.useState(initialCheck);
        return { checked, onChange: setChecked };
      };

      const primaryCheckboxState = useCheckboxState();

    const handleSelectEstudio = (estudio: any)=>{
        if(verifyEstudioSelectedByIndex(estudio)){
            setEstudiosSeleccionados(pull([...estudiosSeleccionados],filter(estudiosSeleccionados,{...estudio})[0]))
        }else{
            setEstudiosSeleccionados([...estudiosSeleccionados,filter(estudiosTmp,{...estudio})[0]])
        }
    }
    const handleWebServiceGETEstudios = ()=>{

        doctoresApi.get('/auth/doctores/estudios').then((response:any)=>{
            return response.data.data
        }).then(async (data:any)=>{
            await AsyncStorage.setItem("@estudios",JSON.stringify(data))
            setListadoEstudios(data)
            setEstudiosTmp(data.map((value:any)=>value.data).flat(2))
            setIsLoading(!isLoading)
        }).catch((err:any)=>{
            console.log(err)
            Popup.show({
                type:'Danger',
                title:'Error!',
                textBody:'Revise su conexion a internet',
                //buttonText:'Completar Ahora!',
                callback:()=>{
                    Popup.hide()
                    //navigation.navigate('DatosOrdenDoctorScreens' as never)
                }
            })
            setIsLoading(!isLoading)
        })
    }
    const handleObtenerEstudios = ()=>{
        AsyncStorage.getItem("@estudios").then((result)=>{
            let listado = JSON.parse(result)
            // console.log(listado.map((value)=>value.data).flat(2))
            if(isEmpty(listado)){
                handleWebServiceGETEstudios()
            }else{
                setEstudiosTmp(listado.map((value:any)=>value.data).flat(2))
                setListadoEstudios(listado)
                setIsLoading(!isLoading)
            }
        }).catch((error)=>{
            handleWebServiceGETEstudios()
        })
    }

    useEffect(()=>{
        handleObtenerEstudios()
    },[])
    const verifyEstudioSelectedByIndex = (estudio:any)=>{
        return size(filter(estudiosSeleccionados,estudio)[0])>0
    }

    const itemEstudio = (estudio:any)=>{
        return(
            <TouchableHighlight activeOpacity={0.6} underlayColor="#616A6B" onPress={()=>handleSelectEstudio(estudio)}>
                <Layout style={ styles.listEsudio }>
                    <Text style={{fontSize:17, marginRight: 10}}>{estudio.nombre}</Text>
                    <CheckBox
                       style={styles.checkbox}
                       status='primary'
                       {...primaryCheckboxState}
                        onPress={()=>handleSelectEstudio(estudio)}
                        checked={verifyEstudioSelectedByIndex(estudio)}
                    >
                    </CheckBox>
                </Layout>
            </TouchableHighlight>
        )
    }
    const handleSubmitEstudiosSeleccionados = ()=>{
        if(!isEmpty(estudiosSeleccionados)){
            navigation.navigate('RecetarioFormaEntregaScreens',{...route.params,estudios:estudiosSeleccionados})
        }else{
            Popup.show({
                type:'Danger',
                title:'Error!',
                textBody:'Debe seleccionar por lo menos un estudio',
                //buttonText:'Completar Ahora!',
                callback:()=>{
                    Popup.hide()
                    //navigation.navigate('DatosOrdenDoctorScreens' as never)
                }
            })
        }
    }
  return (
    <Root>  
        <Layout style={ styles.container }>
            <Loader loading={isLoading} size="large" title="Cargando..." color="#ff66be" />
            <NetworkCheckScreens />
            <CheckVersionAppScreens />
            <Layout style={styles.headerContainer}>
                <Layout style={{ margin: 10 }}>
                    <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    >
                    <MyIcon name="arrow-back-outline"
                    />
                    </TouchableOpacity>
                </Layout>
                <Layout style={styles.headerTextContainer}>
                    <Text style={styles.headerText}>Estudios a Realizar</Text>
                </Layout>
            </Layout>
            <Layout style={ styles.carContainer }>
                <Card containerStyle={ styles.card }>
                    <Card.Title>Seleccione los estudios</Card.Title>
                    <Card.Divider />
                    {
                    isEmpty(listadoEstudios) ? (
                        <>
                            <Text>No hay estudios para seleccionar</Text>
                        </>
                    ) : (
                       
                        <SectionList 
                            style={{height:'75%'}}
                            sections={listadoEstudios}
                            keyExtractor={(item,index)=>item.nombre + index}
                            renderItem={({item})=>itemEstudio(item)}
                            renderSectionHeader={({section:{tipo}})=>(
                                <Layout  style={{padding:10,backgroundColor:'#dedede'}}>
                                    <Text style={{fontSize:20}}>{tipo}</Text>
                                </Layout >
                            )}
                        />
                    )
                }
                <Button
                style={ styles.button }
                onPress={handleSubmitEstudiosSeleccionados}
                accessoryRight={<MyIcon name='arrow-ios-forward-outline' />}>
                    <Text>Siguiente</Text>
                </Button>
                </Card>
            </Layout>
        </Layout>
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
        marginHorizontal: 40,
    
      },
      headerText: {
        justifyContent: 'center',
        fontSize: 20,
        fontWeight: 900,
      },

      listEsudio: {
        flexDirection:'row',
        flexWrap: 'wrap',
        alignItems: 'center', 
        padding:12,
        borderTopWidth:1,
        borderBottomWidth:1,
        borderColor:'#616A6B', 
      },

      checkbox: {
        margin: 2,
      },

      carContainer: {
        flex: 1,
      },

      card: {
        shadowOffset: {
            width: 0,
            height: 9,
          },
          shadowOpacity: 0.50,
          shadowRadius: 9,
      
          elevation: 10,
      },

      button: {
        height: 50
      },


})