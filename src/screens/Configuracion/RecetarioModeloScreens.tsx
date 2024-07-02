import React, { useEffect, useRef, useState } from 'react'
import { Layout, Text } from '@ui-kitten/components'
import LinearGradient from 'react-native-linear-gradient'
import { Image, StyleSheet } from 'react-native'
import WebView from 'react-native-webview'
import RNFS from 'react-native-fs'

export const RecetarioModeloScreens = () => {
    const webViewRef = useRef(null);
    const [isImage, setIsImage] = useState("")
 

    const renderImageRecetario = async() => {
        let direccionesOrden = await RNFS.readFileAssets("images/direcciones-orden.jpeg","base64")

        const logo = require('../../assets/images/logo.png')
        const image = `
        <html>
            <body>
                <div class="container">
                    <div class="hearder">
                        <div class="one">
                            <h3>Clinica Dental</h3>
                        </div>
                        <div class="two">
                          <img src='data:images/jpeg;base64,${direccionesOrden}' width='100%' style='margin-top:30px;'/>
                        </div>
                        <div class="three">
                            <h3>Fecha: ${new Date().toLocaleDateString()}</h3>
                        </div>
                    </div>
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
         }

         .hearder {
           display: grid;
           grid-template-columns: repeat(3, 1fr);
           grid-gap: 10px;
           grid-auto-rows: minmax(100px, auto);
            
         }




        </style>
       
        `
        setIsImage(image)
    }

    useEffect(() => {
        renderImageRecetario()
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
                        style={styles.recetarioViewer}
                        source={{ html: isImage }}
                    />
                </Layout>
            </Layout>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },

    recetarioContainer: {
        width: 360,
        height: 595,
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

    styleReceraio: {
        flex: 1,
        borderColor: 'black',
        borderWidth: 2
    },

    recetarioViewer: {
        flex: 1,
      },


})
