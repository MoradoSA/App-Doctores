import React, { useEffect, useState } from 'react'
import { BackHandler, Keyboard, PermissionsAndroid, Platform, StyleSheet, ToastAndroid, TouchableOpacity } from 'react-native'
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
import { Icon } from '@ui-kitten/components';
import { loginStyle } from '../../themes/loginTheme'



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

{/*Forma de boton de acorde a la accio requerida*/ }

const EditButton = (props: any) => {
    const { isEdit, icon, onPress } = props
    return isEdit && (
        <>
            <Icon onPress={onPress} name={icon} type="ionicon" size={25} color="white" />
        </>
    )
}


export const DatosOrdenDoctorScreens = () => {
    const linkTo = useLinkTo()
    const navigation = useNavigation();
    const [isEdit, setIsEdit] = useState(false)
    const [logoClinica, setLogoClinica] = useState({})
    const [dataClinica,setDataClinica] = useState({})
    const [isLoandingData, setIsLoandingData] = useState(false)
    const [dataClinicaSingle, setDataClinicaSingle] = useState({
          nombre: '', direccion: '', telefono: '', logo: ''
    })


    {/*TODO: Funcion para obtener archivo del dispositivo */ }

    const handleReadDataOrdenFromAsyncStorage = () => {
        AsyncStorage.getItem("@ordenData").then((value: any) => {
            return JSON.parse(value)
        }).then((data: any) => {
            if (!isEmpty(data)) {
                if (has(data, "logo")) {
                    handleLoadLogoDoctor(data)
                } else {
                    setDataClinica(data)
                    setDataClinicaSingle(data)
                }
                setIsLoandingData(!isLoandingData)
            }
        }).catch((error) => {
            setIsLoandingData(!isLoandingData)
        })
    }

    const handleLoadLogoDoctor = (data: any) => {
        RNFS.readFile(data.logo, 'base64').then((content) => {
            setLogoClinica(`data:image/jpeg;base64,${content}`)
            setDataClinica(data)
            setDataClinicaSingle(data)
        }).catch((error) => {
            console.log('ERROR: image file write failed!!!');
            console.log(error.message, error.code);
        })
    }

    const handleSaveDataOrden = () => {
        AsyncStorage.setItem("@ordenData", JSON.stringify(dataClinicaSingle)).then(() => {
            setDataClinica(dataClinicaSingle)
            console.log(JSON.stringify(dataClinica))
        }).catch(() => {
            errorGuardado()
        })
    }

    


    useEffect(() => {
        const backActions = () => {
            linkTo('/cuenta/panel')
            return true
        }

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backActions
        )

        return () => backHandler.remove();
    }, [])

    useEffect(() => {
        if (isLoandingData && isEmpty(dataClinica)) {
            handleReadDataOrdenFromAsyncStorage()
        } else {
            handleSaveDataOrden()
        }
    }, [dataClinicaSingle])

    const handlePickerImageLogo = async () => {
        if (Platform.Version === 'android' && !(await hasAndroidPermission())) {
            return console.log('No se puede obtener el permiso')
        }
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            cropperCircleOverlay: true,
            mediaType: 'photo',
            compressImageQuality: 0.8,
            includeBase64: true,
            writeTempFile: false
        }).then(image => {
            setLogoClinica(`data:${image.mime};base64,${image.data}`)
            let imagePath = `${RNFS.DocumentDirectoryPath}/logo.${mime.getExtension(image.mime)}`
            RNFS.writeFile(imagePath, image.data, 'base64').then((response) => {
                setDataClinicaSingle({...dataClinica,logo: imagePath})
                
            }).catch((err) => {
                errorGuardado()
            })
        });
    }

   

    const handleCancelOption = (e: any) => {
        cancelUpdate()
        setDataClinicaSingle(dataClinica)
        Keyboard.dismiss()
        setIsEdit(!isEdit)
    }

    const handleSuccessOption = () => {
        if (has(dataClinicaSingle, "logo") || has(dataClinica, "logo")) {
            Keyboard.dismiss()
            setIsEdit(!isEdit)
            handleSaveDataOrden()
            successGuardado()
        } else {
            errorGuardadoLogo()
        }
    }



