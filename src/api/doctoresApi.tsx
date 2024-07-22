import axios from 'axios';
import { API_URL, API_URL_ANDROID, API_URL_IOS, STAGE } from '@env';
import { Platform } from 'react-native';
import { StorageAdapter } from './adapter/asyncStorage';

// const baseURL = ( STAGE === 'prod') ?  API_URL 
// : Platform.OS === 'ios'
// ? API_URL_IOS
// : API_URL_ANDROID;

const baseURL = 'http://192.168.100.11:8000/api'

const doctoresApi = axios.create(
    {
      baseURL: baseURL,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
  
  
  //TODO: Interceptors para la utilizacion del token obtenido en el header de autenticacion.
  doctoresApi.interceptors.request.use(
    async(config:any)=>{
        const token = await StorageAdapter.getItem('token')        
        if(token){
           config.headers['Authorization'] = `Bearer ${token}`
        }
        return config;
    }
)

  export {
  
    doctoresApi,
  
  }