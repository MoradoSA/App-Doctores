import React, { useState } from 'react'
import { Button, Input, Layout, Text, styled } from '@ui-kitten/components'
import { Popup, Root } from 'popup-ui'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { NetworkCheckScreens } from '../../components/NetworkCheckScreens'
import { CheckVersionAppScreens } from '../../components/CheckVersionAppScreens'
import { MyIcon } from '../../components/ui/MyIcon'
import { useNavigation, useRoute } from '@react-navigation/native'
import { isEmpty } from 'lodash'
import { ScrollView } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'

export const RecetarioObservacionesScreens = () => {
    const route = useRoute()
    const navigation = useNavigation()
    const [observaciones, setObservaciones] = useState("")

    const handleSubmitObservaciones = () => {
        if (isEmpty(observaciones)) {
            Popup.show({
                type: 'Danger',
                title: 'Error!',
                textBody: 'Debe agregar una observacion a la orden',
                //buttonText:'Completar Ahora!',
                callback: () => {
                    Popup.hide()
                    //navigation.navigate('DatosOrdenDoctorScreens' as never)
                }
            })
        } else {
            navigation.navigate("RecetarioGeneradorScreens", { ...route.params, observaciones: observaciones })
        }
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
                        <NetworkCheckScreens />
                        <CheckVersionAppScreens />
                        <Layout style={styles.headerContainer}>
                            <Layout style={{ margin: 10, backgroundColor: 'transparent', }}>
                                <TouchableOpacity
                                    onPress={() => navigation.goBack()}
                                >
                                    <MyIcon name="arrow-back-outline"
                                    />
                                </TouchableOpacity>
                            </Layout>
                            <Layout style={styles.headerTextContainer}>
                                <Text style={styles.headerText}>Observación</Text>
                            </Layout>
                        </Layout>
                        <Layout style={styles.observacionContainer}>
                            <Image
                                style={styles.imagen}
                                source={require('../../assets/images/notas.png')}
                            />
                            <Text style={styles.titulo}>Agregue una observacion :</Text>
                            <Input
                                style={styles.input}
                                placeholder='Agregue una Observacion a la orden'
                                numberOfLines={6}
                                onChangeText={(text) => setObservaciones(text)}
                                value={observaciones}
                            />
                            <Button
                                style={styles.button}
                                onPress={handleSubmitObservaciones}
                                accessoryRight={<MyIcon name='arrow-ios-forward-outline' />}
                            >
                                <Text>Siguiente</Text>
                            </Button>
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
        backgroundColor: 'transparent',
    },

    headerContainer: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        marginHorizontal: 30,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        marginBottom: 15

    },

    headerTextContainer: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
        marginHorizontal: 50,

    },
    headerText: {
        justifyContent: 'center',
        fontSize: 20,
        fontWeight: 900,
    },

    observacionContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        marginHorizontal: 20

    },

    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },

    imagen: {
        width: 330,
        height: 280
    },

    input: {
        borderColor: 'black',
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 15
    },

    button: {
        width: 250,

    }
})