{/*TODO: Mensajes de las acciones en la aplicacion */}
    const errorGuardadoLogo = () => {
        ToastAndroid.showWithGravityAndOffset(
            'Error, No tiene logo para la orden',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
        );
    }

    const successGuardado = () => {
        ToastAndroid.showWithGravityAndOffset(
            'Guardado correctamente',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
        );
    }

    const cancelUpdate = () => {
        ToastAndroid.showWithGravityAndOffset(
            'No se ha realizado cambios',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
        );
    }

    const errorGuardado = () => {
        ToastAndroid.showWithGravityAndOffset(
            'Error al guardar los cambios',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
        );
    }

{/*----------------------------------------------- */}

    return (
        <Layout style={style.container}>
            <KeyboardAwareScrollView>
                <NetworkCheckScreens />
                <CheckVersionAppScreens />
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
                                    <TouchableOpacity onPress={ handleSuccessOption }>
                                        <MyIcon name='edit-outline' />
                                    </TouchableOpacity>
                                </>
                            ) : (
                                <>

                                </>
                            )
                        }
                    </Layout>
                    <Loader loading={isLoandingData} size="large" title="Cargando..." color="#ff66be" />
                </Layout>
                <Layout style={{ flex: 1, height: 180 }}>
                    {
                        isEmpty(logoClinica) ?
                            <Avatar onPress={handlePickerImageLogo}
                                source={require('../../assets/images/question.png')}
                                containerStyle={{
                                    justifyContent: 'center', marginTop: 15, alignSelf: 'center',
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
                                    justifyContent: 'center', marginTop: 15, alignSelf: 'center',
                                    backgroundColor: '#fff',
                                    borderColor: 'white',
                                    shadowOffset: {
                                        width: 0,
                                        height: 9,
                                    },
                                    shadowOpacity: 0.50,
                                    shadowRadius: 12.35,

                                    elevation: 10,
                                }} rounded size="xlarge" title="TU LOGO">
                            </Avatar>
                    }

                </Layout>
                <Layout style={{ flex: 1, marginTop: 10 }}>
                    <Layout>
                        <Input style={{...loginStyle.campos}}
                            onFocus={()=>!isEdit && setIsEdit(true)}
                            keyboardType="default"
                            autoCapitalize="none"
                            selectionColor='white'
                            onChangeText={(text) => setDataClinicaSingle({...dataClinicaSingle,nombre:text})}
                            value={dataClinicaSingle.nombre}
                            placeholder="Ingrese el nombre de la Clinica"
                            underlineColorAndroid='white'
                            autoCorrect={false}
                            accessoryLeft={<MyIcon name="home-outline" />}
                            //onSubmitEditing={onLogin}
                        />
                    </Layout>

                    <Layout>
                        <Input style={loginStyle.campos}
                            onFocus={()=>!isEdit && setIsEdit(true)}
                            keyboardType="default"
                            autoCapitalize="none"
                            selectionColor='white'
                            onChangeText={(text) => setDataClinicaSingle({...dataClinicaSingle,direccion:text})}
                            value={dataClinicaSingle.direccion}
                            placeholder="Ingrese la direccion de la clinica"
                            accessoryLeft={<MyIcon name="navigation-2-outline" />}
                            //onSubmitEditing={onLogin}
                        />
                    </Layout>

                    <Layout>
                        <Input style={loginStyle.campos}
                            onFocus={()=>!isEdit && setIsEdit(true)}
                            keyboardType="default"
                            autoCapitalize="none"
                            selectionColor='white'
                            onChangeText={(text) => setDataClinicaSingle({...dataClinicaSingle,telefono:text})}
                            value={dataClinicaSingle.telefono}
                            placeholder="Ingrese el numero de telefono"
                            accessoryLeft={<MyIcon name="phone-call-outline" />}
                            
                        />
                    </Layout>
                </Layout>
            </KeyboardAwareScrollView>
        </Layout>
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

