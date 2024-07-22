import React, { useEffect, useState } from 'react'
import { BackHandler, Keyboard, PermissionsAndroid, Platform, StyleSheet, ToastAndroid, TouchableOpacity, ScrollView } from 'react-native'
import { Button, Input, Layout, Text } from '@ui-kitten/components'
import { Avatar, Header } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useLinkTo, useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { has, isEmpty } from 'lodash'
import mime from 'mime'
import * as RNFS from 'react-native-fs'
import ImagePicker from 'react-native-image-crop-picker'
import { NetworkCheckScreens } from '../../components/NetworkCheckScreens'
import { CheckVersionAppScreens } from '../../components/CheckVersionAppScreens'
import { MyIcon } from '../../components/ui/MyIcon'
import Loader from 'react-native-modal-loader'
import { Popup, Root } from 'popup-ui'
import { Icon } from '@ui-kitten/components';
import { loginStyle } from '../../themes/loginTheme'
import LinearGradient from 'react-native-linear-gradient'




{/*Funcion apar solicitar el permiso del telefono para la aplicacion */ }

const hasAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    const haspermission = await PermissionsAndroid.check(permission)

    if (haspermission) {
        return true
    }
    const status = await PermissionsAndroid.request(permission)
    return status === 'granted'
}




export const DatosOrdenDoctorScreens = () => {
    const linkTo = useLinkTo()
    const navigation = useNavigation()
    const [isEdit, setIsEdit] = useState(false)
    const [logoClinica, setLogoClinica] = useState("")
    const [dataClinica, setDataClinica] = useState({})
    const [isLoadingData, setIsLoadingData] = useState(true)
    const [dataClinicaSingle, setDataClinicaSingle] = useState({})

    const handleReadDataOrdenFromAsyncStorage = () => {
        AsyncStorage.getItem("@ordenData").then((value) => {
            return JSON.parse(value)
        }).then((data) => {
            if (!isEmpty(data)) {
                if (has(data, "logo")) {
                    handleLoadLogoClinica(data)
                } else {
                    setDataClinica(data)
                    setDataClinicaSingle(data)
                }
            }
            setIsLoadingData(!isLoadingData)
        }).catch((e) => {
            setIsLoadingData(!isLoadingData)
        })
    }

    const handleLoadLogoClinica = (data: any) => {
        RNFS.readFile(data.logo, 'base64').then((content) => {
            setLogoClinica(`data:image/jpeg;base64,${content}`)
            setDataClinica(data)
            setDataClinicaSingle(data)
        }).catch(err => {
            console.log('ERROR: nos e encuentra la imagen');
            console.log(err.message, err.code);
        })
    }

    const handleSaveDataOrden = () => {
        AsyncStorage.setItem("@ordenData", JSON.stringify(dataClinicaSingle)).then(() => {
            setDataClinica(dataClinicaSingle)
        }).catch(() => {
            Popup.show({
                type: 'Danger',
                title: 'Error!',
                textBody: 'No se ha podido guardar los datos',
                callback: () => {
                    Popup.hide()
                   
                }
            })
        })
    }

    useEffect(() => {
        const backAction = () => {
            linkTo('/CuentaScreens')
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, [])


    useEffect(() => {
        if (isLoadingData && isEmpty(dataClinica)) {
            handleReadDataOrdenFromAsyncStorage()
        } else {
            handleSaveDataOrden()
        }
    }, [dataClinicaSingle])


    const handlePickerImageLogo = async () => {
        if (Platform.Version === 'android' && !(await hasAndroidPermission())) {
            return;
        } else {
            ImagePicker.openPicker({
                width: 300,
                height: 300,
                cropping: true,
                cropperCircleOverlay: true,
                mediaType: 'photo',
                compressImageQuality: 0.8,
                includeBase64: true,
                writeTempFile: false
            }).then((image) => {
                setLogoClinica(`data:${image.mime};base64,${image.data}`)
                let imagePath = `${RNFS.DocumentDirectoryPath}/logo.${mime.getExtension(image.mime)}`
                RNFS.writeFile(imagePath, image.data ? image.data : '', 'base64').then((response) => {
                    //console.log('Imagen guardada en la ruta:', imagePath)
                    setDataClinicaSingle({ ...dataClinica, logo: imagePath })
                })

            }).catch((error) => {
                Popup.show({
                    type: 'Danger',
                    title: 'Error!',
                    textBody: 'No se pudo cargar la imagen',
    
                    callback: () => {
                        Popup.hide()
                       
                    }
                })
            })
        }
    }



    const handleCancelOption = () => {
        Popup.show({
            type: 'Danger',
            title: 'Error!',
            textBody: 'No se ha realizado ningun cambio',
            callback: () => {
                Popup.hide()
               
            }
        })
        setDataClinicaSingle(dataClinica)
        Keyboard.dismiss()
        setIsEdit(!isEdit)
    }


    const handleSuccessOption = () => {

        if (has(dataClinicaSingle, "logo") || has(dataClinica, "logo")) {
            Keyboard.dismiss()
            setIsEdit(!isEdit)
            handleSaveDataOrden()
        } else {
            Popup.show({
                type: 'Danger',
                title: 'Error!',
                textBody: 'La orden no tiene logo',

                callback: () => {
                    Popup.hide()
                   
                }
            })
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
                    <Layout style={style.container}>
                        <KeyboardAwareScrollView>
                            {/* <NetworkCheckScreens />
                        <CheckVersionAppScreens /> */}
                            <Layout style={style.headerContainer}>
                                <Layout style={style.headerIcon}>
                                    {
                                        isEdit ? (
                                            <>
                                                <TouchableOpacity onPress={handleCancelOption}>
                                                    <MyIcon name='close-outline' />
                                                </TouchableOpacity>
                                            </>
                                        ) : (
                                            <>
                                                <TouchableOpacity onPress={() => navigation.navigate("CuentaScreens" as never)}>
                                                    <MyIcon name='arrow-back-outline' />
                                                </TouchableOpacity>
                                            </>
                                        )
                                    }

                                </Layout>
                                <Layout style={{ ...style.headerTextContainer, margin: 15 }}>
                                    <Text style={style.headerText}>Datos para la orden</Text>
                                </Layout>
                                <Layout style={style.headerIcon}>
                                    {
                                        isEdit ? (
                                            <>
                                                <TouchableOpacity onPress={handleSuccessOption}>
                                                    <MyIcon name='edit-outline' />
                                                </TouchableOpacity>
                                            </>
                                        ) : (
                                            <>

                                            </>
                                        )
                                    }
                                </Layout>
                                <Loader loading={isLoadingData} size="large" title="Cargando..." color="#ff66be" />
                            </Layout>
                            <Layout style={{ flex: 1, height: 220 }}>
                                {
                                    isEmpty(logoClinica) ?
                                        <Avatar onPress={handlePickerImageLogo}
                                            source={require('../../assets/images/clinica.png')}
                                            containerStyle={{
                                                width: 200,
                                                height: 200,
                                                borderRadius: 100,
                                                justifyContent: 'center',
                                                marginTop: 15,
                                                alignSelf: 'center',
                                                backgroundColor: '#fff',
                                                borderColor: 'white',
                                                shadowOffset: {
                                                    width: 0,
                                                    height: 9,
                                                },
                                                shadowOpacity: 0.50,
                                                shadowRadius: 12.35,
                                                elevation: 10,


                                            }} rounded size="xlarge">
                                        </Avatar> :
                                        <Avatar source={{ uri: logoClinica }} onPress={handlePickerImageLogo} overlayContainerStyle={{ backgroundColor: 'gray' }}
                                            titleStyle={{ color: 'white', fontSize: 26 }}
                                            containerStyle={{
                                                width: 150,
                                                height: 150,
                                                borderRadius: 100,
                                                justifyContent: 'center',
                                                marginTop: 15,
                                                alignSelf: 'center',
                                                backgroundColor: '#fff',
                                                borderColor: 'white',
                                                shadowOffset: {
                                                    width: 0,
                                                    height: 9,
                                                },
                                                shadowOpacity: 0.50,
                                                shadowRadius: 12.35,

                                                elevation: 10,
                                            }}
                                            rounded size="xlarge" title="TU LOGO">
                                        </Avatar>
                                }

                            </Layout>
                            <Layout style={{ flex: 1, marginTop: 10 }}>
                                <Layout>
                                    <Input style={{ ...loginStyle.campos }}
                                        onFocus={() => !isEdit && setIsEdit(true)}
                                        keyboardType="default"
                                        autoCapitalize="none"
                                        selectionColor='white'
                                        onChangeText={(text) => setDataClinicaSingle({ ...dataClinicaSingle, nombre: text })}
                                        value={dataClinicaSingle.nombre}
                                        placeholder="Ingrese el nombre de la Clinica"
                                        underlineColorAndroid='white'
                                        autoCorrect={false}
                                        accessoryLeft={<MyIcon name="home-outline" />}
                                        cursorColor={'black'}
                                    />
                                </Layout>

                                <Layout>
                                    <Input style={loginStyle.campos}
                                        onFocus={() => !isEdit && setIsEdit(true)}
                                        keyboardType="default"
                                        autoCapitalize="none"
                                        selectionColor='white'
                                        onChangeText={(text) => setDataClinicaSingle({ ...dataClinicaSingle, direccion: text })}
                                        value={dataClinicaSingle.direccion}
                                        placeholder="Ingrese la direccion de la clinica"
                                        accessoryLeft={<MyIcon name="navigation-2-outline" />}
                                        cursorColor={'black'}
                                    />
                                </Layout>

                                <Layout>
                                    <Input style={loginStyle.campos}
                                        onFocus={() => !isEdit && setIsEdit(true)}
                                        keyboardType="default"
                                        autoCapitalize="none"
                                        selectionColor='white'
                                        onChangeText={(text) => setDataClinicaSingle({ ...dataClinicaSingle, telefono: text })}
                                        value={dataClinicaSingle.telefono}
                                        placeholder="Ingrese el numero de telefono"
                                        accessoryLeft={<MyIcon name="phone-call-outline" />}
                                        cursorColor={'black'}

                                    />
                                </Layout>
                            </Layout>
                        </KeyboardAwareScrollView>
                    </Layout>

                </ScrollView>
                </LinearGradient>
        </Root>

    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',

    },

    headerContainer: {
        flexDirection: 'row',
        marginHorizontal: 30,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        marginBottom: 15

    },

    headerIcon: {
        margin: 10
    },

    headerTextContainer: {
        justifyContent: 'center',
        marginHorizontal: 30,

    },

    headerText: {
        justifyContent: 'center',
        fontSize: 20,
        fontWeight: 900,

    },

    avatar: {}
})

