import { create } from "zustand";
import { AuthStatus } from "../../context/authReduce";
import { LoginResponse, Usuario } from "../../interfaces/AppInterfaces";
import { authCheckToken, authLogin } from "../../context/auth/auth";
import { StorageAdapter } from "../../api/adapter/asyncStorage";
import { doctoresApi } from "../../api/doctoresApi";

export interface AuthState {
    status: AuthStatus;
    token? : string;
    usuario? : Usuario;
    login: (cedula: string, password: string)=>Promise<boolean>;
    logout: ()=>void;
    checkStatus: ()=>Promise<void>;
    userData: ()=>Promise<void>;
    
}

export const useAuthStore = create<AuthState>()( (set, get) =>({
    
    status: 'checking',
    token: undefined,
    usuario: undefined,

    login: async(cedula: string, password: string) =>{
        const resp = await authLogin(cedula, password)
   
        if( !resp ){
            set({ status:'notAuthenticated', token: undefined, usuario: undefined });
            return false;
        }

        //TODO: Almacenar el token en el storage
        await StorageAdapter.setItem('token', resp)
        const usuario = await doctoresApi.get('/auth/doctores/')
        console.log(usuario.data)
        
        set({ status:'authenticated', token: resp, usuario: usuario.data });
        
        return true;
    },

    userData: async () => {
        try {
            const resp = await authCheckToken();
       
            if( !resp ){
                set({ status:'notAuthenticated', token: undefined, usuario: undefined });
                return ;
            }

          return resp;

            

        } catch (error) {
            console.log(error)
        }
    },

    checkStatus: async () =>{
       
        const resp = await authCheckToken();
       
        if( !resp ){
            set({ status:'notAuthenticated', token: undefined, usuario: undefined });
            return ;
        }

        await StorageAdapter.setItem('token', resp)
       

        set({ status:'authenticated', token: resp,});

       
    },

    logout: ()=>{
        StorageAdapter.removeItem('token');
        set({ status:'notAuthenticated', token: undefined, usuario: undefined });
    }


}))

