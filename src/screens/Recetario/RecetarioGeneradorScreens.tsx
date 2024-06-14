import React,{useEffect,useState,useContext} from 'react'
import {View,Text,Dimensions,Image,StyleSheet} from 'react-native'
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Loader from 'react-native-modal-loader'
import Pdf from 'react-native-pdf'
import AsyncStorage from '@react-native-async-storage/async-storage'
import RNFS from 'react-native-fs'
import {isEmpty} from 'lodash'
import {useRoute} from '@react-navigation/native'
import RNFetchBlob from 'rn-fetch-blob'
import Share from 'react-native-share'
import Toast from 'react-native-toast-message'
import {SafeAreaView} from 'react-native-safe-area-context'
import { Button } from '@ui-kitten/components';
import { MyIcon } from '../../components/ui/MyIcon';
import { useAuthStore } from '../../store/auth/useAuthStore';


export const RecetarioGeneradorScreens = () =>{
    
    const [isLoading,setIsLoading] = useState(false)
    const [sourcePDF,setSourcePDF] = useState("")
    const [base64PDF,setBase64PDF] = useState("")
    const { userData } = useAuthStore()

    let dataOrden = '';
    let sourceLogo = '';
    let sourceFirma = '';
    const route = useRoute()
    const renderHTMLToPDF = async ()=>{
        let paciente = route.params?.paciente
        let doctor = userData()
        let listado = route.params?.estudios.map((estudio:any)=>{
            return `<li>${estudio.nombre}</li>`
        })
        let direccionesOrden = await RNFS.readFileAssets("images/direcciones-orden.jpeg","base64")
        let cebeceraInfoOrden = await RNFS.readFileAssets("images/cabecera-info-arco.jpg","base64")
        console.log(direccionesOrden)
        return `<html> \
        <style>\
            *{\
                padding:0;\
                margin:0;\
            }\
        </style>\
        <body> \
        <div style='width:49%;float:left;'>\
            <div style='display:flex;justify-content:center;align-items:center;'>\
                <h1 style='padding-left:10px;'>${dataOrden.nombre}</h1>\
                <img width='120px' src='data:image/jpeg;base64,${sourceLogo}'/>\
            </div>\
            <img src='data:image/jpeg;base64,${sourceLogo}' width='400px' height='400px' style='position:absolute;margin:auto;left:5%;top:25%;opacity:0.2;z-index:-3;'/>\
            <hr style='margin-bottom:10px;margin-top:8px;'/>\
            <h2>Paciente:</h2>\
            <p>Nombre: ${paciente.nombre}</p>\
            <p>Edad: ${paciente.edad}</p>\
            <h2 style='margin-top:20px;'>Listado de estudios: </h2>\
            <ul>\
            ${listado.join('')}
            <ul>\
            <h2 style='margin-top:20px;'>Formato de entrega: </h2>\
            <p>${route.params.formatoEntrega}</p>\
            <h2 style='margin-top:20px;'>Seguro: </h2>\
            <p>${route.params.seguro.seguro} - ${route.params.seguro.ciudad}</p>\
            <h2 style='margin-top:20px;'>Observaciones: </h2>\
            <p>${route.params.observaciones}</p>\
            <div style='position:absolute; bottom:150px;left:310px;'>\
                <img src='data:image/png;base64,${sourceFirma}' style='position:relative;top:80;z-index:-4;' width='120px'/>\
                <h2>Dr. ${doctor.nombre} </h2>\
                <p>Reg: ${doctor.nro_registro}</p>\
            </div>\
            <div style='position:absolute;bottom:30px;text-align:center;width:49%;'>\
                <hr/>\
                <h3>Direccion: ${dataOrden.direccion}</h3>\
                <h3>Tel: ${dataOrden.telefono}</h3>\
            </div>\
        </div>
        <div style='width:50%;float:left;'>\
            <div>\
                <img style='margin-bottom:42.2px;' width='100%' src='data:image/jpeg;base64,${cebeceraInfoOrden}'/>\
                <hr/>\
                <img src='data:images/jpeg;base64,${direccionesOrden}' width='100%' style='margin-top:30px;'/>\
            </div>\ 
        </div>\
        </body>\
        </html>`
    }
    useEffect(()=>{
        getDataOrden()
        console.log(JSON.stringify(userData))
    },[])
    const getDataOrden = async ()=>{
        try{
            let data = JSON.parse(await AsyncStorage.getItem("@ordenData"))
            dataOrden = data
            sourceLogo = await RNFS.readFile(data.logo,"base64")
            sourceFirma = await RNFS.readFile(data.firma,"base64")
            convertToPDFOrden()
        }catch(ex){
            console.log(ex)
        }
    }
    const handleShareOrden = ()=>{
        // setIsLoading(true)
        // RNFS.readFile(sourcePDF,'base64').then((base64Data)=>{
        //     setIsLoading(false)
            let base64Data = `data:application/pdf;base64,` + base64PDF;
            Share.open({ 
                message:"Hola, aqui le comparto su orden:\n",
                url: base64Data,
                title:'Orden de realizacion de estudios',
                saveToFiles:false,
                subject:'Orden de realizacion de estudios',
                type:'application/pdf'
            }).then((result)=>{
                //
            })
            .catch((e)=>{
                console.log(e)
            })
        // })
    }
    const convertToPDFOrden = async ()=>{
            RNHTMLtoPDF.convert({
                base64:true,
                fileName:'orden-digital',
                width:842,
                height:595,
                html:await renderHTMLToPDF()
            }).then((result: any)=>{
                setSourcePDF(result.filePath)
                setBase64PDF(result.base64)
            }).catch((err: any)=>{
                setIsLoading(!isLoading)
            })
    }
    return(
        <SafeAreaView style={{flex:1}}>
            <Pdf style={styles.pdf} onLoadComplete={()=>setTimeout(()=>setIsLoading(false),1000)} source={{uri:sourcePDF}} />
            <Button 
            accessoryRight={<MyIcon  name="share-outline"/>}
            onPress={handleShareOrden} >
                <Text>Compartir</Text>
            </Button>
            <Loader loading={isLoading} size="large" title="Cargando..." color="#ff66be" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    pdf: {
        flex:1,
    }
})
