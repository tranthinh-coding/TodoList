export const API_V1 = process.env.API_V1;
export const ACCESS_TOKEN = "access_token";
export const REMEMBER_TOKEN = "remember_token"; // remember_token
export const REGISTER_API = "/register";
export const LOGIN_API = "/login";
export const LOGOUT_API = "/logout";
export const nameOf = (f) => (f).toString().replace(/[ |\(\)=>]/g,''); // name of variable