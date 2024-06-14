import { PropsWithChildren, useEffect } from "react";
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "../../routes/StackNavigation";
import { useAuthStore } from "../../store/auth/useAuthStore";


export const AuthProvider = ({ children }: PropsWithChildren) =>{
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const {checkStatus, status, } = useAuthStore();

    //TODO: Verificamos el estado del usuario, si esta conectado o no, o si el token es valido
    useEffect(() => {
      checkStatus()
    }, [])


    //TODO: Si el usuario no esta conectado, lo redirigimos a la pantalla
    useEffect(() => {
     if(status !== "checking"){
      //TODO: Verificamos si el usuario esta autenticado, para realizar la redireccion correpondiente al resultado.
        if( status === "authenticated" ){
          navigation.reset({
            index: 0,
            routes: [{ name: 'BottonTabsNavigation' }],
          })
        }else{
          navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreens' }],
          })
        }
     }

    }, [status])
    
  return (
    <>{children}</>
  )
}

