import React, { useEffect, useState } from 'react'
import { TouchableOpacity, Image, StyleSheet, Modal, SafeAreaView, View, Platform, NativeModules, ToastAndroid } from 'react-native'
import { Layout, Text } from '@ui-kitten/components'
import { ScrollView } from 'react-native-gesture-handler'
import { NetworkCheckScreens } from '../../components/NetworkCheckScreens'
import { homeStyle } from '../../themes/homeTheme'
import { useNavigation, useRoute } from '@react-navigation/native'
import { MyIcon } from '../../components/ui/MyIcon'
import { doctoresApi } from '../../api/doctoresApi'
import ImageViewer from 'react-native-image-zoom-viewer'
import { Button, ListItem } from 'react-native-elements'
import RNFetchBlob from "rn-fetch-blob";
import RNFS from 'react-native-fs'
import mime from 'mime'
import Share from 'react-native-share'
import Toast from 'react-native-toast-message'
import { isString, find, isEmpty } from 'lodash'
import Pdf from 'react-native-pdf';
import Spinner from 'react-native-loading-spinner-overlay'


export const VerEstudioScreens = () => {
    const { RNShareFile } = NativeModules;
    const route = useRoute();
    const navigation = useNavigation();
    const [isLoading, setisLoading] = useState(false);
    const [archivosEstudio, setArchivosEstudio] = useState([]);
    const [downloadFileProgress, setDownloadFileProgress] = useState(false)
    const [pdfUrlSelected,setPdfUrlSelected] = useState("")
    const [ pdf, setPdf ] = useState(null);
    const [optionsModalEstudioPreview, setOptionsModalEstudioPreview] = useState({
        show: false,
        index: 0
    })

    const getAllArchivoEstudio = async () => {
        try {
            const { detalleOrdenId, ordenId }: any = route.params
            const resp = await doctoresApi.get(`/paciente/ordenes/${ordenId}/detalle/${detalleOrdenId}/archivos`)
            const archivos = resp.data.data

            setArchivosEstudio(archivos)
            setisLoading(true)
        } catch (error) {
            ToastAndroid.showWithGravityAndOffset(
                'No se pudo obtener el estudio',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
              );
        }

    }

    const showModalEstudioPreview = function(index: any){
        setOptionsModalEstudioPreview({
            ...optionsModalEstudioPreview,
            show:true,
            index:index
        })
    }

    const closeModalEstudioPreview = function(){
        setOptionsModalEstudioPreview({
            ...optionsModalEstudioPreview,
            show:false,
        }) 
    }

    const contextMenuFooterPreviewEstudio = { 
        saveToLocal: 'Compartir',
        cancel: 'Cancelar'
    }

    const renderFooterPreviewEstudio = ({cancel,saveToLocal}: any) => {
        return (
            <Layout style={styles.bottomContainer}>
                <NetworkCheckScreens/>
                <ListItem onPress={saveToLocal} bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>Compartir</ListItem.Title>
                    </ListItem.Content>
                    <MyIcon  name="share-outline"/>
                </ListItem>
                <ListItem onPress={cancel}>
                    <ListItem.Content>
                        <ListItem.Title>Cancelar</ListItem.Title>
                    </ListItem.Content>
                    <MyIcon  name="close-outline"/>
                </ListItem>
            </Layout>
        )
    }

    const shareImageEstudio = function(file: any){
        if(isString(file)){
            file = find(archivosEstudio,{url:file})
        }
        let filePath = ''
        setDownloadFileProgress(true)
        RNFetchBlob.config({
            fileCache: true
        }).fetch("GET", file.url.replace("raw=1","dl=1"))
        .then(resp => {
            filePath = resp.path()
            return resp.readFile("base64");
        })
        .then((base64Data)=>{
            setDownloadFileProgress(false)
            RNFS.unlink(filePath)
            let mimeType = mime.getType(file.extension)
            
            base64Data = `data:${mimeType};base64,` + base64Data;
            Share.open({ 
                message:"Buenas, aqui le comparto el resultado del estudio:\n",
                url: base64Data,
                subject:"Estudio Realizado",
                title:'Estudio Realizado',

            }).then((result)=>{
                ToastAndroid.showWithGravityAndOffset(
                    'El estudio se compartio correctamente!!!',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50,
                  );
            })
            .catch((e)=>{

            })
        });
    }

    const getFooterImagePreview = function(){
        let image = archivosEstudio[optionsModalEstudioPreview.index]
        return(
            <ListItem onPress={()=>shareImageEstudio(image)} bottomDivider>
                <ListItem.Content style={{ backgroundColor: '#f23'}}>
                    <ListItem.Title>Compartir</ListItem.Title>
                </ListItem.Content>
                <MyIcon  name="share-outline"/>
            </ListItem>
        )
    }


    useEffect(() => {
        getAllArchivoEstudio();
    }, [])
    


    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: '#fff'
        }}>
            <ScrollView>
                {/*Inicio del Panel de la lista de archivo de los estudios */}
                <NetworkCheckScreens />
                <Layout style={homeStyle.headerContainer}>
                    <Layout style={{
                        margin: 10
                    }}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                        >
                            <MyIcon name="arrow-back-outline"
                            />
                        </TouchableOpacity>
                    </Layout>
                    <Layout style={{ ...homeStyle.headerTextContainer, margin: 10 }}>
                        <Text style={homeStyle.headerText}>Imagen del Estudio</Text>
                    </Layout>
                </Layout>
                <Layout style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignContent: 'center',
                    marginHorizontal: 60


                }}>
                    {
                        archivosEstudio.map(({ url, extension }, item) => {
                            if(extension === "pdf"){
                                return (
                                    <Layout style={styles.container}>
                                        <TouchableOpacity onPress={() => setPdfUrlSelected(url)}>
                                           <Pdf source={{ uri: url}} style={styles.pdf}/> 
                                        </TouchableOpacity>
                                        <Button onPress={() => shareImageEstudio(url)} title="Compartir" icon={<MyIcon name='share-outline'/>} iconRight/>
                                    </Layout>
    
                                )
                            }else{
                                return(
                                    <TouchableOpacity onPress={() => { showModalEstudioPreview(item) }} key={item} style={ styles.imageContainer}>
                                        <Image source={{ uri: url }} style={styles.imagen} />
                                    </TouchableOpacity>
                                )
                            }
                           
                        })
                    }
                </Layout>
                <Modal visible={!isEmpty(pdfUrlSelected)} onRequestClose={() => setPdfUrlSelected("")}>
                    <Pdf style={styles.pdfViewComplete} source={{uri:pdfUrlSelected}}/>
                </Modal>

                <Modal onRequestClose={() => closeModalEstudioPreview()} visible={optionsModalEstudioPreview.show} transparent={true} style={{ flex: 1}}>
                    <ImageViewer footerContainerStyle={{ with: '100%' }} renderFooter={getFooterImagePreview} onSave={shareImageEstudio}
                        menus={renderFooterPreviewEstudio} menuContext={contextMenuFooterPreviewEstudio} onCancel={() => closeModalEstudioPreview()}
                        enableSwipeDown={true} index={optionsModalEstudioPreview.index} imageUrls={archivosEstudio} />
                </Modal>
                <Spinner
                    visible={downloadFileProgress}
                    textContent={'Preparando para compartir...'}
                    textStyle={styles.spinnerTextStyle}
                    animation='fade'
                />


                {/*Fin del Panel de la lista de archivo de los estudios */}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        borderColor: '#f23',
        borderWidth: 2,
        margin: 5,
        shadowOffset: {
            width: 0,
            height: 9,
          },
          shadowOpacity: 0.50,
          shadowRadius: 12.35,
      
          elevation: 10,
    },

    imagen: {
        flex: 1,
        width: 250,
        height: 300,
        resizeMode: 'stretch',
        marginTop: 20
    },

    bottomContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },

    bottonShare: {
        flex: 1,
        borderColor: '#f23',
        borderWidth: 1,
        justifyContent: 'space-between',
    },
    container: {
        width:'100%',
        height:'100%'
      },

    pdf:{
        width:null,
        height: 400,
    },
    pdfViewComplete:{
        width:'100%',
        height:'100%'
    },

    spinnerTextStyle: {
        color: 'black',
        fontSize: 20

    },

 

})


