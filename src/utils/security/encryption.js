import CryptoJS from "crypto-js";
export const generateEncryption = ({plainText= '', signature= process.env.ENCRYPTION_SIGNATURE}= {}) => {
    const encrypt = CryptoJS.AES.encrypt(plainText, signature).toString()
    return encrypt
}

export const decodeEncryption = ({cipherText = '', signature= process.env.ENCRYPTION_SIGNATURE}= {}) =>{
    const decrypt = CryptoJS.AES.decrypt(cipherText, signature).toString(CryptoJS.enc.Utf8)
    return decrypt
}