import React from 'react'
import { ActivityIndicator, Image } from 'react-native'
import { Layout, Text } from '@ui-kitten/components'
import { loadingStyle } from '../themes/loadingTheme'


export const LoadingSreens = () => {
  return (
    <Layout style={ loadingStyle.container}>
      <Text
      style={ loadingStyle.title }  >
        Estamos trabajando para usted</Text>
        <ActivityIndicator
        size={180}
        color='#33CAFF'
        animating/>
        <Text style={ loadingStyle.title }>Por Favor espere....</Text>
        <Image
        source={require('../assets/images/logo.png')}
        style={ loadingStyle.imagen }
        />
    </Layout>
  )
}

