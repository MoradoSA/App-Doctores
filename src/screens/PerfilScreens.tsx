import { Button, Icon, Layout, Text } from '@ui-kitten/components'
import { useAuthStore } from '../store/auth/useAuthStore'
;


export const PerfilScreens = () => {

  const {logout, usuario} = useAuthStore();

  return (
    <Layout style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
        <Text>Bienvenido{ JSON.stringify(usuario) }</Text>
        
        <Button accessoryLeft={<Icon name='log-out-outline'/>}
        onPress={logout}
        >Cerra Sesion</Button>
    </Layout>
  )
}
