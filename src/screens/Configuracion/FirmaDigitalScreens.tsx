import React, { createRef, useEffect, useState } from 'react'
import { BackHandler, Image, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native'
import { Button, Card, Layout, Text } from '@ui-kitten/components'
import { MyIcon } from '../../components/ui/MyIcon'
import { useLinkTo, useNavigation } from '@react-navigation/native'
import { Popup, Root } from 'popup-ui'
import Loader from "react-native-modal-loader";
import { create, has, isEmpty } from 'lodash'
import AsyncStorage from '@react-native-async-storage/async-storage'
import RNFS from 'react-native-fs'
import mime from 'mime'
import SignatureCapture from 'react-native-signature-capture';
import LinearGradient from 'react-native-linear-gradient'


export const FirmaDigitalScreens = () => {
  const componenteFirmaDigital = createRef()
  const navigation = useNavigation()
  const linkTo = useLinkTo()
  const [datosOrden, setDatosOrden] = useState({})
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [firmaData, setFirmaData] = useState("")
  const [isCreatedSignature, setIsCreatedSignature] = useState(false)

  useEffect(() => {
    obtenerDatosOrden()
    const backAction = () => {
      linkTo('CuentaScreens')
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [])

  /*TODO: OBTENER LOS DATOS DE LA ORDEN */
  const obtenerDatosOrden = () => {
    AsyncStorage.getItem("@ordenData").then((value: any) => {
      return JSON.parse(value)
    }).then((value: any) => {
      setDatosOrden({ ...value })
      loadFirmaObtenida({ ...value })
    }).catch((error: any) => {
      setIsLoadingData(!isLoadingData)
    })
  }


  /*TODO: OBTENER LA FIRMA DEL DOCTOR */
  const loadFirmaObtenida = (data: any) => {
    if (has(data, "firma")) {
      RNFS.readFile(data.firma, "base64").then((content: any) => {
        let archivoFirma = data.firma
        let extension = mime.getExtension(mime.getType(archivoFirma))
        setFirmaData(`data:${extension};base64,${content}`)
        console.log('La firma ha sido cargada')
        setIsLoadingData(!isLoadingData)
      }).catch((error) => {
        console.log('Error al cargar la firma')
      })
    } else {
      setIsLoadingData(!isLoadingData)
    }
  }

  /*TODO: CREAR LA FIRMA DIGITAL */
  const oncreateDigitalSignature = () => {

    setIsCreatedSignature(!isCreatedSignature)

  }


  /*TODO: GUARDAR LA FIRMA DIGITAL */
  const onSaveDigitalSignature = (result: any) => {
    let archivo = result.pathName
    let extension = mime.getExtension(mime.getType(archivo))
    setDatosOrden({ ...datosOrden, firma: `${RNFS.DocumentDirectoryPath}/firma.${extension}` })
    AsyncStorage.setItem("@ordenData", JSON.stringify({ ...datosOrden, firma: `${RNFS.DocumentDirectoryPath}/firma.${extension}` })).then(() => {
      RNFS.writeFile(`${RNFS.DocumentDirectoryPath}/firma.${extension}`, result.encoded, 'base64').then(() => {
        setFirmaData(`data:${extension};base64,${result.encoded}`)
        setIsCreatedSignature(!isCreatedSignature)
        Popup.show({
          type: 'Success',
          title: 'Exito!',
          textBody: 'La firma se ha creado correctamente',
          callback: () => {
            Popup.hide()
          }
        })
      }).catch((error) => {
        console.log(error)

        setIsCreatedSignature(!isCreatedSignature)
        Popup.show({
          type: 'Danger',
          title: 'Error!',
          textBody: 'No se ha podido crear la firma digital',
          callback: () => {
            Popup.hide()
          }
        })
      })
    }).catch((error: any) => {
      setIsCreatedSignature(!isCreatedSignature)
      Popup.show({
        type: 'Danger',
        title: 'Error!',
        textBody: 'No se ha podido crear la firma',
        callback: () => {
          Popup.hide()
        }
      })
    })
  }

  const resetSignature = () => {
    componenteFirmaDigital.current.resetImage()
  }

  const saveSignature = () => {
    componenteFirmaDigital.current.saveImage()

  }

  return (
    <Root>
      <LinearGradient
        style={{ flex: 1 }}
        colors={['#7FDFF0', '#fff', '#fff', '#91E4F2']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
      >


        <ScrollView>
          <Layout style={styles.container}>
            <Layout style={styles.headerContainer}>
              <Layout style={styles.headerIcon}>
                <TouchableOpacity onPress={() => navigation.navigate("CuentaScreens" as never)}>
                  <MyIcon name='arrow-back-outline' />
                </TouchableOpacity>
              </Layout>
              <Layout style={{ ...styles.headerTextContainer, margin: 15 }}>
                <Text style={styles.headerText}>Crea tu firma Digital</Text>
              </Layout>
            </Layout>
            <Layout style={styles.firmaContainer}>
              <Loader loading={isLoadingData} size="large" title="Cargando..." color="black" />
              {
                !isEmpty(firmaData) ?
                  <>
                    <Layout style={styles.containerImagenFirma}>
                      <Image
                        style={styles.firmaImagen}
                        source={{ uri: firmaData }}

                      />
                    </Layout>

                    <Button
                      onPress={oncreateDigitalSignature}
                      accessoryRight={<MyIcon name='edit-outline' />}
                    >
                      <Text>Actualizar Firma</Text>
                    </Button>
                  </> :
                  <>
                    <Card>
                      <Button
                        onPress={oncreateDigitalSignature}
                        accessoryRight={<MyIcon name='edit-outline' />}>
                        <Text>Crear Firma Digital</Text>
                      </Button>
                    </Card>
                  </>
              }

              <Modal
                visible={isCreatedSignature}
                onResponderEnd={() => {
                  componenteFirmaDigital.current.resetImage()
                  setIsCreatedSignature(false)
                }}>
                <SignatureCapture
                  style={{
                    flex: 1,
                    borderColor: '#f23',
                    borderWidth: 5
                  }}
                  ref={componenteFirmaDigital}
                  onSaveEvent={onSaveDigitalSignature}
                  saveImageFileInExtStorage={false}
                  showNativeButtons={false}
                  showTitleLabel={false}
                  backgroundColor="white"
                  strokeColor="black"
                  minStrokeWidth={10}
                  maxStrokeWidth={10}
                  viewMode={"portrait"} />
                <Button
                  accessoryRight={<MyIcon name='save-outline' />}
                  onPress={saveSignature}
                >
                  <Text>Guardar Firma</Text>
                </Button>
              </Modal>
            </Layout>
          </Layout>
        </ScrollView>
      </LinearGradient>
    </Root>


  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  },

  headerContainer: {
    flexDirection: 'row',
    marginHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginBottom: 15,
    backgroundColor: 'transparent',

  },

  headerIcon: {
    backgroundColor: 'transparent',
    margin: 10
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

  firmaContainer: {
    width: 350,
    height: 600,
    backgroundColor: 'transparent',
    marginHorizontal: 25,

  },

  containerImagenFirma: {
    width: 340,
    height: 450,
    borderWidth: 3,
    borderRadius: 30,
    borderColor: '#ECF0F1',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.50,
    shadowRadius: 9,
    elevation: 5,
    marginBottom: 10
  },

  firmaImagen: {
    flex: 1,
    width: 340,
    height: 440,
    resizeMode: 'contain'
  },

  firma: {
    flex: 1,
    borderColor: '#000033',
    borderWidth: 1
  },



})
