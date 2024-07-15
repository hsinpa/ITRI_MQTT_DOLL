export const API = Object.freeze({
    Login: 'UserDataBase/Login',
    Register: 'UserDataBase',
    UploadData: '',
    ReadData: '',
    UpdateData: '',
    DeleteData: '',
});

export const SELF_DOMAIN = 'http://localhost:3000/'
export const PROD_DOMAIN = 'http://localhost:3000/'

export const Get_API = function(url: string) {
    return SELF_DOMAIN + url;
}