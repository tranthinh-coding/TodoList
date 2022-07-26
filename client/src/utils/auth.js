import Cookies from "js-cookie";
import { TokenKey } from '@/config/app';

export function isLogged() {
  return Cookies.get(TokenKey) === 'true';
}

export function setLogged(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
