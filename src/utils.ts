
import jshashes from 'jshashes'

export const unix = ()=> Date.now() / 1000


export function base64UrlSafeEncode(target:string) {
  return target.replace(/\//g, '_').replace(/\+/g, '-')
}

export function hmacSha1(key:string,str:string){
  return (new jshashes.SHA1).b64_hmac(key,str)
}