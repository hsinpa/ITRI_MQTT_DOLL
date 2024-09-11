export const API = Object.freeze({
    Login: 'yuri/login',
    UploadData: 'yuri/upload_record/{0}/{1}',
    ReadData: 'yuri/get_record',
});

export const SELF_DOMAIN = 'http://localhost:8842/'
export const PROD_DOMAIN = 'https://psycho-councel.zapto.org/'

export const Get_API = function(url: string) {
    return PROD_DOMAIN + url;
}

export interface AccountInterface {
    email: string,
    password: string,
    hospitalId: string,
    id: string,
    name: string,
}