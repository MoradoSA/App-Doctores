export interface LoginResponse {
    access_token: string;
    token_type:   string;
    expires_at:   Date;
}

export interface Usuario {
    id:                number;
    nombre:            string;
    email:             string;
    cedula:            string;
    fecha_nacimiento:  Date;
    celular:           string;
    nro_registro:      String;
    deleted_at:        null;
    created_at:        Date;
    enabled:           1;
    current_sucursal_seguro_id:   number;
}

export interface loginData {
    cedula:string,
    password:string
}

export interface UsuarioType {
    cod:     string;
    message: string;
    data:    Usuario[];
}
