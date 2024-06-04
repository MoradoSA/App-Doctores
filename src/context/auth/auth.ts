
import { StorageAdapter } from "../../api/adapter/asyncStorage";
import { doctoresApi } from "../../api/doctoresApi";
import type { LoginResponse, Usuario } from "../../interfaces/AppInterfaces";

const returnUserToken = async(data: LoginResponse) => {

    return (
    
        data.access_token
    )
}

const dataUser = async(credentials:LoginResponse) =>{

    if(credentials instanceof Object){
        try {
            const resp = await doctoresApi.get<Usuario>('/auth/doctores/')
            return resp.data

        } catch (error:any) {
            console.log(error.response.data.error);
        }
    }
}

export const authLogin = async(cedula: string, password: string) =>{
   
    try {
      const resp = await doctoresApi.post<LoginResponse>('/doctor/login', {
        cedula, password
      }) 
      
    
     return returnUserToken(resp.data)

    } catch (error) {
        console.log(error)
        return null;
    }
}

export const authCheckToken = async() =>{
    try {
        
    const resp = await doctoresApi.get<LoginResponse>('/auth/doctores/')
        
    } catch (error) {
        console.log(error)
        return null;
    }
}