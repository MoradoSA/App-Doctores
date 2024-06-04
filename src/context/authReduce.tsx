import { Usuario } from "../interfaces/AppInterfaces";


export interface AuthState {
    errorMessage: string;
    token: string | null;
    user: Usuario | undefined;
    status: 'checking' | 'authenticated' | 'notAuthenticated';
}

export type AuthStatus = 'checking' | 'authenticated' | 'notAuthenticated';

export type AuthAction =
| { type: 'singUp', payload: { token: string, user: Usuario | undefined} }
| { type: 'addError', payload: string }
| { type: 'removeError' }
| { type: 'notAuthenticated' }
| { type: 'logout' }


export const authReduce = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'addError':
            return {
              ...state,
              user: undefined,  
              status: 'notAuthenticated',
              token: null,
              errorMessage: action.payload
            }

        case 'removeError':
            return {
                ...state,
                errorMessage: ''
            }
        
            case 'singUp':
                return {
                    ...state,
                    errorMessage: '',
                    status: 'authenticated',
                    token: action.payload.token,
                    user: action.payload.user
                }

            case 'notAuthenticated':
                return {
                    ...state,
                    status: 'notAuthenticated',
                    token: null,
                    user: undefined
                }
            
            case 'logout':
                return {
                    ...state,
                    status: 'notAuthenticated',
                    token: null,
                    user: undefined
                }
        default:
            return state;
    }
}