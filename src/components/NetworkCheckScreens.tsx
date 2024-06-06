import React, { useEffect, useState } from 'react'
import { Image, useWindowDimensions } from 'react-native'
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
        <Layout style= {{
            flex: 1,
            margin: 5,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
    
        }}>
            <Image
            style={{
                width: 400,
                height: 300,
                resizeMode: 'contain',     
                marginTop: -20,       
            }}

            source={require('../assets/images/NetworkError.png')}
            />
            <Text style={{ fontSize: 18, fontWeight: 500, marginTop: -40}}>Por Favor, conecetese a internet......</Text>
        </Layout>

    </Layout>
    </Modal>
    
  ) 
}

