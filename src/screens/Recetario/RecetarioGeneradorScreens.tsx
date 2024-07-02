
import { Button, Layout, Text } from '@ui-kitten/components';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Alert, } from 'react-native';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs'
import LinearGradient from 'react-native-linear-gradient';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share'
import WebView from 'react-native-webview';
import * as htmlToImage from 'html-to-image';

export const RecetarioGeneradorScreens = () => {
  const { usuario } = useAuthStore()
  const route = useRoute()
  const webViewRef = useRef<HTMLDivElement>(null);
  const [isImage, setIsImage] = useState("")
  const [sourcePDF, setSourcePDF] = useState("")
  const [base64PDF, setBase64PDF] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  let dataOrden = ''
  let logoClinica = ''
  let firmaDoctor = ''


  const renderImage = async () => {

    let doctor = usuario?.nombre
    let nroRegistro = usuario?.nro_registro
    let nombreClinica = dataOrden?.nombre
    let telefono = dataOrden?.telefono
    let direccion = dataOrden?.direccion
    let pacienteNombre = route.params?.paciente.nombre
    let edadPaciente = route.params?.paciente.edad
    let listaEstudios = route.params?.estudios.map((estudio) => {
      return `<li>${estudio.nombre}</li>`
    })
    let formaEntrega = route.params?.formatoEntrega
    let nombreSeguro = route.params?.seguro.seguro
    let ciudadCeguro = route.params?.seguro.ciudad
    let observacion = route.params?.observaciones


    const image = `
      <html>
        <body>
          <div class="container">
              <div class="header">
                <div class="nombreClinica">
                  <h1 class="titulo">${nombreClinica}</h1>
                </div>
                <div class="circle">
                  <img class="logo" src='data:image/jpeg;base64,${logoClinica}' alt='logo'/>
                </div>
              </div>
               <img src='data:image/jpeg;base64,${logoClinica}' width='900px' height='850px' style='position:absolute;margin:auto;left:5%;top:25%;opacity:0.2;z-index:-3;'/>
              <table class="table">
                  <thead>
                    <tr>
                      <th>Paciente</th>
                      <th>Nro. Cedula</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>${pacienteNombre}</td>
                      <td>${edadPaciente}</td>
                    </tr>
                  </tbody>
              </table>
              <table class="table">
                  <thead>
                    <tr>
                    <th>Estudio a Realizar</th>
                      <th>Forma de Entrga</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                     <td>${listaEstudios.join()}</td>
                      <td>${formaEntrega}</td>
                    </tr>
                  </tbody>
              </table>
              <table class="table">
                  <thead>
                    <tr>
                    <th>Seguro</th>
                      <th>Observación</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                     <td>${nombreSeguro}</td>
                      <td>${observacion}</td>
                    </tr>
                  </tbody>
              </table>
              <table class="table1">
                  <thead>
                    <tr>
                    <th>Dr/a: ${doctor}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                     <td>Nro Registro: ${nroRegistro} <br/>
                       <img src='data:image/png;base64,${firmaDoctor}'  class="firma" style='position:relative;top:-115;z-index:-4;' width='120px'/><br/>
                        <br/>
                         <h3>Direccion: ${direccion}</h3>\
                        <h3>Tel: ${telefono}</h3>\
                     </td>
                    </tr>
                  </tbody>
              </table>
              <footer class="footer">
                <div>
                  <p class="infoSucursal">Sucursal de Ñemby <span>(0985) 677 912</span></p>
                  <p class="infoSucursal">Sucursal de Mariano <span>(0982) 100 609</span></p>
                  <p class="infoSucursal">Sucursal de Azara <span>(0984) 557 644</span></p>
                  <p class="infoSucursal">Sucursal de Itaugua <span>(0981) 636 301</span></p>
                  <p class="infoSucursal">Sucursal de Luque <span>(0984) 557 179</span></p>
                </div>
                <div>
                    <p class="infoSucursal">Sucursal de KM5 <span>(0985) 464 550</span></p>
                  <p class="infoSucursal">Sucursal de San Lorenzo <span>(0984) 560 367</span></p>
                  <p class="infoSucursal">Sucursal de Lambare <span>(0986) 227 216</span></p>
                  <p class="infoSucursal">Sucursal de Laboratorio <span>(0981) 515 652</span></p>
                  <p class="infoSucursal">Sucursal de Carapegua <span>(0984) 389 512</span></p>
                </div>
              </footer>
          </div>
        </body>
      </html>
      <style>
        *{
          margin: 0;
          padding: 0;
          box-sizing: content-box;
        }

        .container {
          width: 100%;
          height: 100%;
          border: solid #5B6DCD 10px;
          //background: linear-gradient(25deg, #91E4F2 #fff );
        }

        .header {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-gap: 30px;
          grid-auto-rows: minmax(100px, auto);
          margin-top: 32px;
        }

        .nombreClinica {
          margin-top: 35px;
          margin-left: 19%;
          border-bottom: solid #ccc 10px;
         
        }

        .titulo{
          font-size: 62px;
          color: black;
          font-weight: 900;
            
  
        }

        .circle {
            width: 210px; 
            height: 210px; 
            border-radius: 50%;
            background-color: #fff; 
            margin-top: -20px;
            margin-left: 22%;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px  rgba(0, 0, 0, 0.25);
  
          }
          

          .logo{
            width: 190px;
            height: 190px;
            border-radius: 50%;
            margin: 10px;          
          }

          .table {
            width: 90%;
            font-family: Arial, Helvetica, sans-serif;
            border-collapse: collapse;
            margin-top: 80px;
            margin-left: 50px;
            justify-content: center;
            align-items: center;
            place-items: center;
            text-align: center;
      
           }

           .table1 {
            width: 90%;
            font-family: Arial, Helvetica, sans-serif;
            border-collapse: collapse;
            margin-top: 80px;
            margin-left: 50px;
            justify-content: center;
            align-items: center;
            place-items: center;
            text-align: center;
           }

           .table1 th {
              font-size: 30px;
           }

           .table1 td {
              font-size: 20px;
           }

           .table td, .table th {
            height: 60px;
            border: 1px solid #ddd;
            padding: 8px;
            list-style:none;
            font-size: 30px;
          }

         .table th {
            padding-top: 12px;
            padding-bottom: 12px;
            text-align: left;
            background-color: #04AA6D;
            color: white;
            text-align: center;
            
          }

          .firma {
            width: 160px;
            height: 90px;
            background: none;
            opacity: 0.5;
          }

          .footer {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-gap: 30px;
            grid-auto-rows: minmax(100px, auto);
            margin-top: 185px;
            justify-content: center;
            align-items: center;
            place-items: center;
            text-align: center;
          }

          .infoSucursal{
            text-align: center;
            font-size: 22px;
            margin: 18px;
           font-weight: bold;
          }


      </style>

      `

    setIsImage(image)

  }

  const getDataOrden = async () => {
    try {
      let data = JSON.parse(await AsyncStorage.getItem("@ordenData"))
      dataOrden = data
      logoClinica = await RNFS.readFile(data.logo, "base64")
      firmaDoctor = await RNFS.readFile(data.firma, "base64")
      renderImage()
      convertToPDFOrden()
    } catch (ex) {
      console.log(ex)
    }
  }

  const handleShareOrden = () => {
    // setIsLoading(true)
    // RNFS.readFile(sourcePDF,'base64').then((base64Data)=>{
    //     setIsLoading(false)
    let base64Data = `data:application/pdf;base64,` + base64PDF;
    Share.open({
      message: "Hola, aqui le comparto su orden:\n",
      url: base64Data,
      title: 'Orden de realizacion de estudios',
      saveToFiles: false,
      subject: 'Orden de realizacion de estudios',
      type: 'application/pdf'
    }).then((result) => {
      //
    })
      .catch((e) => {
        console.log(e)
      })
    // })
  }

  const convertToPDFOrden =  () => {
    RNHTMLtoPDF.convert({
      base64: true,
      fileName: 'orden-digital',
      width: 840,
      height: 792,
      html:  isImage
    }).then((result) => {
      setSourcePDF(result.filePath)
      setBase64PDF(result.base64)
    }).catch((err) => {
     console.log(err)
    })
  }

  useEffect(() => {
    getDataOrden()

  }, [])




  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={['#7FDFF0', '#fff', '#fff', '#91E4F2']}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
    >
      <Layout style={styles.container}>
        <Layout style={styles.recetarioContainer}>
          <WebView
            ref={webViewRef}
            style={styles.recetarioViewer}
            source={{ html: isImage }}
          />
        </Layout>
        <Button style={styles.button}
          onPress={handleShareOrden}>
          <Text>Compartir</Text>
        </Button>
      </Layout>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },


  recetarioContainer: {
    width: 350,
    height: 550,
    top: -40,
    borderWidth: 5,
    borderRadius: 10,
    borderColor: '#F4F6F7',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.50,
    shadowRadius: 9,

    elevation: 10,

  },

  recetarioViewer: {
    flex: 1,
  },

  button: {
    width: 150,
    height: 50,
    bottom: 20,
    alignSelf: 'center',
    padding: 10,
    borderRadius: 10,
  },


  buttonText: {
    color: 'white',
    fontSize: 16,
  },


});







