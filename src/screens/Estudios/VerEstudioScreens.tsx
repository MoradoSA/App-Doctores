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
import { CheckVersionAppScreens } from '../../components/CheckVersionAppScreens'
import { Popup, Root } from 'popup-ui'
import { useAuthStore } from '../../store/auth/useAuthStore'
import LinearGradient from 'react-native-linear-gradient'



  const  extension =  ['jpg','jpeg' ,'png', 'pdf'];



export const VerEstudioScreens = () => {
    const { RNShareFile } = NativeModules;
    const route = useRoute();
    const navigation = useNavigation();
    const [isLoading, setisLoading] = useState(false);
    const [archivosEstudio, setArchivosEstudio] = useState([]);
    const [downloadFileProgress, setDownloadFileProgress] = useState(false)
    const [pdfUrlSelected,setPdfUrlSelected] = useState("")
    const [ pdf, setPdf ] = useState(null);
    const { extenciones } = useAuthStore()
    
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
           Popup.show({
            type: 'Warning',
            title: 'Error',
            textBody: 'Este estudio no tiene ningun archivo cargado',
            buttontext: 'Regresar',
            callback: () => {
                Popup.hide()
                navigation.navigate('DetalleEstudioScreens' as never)
              }
           })
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
            //TODO: Validacion de funcion para compartir la imagen.
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
        <Root>
            <LinearGradient 
                 colors={['#7FDFF0', '#fff', '#fff', '#91E4F2']}
                 start={{ x: 0, y: 1 }}
                 end={{ x: 1, y: 0 }}
                 style={{ flex: 1 }}
            
            >
            <SafeAreaView style={{
            flex: 1,
            backgroundColor: 'transparent'
        }}>
            <ScrollView>
                {/*Inicio del Panel de la lista de archivo de los estudios */}
                <NetworkCheckScreens />
                <CheckVersionAppScreens/>
                <Layout style={ styles.headerContainer }>
                    <Layout style={{
                        margin: 10,
                         backgroundColor: 'transparent'
                    }}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                        >
                            <MyIcon name="arrow-back-outline"
                            />
                        </TouchableOpacity>
                    </Layout>
                    <Layout style={styles.headerTextContainer}>
                        <Text style={styles.headerText}>Imagen del Estudio</Text>
                    </Layout>
                </Layout>
                <Layout style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    justifyContent: 'center',
                    alignContent: 'center',
                    marginHorizontal: 20


                }}>
                    {
                        archivosEstudio.map(({ url, extension }, item) => {
                            if(extension === "txt" || extension === "docx"){
                                return(
                                    
                                        <Layout style={{
                                            flex: 1,
                                            marginHorizontal: 25,
                                            justifyContent: 'center',
                                            alignContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Image 
                                            style={{
                                                width: 380,
                                                height: 350,
                                            }}
                                            source={require('../../assets/images/errorImagen.png')}
                                            />
                                            <Text style={{
                                                fontSize: 21,
                                                textAlign: 'center'
                                            }}>No se puede mostrar un archivo que no sea imagen o pdf</Text>
                                        </Layout>
                                 
                                )
                            }else if(extension === "pdf"){
                                return (
                                    <Layout style={styles.containerPDF}>
                                        <TouchableOpacity onPress={() => setPdfUrlSelected(url)} style={ styles.muestraPDF}>
                                           <Pdf source={{ uri: url}} style={styles.pdf}/> 
                                           <Text style={ styles.textPDF }>Archivo PDF</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => shareImageEstudio(url)} style={ styles.pdfButtonShare }>
                                            <Text style={ styles.pdfButtonShareText }>Compartir</Text>
                                        </TouchableOpacity>
                                    </Layout>
    
                                )
                            }else{
                                return(
                                    <TouchableOpacity onPress={() => { showModalEstudioPreview(item) }} key={item} style={ styles.imageContainer} >
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
        </LinearGradient>
        </Root>
        
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        marginHorizontal:30,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        marginBottom: 15
    },

    headerTextContainer: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
        marginHorizontal: 50,
        
       
    },

    headerText: {
        justifyContent: 'center',
        fontSize: 20,
        fontWeight: 900,
       
    },

    imageContainer: {
        flex: 1,
        width: 360,
        height: 300,
        justifyContent: 'center',
        borderColor: '#fff',
        borderWidth: 5,
        shadowOffset: {
            width: 0,
            height: 9,
          },
          shadowOpacity: 0.90,
          shadowRadius: 13,
      
          elevation: 10,
          marginTop: 10,
          marginBottom: 10
    },

    imagen: {
       width: 350,
       height: 290,
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
    containerPDF: {
        width:'100%',
        height:'100%',
      },

    muestraPDF: {
        width: 350,
        height: 450,
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#33FFF9',
        shadowOffset: {
            width: 0,
            height: 9,
          },
          shadowOpacity: 0.90,
          shadowRadius: 13,
      
        elevation: 10,
        marginBottom: 10

    },

    textPDF:{
        fontSize: 25,
        fontWeight: 600,
        right: '-30%',
        top: '-35%'
    },

    pdf:{
        width:300,
        height: 300,
    },
    pdfViewComplete:{
        width:'100%',
        height:'100%'
    },

    pdfButtonShare: {
        width: '100%',
        height: 50,
        backgroundColor: '#33FFF9',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },

    pdfButtonShareText: {
        fontSize: 20,
        fontWeight: 500,
        color: '#fff'
    },

    spinnerTextStyle: {
        color: 'white',
        fontSize: 25,
        fontWeight: 900

    },

 

})


