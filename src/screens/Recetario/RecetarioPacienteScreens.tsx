import React, { useEffect, useState } from 'react'
import { Image, StyleSheet } from 'react-native'
import { Layout, Text, Input, Button, Avatar } from '@ui-kitten/components'
import { NetworkCheckScreens } from '../../components/NetworkCheckScreens'
import { CheckVersionAppScreens } from '../../components/CheckVersionAppScreens'
import { ScrollView, TouchableOpacity, FlatList } from 'react-native-gesture-handler'
import { MyIcon } from '../../components/ui/MyIcon'
import { useNavigation } from '@react-navigation/native'
import { isEmpty, isNumber, toNumber } from 'lodash'
import { Popup, Root } from 'popup-ui'
import LinearGradient from 'react-native-linear-gradient'
import { doctoresApi } from '../../api/doctoresApi'


export const RecetarioPacienteScreens = () => {
  const navigation = useNavigation()
  const [dataPaciente, setDataPaciente] = useState({
    name: '',
    fecha_nacimiento: '',
    email: '',
    celular: '',
    sexo: ''

  })
  const [error, setError] = useState(false);
  const [searchCedula, setSearchCedula] = useState('')
  const [isSearch, setIsSearch] = useState(false)
  const [pacienteFiltradas, setPacienteFiltradas] = useState([])


  const handleSubmitPacienteData = () => {

    if (isEmpty(dataPaciente.name) || isEmpty(dataPaciente.fecha_nacimiento)) {

      Popup.show({
        type: 'Danger',
        title: 'Error!',
        textBody: 'Debe llenar todos los campos',

        callback: () => {
          Popup.hide()

        }
      })

    } else {
      if (toNumber(dataPaciente.edad)) {

        navigation.navigate("RecetarioListadoEstudiosScreens", { paciente: { ...dataPaciente } })

      } else {
        Popup.show({
          type: 'Danger',
          title: 'Error!',
          textBody: 'La cedula debe ser solo numeros o guion',
          callback() {
            Popup.hide()
          }
        })
      }
      setError(true)

    }
  }

  const getAllPacienteCedula = async () => {
    await doctoresApi.get(`/auth/doctores/pacientes/info/${searchCedula}`).then((response) => {
      setPacienteFiltradas(response.data.data)
      setIsSearch(true)
    }).catch((e) => {
      setIsSearch(false)
    
    })
  }

  useEffect(() => {
    if(isEmpty(searchCedula)){
      setIsSearch(false);
      setPacienteFiltradas([])
    }else{
      getAllPacienteCedula()
    }
  }, [searchCedula])



  const handleOnChangeTextSearchBar = (text: any) => {
    setSearchCedula(text)
    setIsSearch(true)
  }








  return (
    <Root>
      <LinearGradient
        colors={['#7FDFF0', '#fff', '#fff', '#91E4F2']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={{ flex: 1 }}
      >
        {/* <CheckVersionAppScreens />
        <NetworkCheckScreens /> */}
        <ScrollView>
          <Layout style={{ backgroundColor: 'transparent' }}>
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
                <Text style={styles.headerText}>Datos del Paciente</Text>
              </Layout>
            </Layout>
            <Layout style={styles.continerRegistro}>
              <Layout style={styles.containerImage}>
                <Image source={require('../../assets/images/registro.png')} style={styles.image} />
              </Layout>
              <Layout style={styles.containerInputs}>
                {/* TODO: vALIDACION DE SOLAMENTE NUMEROS Y GUION */}
                <Text style={styles.label} >Nro de Cedula :</Text>
                <Input
                  onChangeText={handleOnChangeTextSearchBar}
                  value={searchCedula}
                  style={styles.input}
                  keyboardType="numeric"
                  autoCapitalize="none"
                  selectionColor='white'
                  placeholder="Ingrese la cedula"
                  accessoryLeft={<MyIcon name="credit-card-outline" />}
                  cursorColor={'black'}

                />
              </Layout>
              {
                !isSearch ? (
                  <>
                    <Layout style={styles.containerInputs}>
                      <Text style={styles.label}>Nombre del Paciente:</Text>
                      <Input
                        onChangeText={(name) => setDataPaciente({ ...dataPaciente, name: name })}
                        value={dataPaciente.name}
                        style={styles.input}
                        keyboardType="default"
                        autoCapitalize="none"
                        selectionColor='white'
                        placeholder="Ingrese el nombre del Paciente"
                        accessoryLeft={<MyIcon name="person-outline" />}
                        cursorColor={'black'}
                      />

                    </Layout>
                    <Layout style={styles.containerInputs}>
                      <Text style={styles.label}>Fecha de Nacimiento:</Text>
                      <Input
                        onChangeText={(fecha_nacimiento) => setDataPaciente({ ...dataPaciente, fecha_nacimiento: fecha_nacimiento })}
                        value={dataPaciente.fecha_nacimiento}
                        style={styles.input}
                        keyboardType="default"
                        autoCapitalize="none"
                        selectionColor='white'
                        placeholder="Ingrese la fecha del Paciente"
                        accessoryLeft={<MyIcon name="person-outline" />}
                        cursorColor={'black'}
                      />

                    </Layout>
                    <Layout style={styles.containerInputs}>
                      <Text style={styles.label}>Correo Electronico:</Text>
                      <Input
                        onChangeText={(email) => setDataPaciente({ ...dataPaciente, email: email })}
                        value={dataPaciente.email}
                        style={styles.input}
                        keyboardType="default"
                        autoCapitalize="none"
                        selectionColor='white'
                        placeholder="Ingrese el correo del Paciente"
                        accessoryLeft={<MyIcon name="person-outline" />}
                        cursorColor={'black'}
                      />

                    </Layout>
                    <Layout style={styles.containerInputs}>
                      <Text style={styles.label}>Numero de Telefono:</Text>
                      <Input
                        onChangeText={(celular) => setDataPaciente({ ...dataPaciente, celular: celular })}
                        value={dataPaciente.celular}
                        style={styles.input}
                        keyboardType="numeric"
                        autoCapitalize="none"
                        selectionColor='white'
                        placeholder="Ingrese el telefono del Paciente"
                        accessoryLeft={<MyIcon name="person-outline" />}
                        cursorColor={'black'}
                      />

                    </Layout>
                    <Layout style={styles.containerInputs}>
                      <Text style={styles.label}>Sexo del Paciente:</Text>
                      <Input
                        onChangeText={(sexo) => setDataPaciente({ ...dataPaciente, sexo: sexo })}
                        value={dataPaciente.sexo}
                        style={styles.input}
                        keyboardType="numeric"
                        autoCapitalize="none"
                        selectionColor='white'
                        placeholder="Ingrese el sexo del Paciente"
                        accessoryLeft={<MyIcon name="person-outline" />}
                        cursorColor={'black'}
                      />

                    </Layout>
                    <Layout style={styles.containerInputs}>
                      <Button
                        style={styles.button}
                        onPress={handleSubmitPacienteData}
                        accessoryRight={<MyIcon name='arrow-ios-forward-outline' />}
                      >
                        <Text>Siguiente </Text>
                      </Button>
                    </Layout>

                  </>
                ) : (
                  <Layout style={ styles.containerDatosPaciente }>
                    <Layout  style={ styles.containerDatos }>
                      <Layout style={{
                        alignItems: 'center'
                      }}>
                      <Avatar
                          size='giant'
                          source={{ uri: `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${pacienteFiltradas?.name}&size=140&rounded=true` }}
                          style={{
                            width: 90,
                            height: 90,
                            top: -20,
                                                        
                          }}
                        />
                       <Text style={styles.datosPacientes}> Nro Cedula: {pacienteFiltradas.cedula}</Text>
                       <Text style={styles.datosPacientes}> Nombre: {pacienteFiltradas.name }</Text>
                       <Text style={styles.datosPacientes}> Fecha Nacimiento: {pacienteFiltradas.fecha_nacimiento}</Text>
                       <Text style={styles.datosPacientes}> Edad del paciente: {pacienteFiltradas.edad}</Text>
                       <Button 
                        style={styles.buttonPerfil}
                        onPress={() => navigation.navigate('PerfilPacienteScreens' as never, {cedula: pacienteFiltradas.cedula})}
                       >Ir al Perfil</Button>
                      </Layout>
                    </Layout>
                  </Layout>
                )
              }


            </Layout>
          </Layout>
        </ScrollView>
        <Layout style={{
          backgroundColor: 'transparent',
          height: 70
        }}>

        </Layout>
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
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginBottom: 2

  },

  headerTextContainer: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    marginHorizontal: 40,

  },
  headerText: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 900,

  },

  continerRegistro: {
    backgroundColor: 'transparent',
    justifyContent: 'center'
  },

  containerInputs: {
    backgroundColor: 'transparent',
    marginHorizontal: 20,
    marginBottom: 15,
  },



  label: {
    backgroundColor: 'transparent',
    fontSize: 18,
    margin: 7,
    color: '#617A7B'
  },

  input: {
    backgroundColor: 'white',
    fontSize: 18,
    borderWidth: 2,
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.10,
    shadowRadius: 9,

    elevation: 0.9,
  },

  containerImage: {
    backgroundColor: 'none',
    justifyContent: 'center',
    alignItems: 'center',


  },

  image: {
    width: 300,
    height: 250,
    marginTop: -35

  },

  button: {
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.10,
    shadowRadius: 9,

    elevation: 2,
  },

  containerDatosPaciente: {
    flex: 1,
    height: 330,
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: 'transparent',
    
  },

  containerDatos: {
    flex: 1,
    height: 260,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: 'white',
    borderColor: 'white',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.50,
    shadowRadius: 9,

    elevation: 5,
  },

  datosPacientes: {
    fontSize: 20,
    margin: 5
  },

  buttonPerfil: {
    top: 10,
    width: 150,
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.50,
    shadowRadius: 9,

    elevation: 5,
  
  },


})
