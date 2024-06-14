import React, { createRef, useEffect, useState } from 'react'
import { StyleSheet, Image, Modal } from 'react-native'
import { Layout, Text, Button, Card } from '@ui-kitten/components'
import { NetworkCheckScreens } from '../../components/NetworkCheckScreens'
import { CheckVersionAppScreens } from '../../components/CheckVersionAppScreens'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { MyIcon } from '../../components/ui/MyIcon'
import { useNavigation } from '@react-navigation/native'
import Loader from 'react-native-modal-loader'
import { Popup, Root } from 'popup-ui'
import { isEmpty, has } from 'lodash'
import AsyncStorage from '@react-native-async-storage/async-storage'
import RNFS from 'react-native-fs'
import mime from 'mime'
import SignatureCapture from 'react-native-signature-capture'

export const FirmaDigitalScreens = () => {
  const componenteFirma = createRef()
  const navigation = useNavigation()
  const [isLoadingData, setIsLoadingData] = useState(false)
  const [dataOrden, setDataOrden] = useState({})
  const [firmaData, setFirmaData] = useState("")
  const [isSignature, setIsSignature] = useState(false)

  useEffect(() => {
    //load
  }, [])

  const loadDataOrden = () => {
    AsyncStorage.getItem("@ordenData").then((value) => {
      return JSON.parse(value)
    }).then((value) => {
      setDataOrden({ ...value })
      loadFirmaSeleccionada({ ...value })
    }).catch((e) => {
      setIsLoadingData(!isLoadingData)
    })
  }

  const loadFirmaSeleccionada = (data: any) => {
    if (has(data, "firma")) {
      RNFS.readFile(data.firma, "base64").then((content: any) => {
        let archivoFirma = data.firma
        let extension = mime.getExtension(mime.getType(archivoFirma))
        setFirmaData(`data:${extension};base64,${content}`)
        console.log("Se cargo la firma")
        setIsLoadingData(!isLoadingData)
      }).catch((e) => {

      })
    } else {
      setIsLoadingData(!isLoadingData)
    }
  }

  const onSubmitCreateSignature = () => {
    setIsSignature(!isSignature)
  }

  const onSaveEventFirma = (result: any) => {
    let archivo = result.pathName
    let extension = mime.getExtension(mime.getType(archivo))
    setDataOrden({ ...dataOrden, firma: `${RNFS.DocumentDirectoryPath}/firma.${extension}` })
    AsyncStorage.setItem("@ordenData", JSON.stringify({ ...dataOrden, firma: `${RNFS.DocumentDirectoryPath}/firma.${extension}` })).then(() => {
      RNFS.writeFile(`${RNFS.DocumentDirectoryPath}/firma.${extension}`, result.encoded, 'base64').then(() => {
        setFirmaData(`data:${extension};base64,${result.encoded}`)
        setIsSignature(!isSignature)
        Popup.show({
          type: 'Success',
          title: 'Exito!',
          textBody: 'La firma fue grabada correctamente',
          // buttonText: 'Completar Ahora!',
          callback: () => {
            Popup.hide()
            //navigation.navigate('CuentaScreens' as never)
          }
        })
        console.log('Grabado correctamente')
      }).catch(() => {
        setIsSignature(!isSignature)
        Popup.show({
          type: 'Danger',
          title: 'Error!',
          textBody: 'No se ha podido guardar la firma',
          // buttonText: 'Completar Ahora!',
          callback: () => {
            Popup.hide()
            //navigation.navigate('CuentaScreens' as never)
          }
        })
        console.log('Error al grabar')
      })
    }).catch(() => {
      setIsSignature(!isSignature)
      Popup.show({
        type: 'Danger',
        title: 'Error!',
        textBody: 'La firma no fue guardada',
        // buttonText: 'Completar Ahora!',
        callback: () => {
          Popup.hide()
          //navigation.navigate('CuentaScreens' as never)
        }
      })
      console.log('Error al grabar')
    })
  }
  const handleResetFirma = () => {
    componenteFirma.current.resetImage()
  }
  const handleSaveFirma = () => {
    componenteFirma.current.saveImage()
  }


  return (
    <Root>
      <Layout style={styles.container}>
        <NetworkCheckScreens />
        <CheckVersionAppScreens />

        <Layout style={styles.headerContainer}>
          <Layout style={{ margin: 10 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('CuentaScreens' as never)}
            >
              <MyIcon name="arrow-back-outline"
              />
            </TouchableOpacity>
          </Layout>
          <Layout style={styles.headerTextContainer}>
            <Text style={styles.headerText}>Firma Digital</Text>
          </Layout>
        </Layout>
        <Loader loading={isLoadingData} size="large" title="Cargando..." color="#ff66be" />
        {
          !isEmpty(firmaData) ?
            <Layout style={ styles.containerFirma }>
              <Image source={{ uri: firmaData }} style={ styles.imageFirma } />
              <Button onPress={onSubmitCreateSignature} accessoryRight={<MyIcon name='edit-2-outline' />}>Actualiza tu Firma</Button>
            </Layout>
            :
            <Card>
              <Button onPress={onSubmitCreateSignature} accessoryRight={<MyIcon name='edit-outline' />}>Crea tu firma</Button>
            </Card>
        }
        <Layout>
          <Modal
            visible={isSignature}
            onRequestClose={() => {
              componenteFirma.current.resetImage()
              setIsSignature(false)
            }}
          >
            <SignatureCapture
              style={{
                flex: 1,
                borderColor: '#000033',
                borderWidth: 1
              }}
              ref={componenteFirma}
              onSaveEvent={onSaveEventFirma}
              saveImageFileInExtStorage={false}
              showNativeButtons={false}
              showTitleLabel={false}
              backgroundColor="white"
              strokeColor="black"
              minStrokeWidth={10}
              maxStrokeWidth={10}
              viewMode={"portrait"} />
            <Button onPress={handleSaveFirma} accessoryRight={<MyIcon name='save-outline' />}>Guardar</Button>
          </Modal>
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

  containerFirma: {
    flex: 1,
    marginHorizontal: 30,
    marginBottom: 10,
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.50,
    shadowRadius: 12.35,

    elevation: 10,
  },

  imageFirma: {
    flex: 1,
    resizeMode: 'cover',
    width: null,
    height: 450,
    borderWidth: 2,
    borderColor: '#ccc',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.50,
    shadowRadius: 12.35,

    elevation: 5,
  }
})

