import React from 'react'
import { Image } from 'react-native'
import { Layout, Text } from '@ui-kitten/components'
import { ScrollView } from 'react-native-gesture-handler'
import { NetworkCheckScreens } from '../../components/NetworkCheckScreens'
import { homeStyle } from '../../themes/homeTheme'
import { CheckVersionAppScreens } from '../../components/CheckVersionAppScreens'

export const VerOrdenScreens = () => {
  return (
    <Layout>
       <ScrollView>
          <NetworkCheckScreens/>
          <CheckVersionAppScreens/>
          <Layout style={homeStyle.headerContainer}>
            <Layout>
              <Image source={require('../../assets/images/logo.png')} style={homeStyle.headerImage} />
            </Layout>
            <Layout style={homeStyle.headerTextContainer}>
              <Text style={homeStyle.headerText}>Ver Orden</Text>
            </Layout>
          </Layout>
        </ScrollView>
    </Layout>
  )
}
