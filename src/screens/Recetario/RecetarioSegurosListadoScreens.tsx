import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native'
import { Button, Layout, Text,CheckBox } from '@ui-kitten/components'
import {ListItem } from 'react-native-elements'
import { Popup, Root } from 'popup-ui'
import Loader from "react-native-modal-loader"
import { NetworkCheckScreens } from '../../components/NetworkCheckScreens'
import { CheckVersionAppScreens } from '../../components/CheckVersionAppScreens'
import { useNavigation, useRoute } from '@react-navigation/native'
import { MyIcon } from '../../components/ui/MyIcon'
import { includes, isEmpty } from 'lodash'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { doctoresApi } from '../../api/doctoresApi'

export const RecetarioSegurosListadoScreens = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const [segurosAsociados, setSegurosAsociados] = useState([])
    const [seguroSeleccionado, setSeguroSeleccionado] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const handleGetListOfSegurosAsociated = () => {
       
        doctoresApi.get('/auth/doctores/seguros').then(async (result: any) => {
            setSegurosAsociados([...result.data.data,{id:2938928383,seguro:'Particular',ciudad:''}])
            await AsyncStorage.setItem("@seguros",JSON.stringify(result.data.data))
            setIsLoading(!isLoading)
        })
        .catch(async (e) => {
            let seguros = JSON.parse(await AsyncStorage.getItem("@seguros"))
            setSegurosAsociados(seguros)
            setIsLoading(!isLoading)
            Popup.show({
                type:'Danger',
                title:'Error!',
                textBody:'No se pudo obtener los seguros',
                //buttonText:'Completar Ahora!',
                callback:()=>{
                    Popup.hide()
                    //navigation.navigate('DatosOrdenDoctorScreens' as never)
                }
            })
        })
    }
    const handleSelectSeguro = (item:any)=>{
        if(includes(seguroSeleccionado,item.id)){
            setSeguroSeleccionado({})
        }else{
            setSeguroSeleccionado(item)
        }
    }
    const handleCheckSeguroSelected = (seguroID:any)=>{
        return includes(seguroSeleccionado,seguroID)
    }
    const handleNextProcess = () => {
        if(!isEmpty(seguroSeleccionado)){
            navigation.navigate("RecetarioObservacionesScreens",{...route.params,seguro:seguroSeleccionado})
        }else{
            Popup.show({
                type:'Danger',
                title:'Error!',
                textBody:'Debes seleccionar un seguro',
                //buttonText:'Completar Ahora!',
                callback:()=>{
                    Popup.hide()
                    //navigation.navigate('DatosOrdenDoctorScreens' as never)
                }
            })
        }
    }
    const renderItemSeguro = ({item}:any)=>{
        return (
            <ListItem key={item.id} onPress={() => handleSelectSeguro(item)} bottomDivider>
                <ListItem.Content>
                    <ListItem.Title>{item.seguro} - {item.ciudad}</ListItem.Title>
                </ListItem.Content>
                <CheckBox onPress={() => handleSelectSeguro(item)} checked={handleCheckSeguroSelected(item.id)}>

                </CheckBox>
            </ListItem>
        )
    }

    useEffect(()=>{
        handleGetListOfSegurosAsociated()
    },[])

    return (
        <Root>
            <Layout style={styles.container}>
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
                        <Text style={styles.headerText}>Lista de Seguros</Text>
                    </Layout>
                </Layout>
                <Layout style={styles.containerSeguro }>
                    <Image
                     style={ styles.image }
                     source={require('../../assets/images/seguros.png')} />
                    <Text style={ styles.titulo } >Seguros Medicos :</Text>
                </Layout>
                <Layout style={ styles.lista }>
                <FlatList 
                    data={segurosAsociados}
                    renderItem={renderItemSeguro}
                    keyExtractor={item => item.id}
                />
                <Button 
                onPress={handleNextProcess}
                accessoryRight={<MyIcon name='arrow-ios-forward-outline' />}
                >
                    <Text>Siguiente</Text>
                </Button>
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

    containerSeguro: {
        flex: 1,
        marginHorizontal: 20,
        alignItems: 'center'
    },

    image: {
        width: 400,
        height: 300,
        marginBottom: 10
    },

    titulo: {
        fontSize: 20,
        color: 'black',
    },

    lista: {
        flex: 1,
    }

})
