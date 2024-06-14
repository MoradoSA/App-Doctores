import React, { useCallback, useEffect, useState } from 'react'
import { Image, Linking, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components'
import VersionCheck from 'react-native-version-check';
import { useFocusEffect } from '@react-navigation/native';

export const CheckVersionAppScreens = () => {

    const [showModal, setShowModal] = useState(false)

    const handleUpdateApp = () =>{
        try {
          VersionCheck.getAppStoreUrl().then((url) =>{
            Linking.openURL(url)
          })
        } catch (error) {
          console.log(error)
        }
    }

    useEffect(() => {
        VersionCheck.needUpdate().then((res) => {
          if(res.isNeeded){
            setShowModal(true)
          }
        }).catch((error) =>{
          console.log('NO existe ninguna actualizacion')
        })
    }, [])

    useFocusEffect(
      useCallback(() =>{
        VersionCheck.needUpdate().then((resp) =>{
          if(resp.isNeeded){
            setShowModal(true)
          }
        }).catch((error) =>{
          console.log('NO hay actualizaciones pendientes')
        })
      },[])
    )
    

  return (
    <Modal
    onRequestClose={ () => setShowModal(!showModal)}
    visible={showModal}
    animationType='slide'
    >
      <Layout style={ styles.contenido }>
        <Image
        style={ styles.image}
        source={require('../assets/images/update1.png')}/>
        <Text style={ styles.text }>Esta app tiene una actualizacion nueva</Text>
        <Button style={styles.button} onPress={handleUpdateApp}>
          <Text style={ styles.buttonText }>Actualizar</Text>
        </Button>
      </Layout>
    </Modal>
  )
}

const styles = StyleSheet.create({
  contenido: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    top: -30,
  },

  image:{
    width: 320,
    height: 350,
  },

  text:{
    fontSize: 20,
    marginTop: -20,
    marginBottom: 10
  },

  button:{
    width: 150,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10

  },

  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 700
  }

})

