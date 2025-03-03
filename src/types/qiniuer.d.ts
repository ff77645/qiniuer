declare module 'jshashes' {
  export class SHA1 {
    b64_hmac:(key:string,val:string)=>string
  }
}