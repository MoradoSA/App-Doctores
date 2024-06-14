
import {  StyleSheet } from "react-native";



//TODO: Estilos para la pantalla de home, donde  se meustra la lsita de pacientes.
export const homeStyle = StyleSheet.create({
    Panel: {
        flex: 1,
        backgroundColor:"#fff"
    },

    headerContainer: {
        flexDirection: 'row',
        marginHorizontal:30,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        marginBottom: 15
       
    },

    headerTextContainer: {
        justifyContent: 'center',
        marginHorizontal: 50,
        
       
    },

    headerText: {
        justifyContent: 'center',
        fontSize: 20,
        fontWeight: 900,
       
    },

    headerImage: {
        width: 45,
        height: 45,
        margin: 7
    },

    containerListado: {
        marginHorizontal: 20,
        marginBottom: 15
    },

    listado: {
        flexDirection: 'column',
        marginTop: 10
    },


    footerText:{
        fontSize: 16,
        marginTop: 10,
        textAlign:'center'
    }
    
})