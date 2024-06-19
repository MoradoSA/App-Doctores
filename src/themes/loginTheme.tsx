
import {  StyleSheet } from "react-native";



//TODO: Estilos para la pantalla del Login.
export const loginStyle = StyleSheet.create({
    body: {
       flex: 1    
    },

    contenido: {
        marginHorizontal: 30
    },

    campos: {
        backgroundColor: '#fff',
        borderWidth: 1.5,
        borderRadius: 10,
        marginBottom: 20,
        shadowOffset: {
            width: 0,
            height: 9,
          },
          shadowOpacity: 0.12,
          shadowRadius: 9,
      
          elevation: 5,

    },

    bottonContainer:{
        marginBottom: 10,

    },

    botton: {
        borderRadius: 10,
        shadowOffset: {
            width: 0,
            height: 9,
          },
          shadowOpacity: 0.12,
          shadowRadius: 9,
      
          elevation: 5,
    }
    
})