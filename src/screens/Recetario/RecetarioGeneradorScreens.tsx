
import { Button, Layout, Text } from '@ui-kitten/components';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Alert, } from 'react-native';
import { WebView } from 'react-native-webview';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs'
import LinearGradient from 'react-native-linear-gradient';

export const RecetarioGeneradorScreens = () => {
  const { usuario } = useAuthStore()
  const route = useRoute()
  const webViewRef = useRef(null);
  const [isImage, setIsImage] = useState("")
  let dataOrden = ''
  let logoClinica = ''
  let firmaDoctor = ''

  const captureImage = async () => {
    try {
      const uri = await captureWebView(webViewRef);
      Alert.alert('Captura Exitosa', `Imagen capturada: ${uri}`);
      // Aquí puedes usar la imagen capturada, por ejemplo, mostrarla en un Image componente
    } catch (error) {
      Alert.alert('Error al Capturar', 'Hubo un problema al intentar capturar la imagen.');
      console.error('Error capturando imagen:', error);
    }
  };

  const captureWebView = async (webViewRef: any) => {
    if (!webViewRef.current) {
      throw new Error('WebView no ha sido montado todavía');
    }

    const uri = await webViewRef.current.captureScreen({
      format: 'jpg',
      quality: 1,
    });

    return uri;
  };

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


    const image =
      ` <html>
        <body>
          <header class="container">
            <div class="nombreClinica">
              <h1 class="titulo">${nombreClinica}</h1>
            </div>
            <div class="logoClinica">
            <img class="logo" src='data:image/jpeg;base64,${logoClinica}' alt='logo'/>
            </div>
          </header>
          <br>
          <img src='data:image/jpeg;base64,${logoClinica}' width='900px' height='850px' style='position:absolute;margin:auto;left:5%;top:25%;opacity:0.2;z-index:-3;'/>
          <div class="containerRecetario">
            <h2 class="datosPaciente">Datos de la Orden:</h2>
          </div>
            <main class="cards">
              <section class="card">
                <h1 class="nombre">Nombre del Paciente</h1>
                 <hr/>
                 <br/>
                <h3 class="datos">${pacienteNombre}</h3>
              </section>

              <section class="card">
                <h1 class="nombre">Nro de Cedula</h1>
                  <hr/>
                  <br/>
                <h3 class="datos">${edadPaciente}</h3>
              </section>
            </main>
            <br/> <br/> <br/>
            <main class="cards">
              <section class="card">
                <h1 class="nombre">Listado de estudios:</h1>
                 <hr/>
                 <br/>
                <h3 class="datos">
                  <ul>
                    ${listaEstudios.join('')}
                  <ul>
                </h3>
              </section>

              <section class="card">
                <h1 class="nombre">Formato de entrega:</h1>
                  <hr/>
                  <br/>
                <h3 class="datos">${formaEntrega}</h3>
              </section>
            </main>

            <br/> <br/>
            <main class="cards">
              <section class="card">
                <h1 class="nombre">Seguro: </h1>
                 <hr/>
                 <br/>
                <h3 class="datos">${nombreSeguro}  ${ciudadCeguro}</h3>
              </section>

              <section class="card">
                <h1 class="nombre">Observaciones:</h1>
                  <hr/>
                  <br/>
                <h3 class="datos">${observacion}</h3>
              </section>
            </main>

            <main class="cards">
              <section class="card">
                <h1 class="nombre">Doctor: ${doctor} </h1>
                 <hr/>
                 <br/>
                <h3 class="datos">${nroRegistro}</h3>
                <img src='data:image/png;base64,${firmaDoctor}' style='position:relative;top:-50;z-index:-4;' width='120px'/>
              </section>

              <section class="card">
                <h1 class="nombre">Direccion: ${direccion}</h1>
                  <hr/>
                  <br/>
                <h3 class="datos">Telefono: ${telefono}</h3>
              </section>
            </main>
            <footer class="footer">

            </footer>
        </body>
      </html> 
      <style>
      *{
         margin:0;
          padding:0;
          box-sizing: border-box;
          background: linear-gradient(rgb(179, 229, 252 , 0.01), rgb(253, 254, 254, 0.09), rgb(179, 229, 252 ,0.05),  rgb(253, 254, 254,0.03))
          
        }
          .container{
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-gap: 30px;
            grid-auto-rows: minmax(200px, auto);
            margin-top: 32px;
            width: 100%;
            height: 230px;
            justify-content: center;
            align-items: center;
            place-items: center;
            border-bottom: 1px solid black
          }
          
          .nombreClinica {
            margin-left: 22%;
          }

          .titulo{
            font-size: 60px;
            color: "#4D5656"
  
          }

          .logo{
            width: 200px;
            height: 200px;
            border-radius: 50%;
          
          }
          
          .containerRecetario{
            display: flex;
            justify-content: center;
            align-items: center;
            place-items: center;
            margin: 10px;
          }

          .datosPaciente{
            font-size: 60px;
            color: "#4D5656";
            margin-bottom: 30px;
          }
            

         main.cards {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-gap: 30px;
            grid-auto-rows: minmax(100px, auto);
            align-items: center;
            text-align: center;
            padding: 1rem 1.5rem;
            max-height: 588px;
            margin-left: 28px;
          }

         .nombre{
           font-size: 40px;

         }

         .datos{
            top: 50px;
            font-size: 30px;
         }

         ul {
          list-style:none
         }

         .containerDatosDoctor{
           display: flex;
           justify-content: center;
           align-items: center;
           place-items: center;
           margin-top: -80px;
           margin-botton: -100px
          }

          .firma{ 
            position:relative;
            z-index:-4;
          }

          .nombreDoctor{
             left: -90px
          }

          .footer{
            position: absolute;
            border: 1px solid black
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
    } catch (ex) {
      console.log(ex)
    }
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
            style={styles.recetarioViewer }
            source={{ html: isImage }}
          />
        </Layout>
        <Button>
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
    borderColor: '#E0E0E0',
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
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    padding: 10,
    borderRadius: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },


});







