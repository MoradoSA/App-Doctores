import React from 'react'
import { ActivityIndicator, Image } from 'react-native'
import { Layout, Text } from '@ui-kitten/components'
import { loadingStyle } from '../themes/loadingTheme'
import LinearGradient from 'react-native-linear-gradient'



export const LoadingSreens = () => {
  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={['#7FDFF0', '#fff', '#fff', '#91E4F2']}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
    >    
    <Layout style={ loadingStyle.container}>
      <Text
      style={ loadingStyle.title }  >
        Estamos trabajando para usted</Text>
        <ActivityIndicator
        size={180}
        color='#91E4F2'
        animating/>
        <Text style={ loadingStyle.title }>Por Favor espere....</Text>
        <Image
        source={require('../assets/images/logo.png')}
        style={ loadingStyle.imagen }
        />
    </Layout>
    </LinearGradient>
  )
}

