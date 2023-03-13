import moment from "moment";

export function getLocalStorage(key: string) {
    const isClient = typeof window !== 'undefined';
    if(isClient){
        return localStorage.getItem(key)
    }
}

export function getUserSession() {
    const isClient = typeof window !== 'undefined';
    if(isClient){
    const authorization = localStorage.getItem("Authorization");
    if (authorization) {
        const expire = localStorage.getItem("expire");
        if (moment().add(expire, 's').isAfter(moment())) {
            return authorization
        } else {
            localStorage.removeItem("Authorization");
            localStorage.removeItem("expire");
            return null;
        }
    } else {
        return null
    }}
}

export function removeUserSession(){
    const isClient = typeof window !== 'undefined';
    if(isClient){
        localStorage.removeItem("Authorization");
        localStorage.removeItem("expire");
    }
}