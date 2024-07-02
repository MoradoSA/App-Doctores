import { StyleSheet } from "react-native";

export const loadingStyle = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      backgroundColor: 'transparent'
    },

    title: {
      marginBottom: 10,
      fontSize: 20,
    },

    imagen: {
      width: 135,
      height: 135,
      top: -195,
      shadowOffset: {
        width: 0,
        height: 9,
      },
      shadowOpacity: 0.50,
      shadowRadius: 9,
  
      elevation: 10,
    },

   
});