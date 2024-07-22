import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, useWindowDimensions } from 'react-native'
import { Layout, Modal, Text } from '@ui-kitten/components'
import NetInfo from "@react-native-community/netinfo";


export const NetworkCheckScreens = () => {

    const { width,height } = useWindowDimensions();
    const [isNetworkConnected, setIsNetworkConnected] = useState(true)
    
    useEffect(()=>{
        NetInfo.addEventListener(state => {
            if(state.isConnected === false){
                setIsNetworkConnected(false)
            }else if(state.isConnected === true){
                setIsNetworkConnected(true)
            }
        })
    },[])
      
  return (
    <Modal 
    visible={ !isNetworkConnected }
    animationType="fade"
    >
        <Layout style= {{
        flex:1,
        width: width,
        height: height,
        backgroundColor: '#fff',
    }}>
        <Layout style= {style.container}>
            <Image
            style={{
                width: 400,
                height: 300,
                resizeMode: 'contain',     
                marginTop: -20,       
            }}

            source={require('../assets/images/NetworkError.png')}
            />
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: -40}}>Por Favor, conecetese a internet ......</Text>
        </Layout>

    </Layout>
    </Modal>
    
  ) 
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        shadowOffset: {
            width: 0,
            height: 9,
          },
          shadowOpacity: 0.50,
          shadowRadius: 9,
      
          elevation: 5,
    }
})

