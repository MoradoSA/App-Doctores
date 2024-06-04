import {  Image, StyleSheet } from 'react-native'
import React from 'react'
import { Layout } from '@ui-kitten/components';
import { styles } from '../themes/logoTheme';



export const WhiteLogo = () => {
  return (
    <Layout style={ styles.container }>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.imagen}
      />

    </Layout>
  )
}

