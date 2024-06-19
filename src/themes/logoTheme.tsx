import { StyleSheet } from "react-native";

//TODO: Estilos para el diseño del logo
export const styles = StyleSheet.create({
    container: {
      height: 160,
      width: 160,
      backgroundColor: 'white',
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.50,
      shadowRadius: 12.35,
  
      elevation: 10,
      marginBottom: 15
    },
  
    imagen: {
      width: 150,
      height: 150,
    }
  });