import React from 'react'
import { Button, Layout, Text } from '@ui-kitten/components'
import LinearGradient from 'react-native-linear-gradient'
import { Image, StyleSheet } from 'react-native'
import { MyIcon } from '../../components/ui/MyIcon'
import { useAuthStore } from '../../store/auth/useAuthStore'
import { useNavigation } from '@react-navigation/native'


export const InicioBienvenidoScreens = () => {

    const { usuario } = useAuthStore()
    const navigation = useNavigation()
    return (
        <LinearGradient
            colors={['#7FDFF0', '#fff', '#fff', '#91E4F2']}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 1 }}
        >
            <Layout style={styles.container}>
                <Layout style={styles.containerInfoOrden}>
                    <Image source={require('../../assets/images/radiologos.png')} style={styles.image} />
                    <Text style={{fontSize: 25 ,textAlign: 'center', fontWeight: 'bold' }}>Hola Dr/a: {usuario?.nombre}</Text>
                    <Text style={{ textAlign: 'center', alignSelf: 'center' }}>Te damos la bienvenida a tu app de doctores,</Text>
                    <Text style={{ textAlign: 'center', alignSelf: 'center', marginBottom: 10 }}>en el cual podrás ver todos los estudios de tus pacientes, 
                        realizar tus propios recetarios, enviarnos tus sugerencias para que podamos mejorar para vos.</Text>
                    <Button
                        accessoryRight={<MyIcon name='arrow-ios-forward-outline' />}
                    onPress={() => navigation.navigate('HomeScreens' as never)}
                    >
                        Comenencemos
                    </Button>
                </Layout>

            </Layout>


        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        top: -30,
        marginHorizontal: 20
    },

    containerInfoOrden: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center'
    },

    image: {
        width: 380,
        height: 350,
    },
})