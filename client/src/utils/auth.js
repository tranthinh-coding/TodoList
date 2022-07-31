import Cookies from "js-cookie";

export function getToken(key) {
  return Cookies.get(key);
}

export function setToken(key, token, time = 1) {
  return Cookies.set(key, token, { expires: time });
}

export function removeToken(keys) {
  if (typeof keys !== 'string') {
    return keys.forEach(key => Cookies.remove(key));
  }
  return Cookies.remove(keys);
}
