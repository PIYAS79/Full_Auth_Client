import { jwtDecode } from "jwt-decode"



export const Decode_JWT_Token = (token:string) =>{
    return jwtDecode(token);
}

